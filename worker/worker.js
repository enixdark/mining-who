const whois = require('whois')
const amqp = require('amqplib/callback_api')
const config = require('./configs/config.js')
const mongoose = require('mongoose')
const Who = require('./models/who')
const Queue = require('./models/queue')
const _ = require('underscore')
const winston = require('winston')
const R = require('ramda')
const fs = require('fs')
// define regex to extract information for text after getting it from whois protocal
const THICK_DOMAIN_REGEX = /[\w\W]+URL of the ICANN/
const DEEP_DOMAIN_REGEX = /[\w\W]+DNSSEC:\s(unsigned|signed)/
const THIN_DOMAIN_REGEX = /Whois Server Version 2.0[\w\W]+Expiration Date: \d{1,2}-\w+-\d{2,4}/

// uncomment to setup to output log file if don't use docker with log driver
// let logger = new (winston.Logger)({
//   transports: [
//     new (winston.transports.File)({
//       name: 'info',
//       filename: './log/info.log',
//       level: 'info'
//     }),
//     new (winston.transports.File)({
//       name: 'error',
//       filename: './log/error.log',
//       level: 'error'
//     })
//   ]
// });

let logger = console
require('./bootstrap')(logger)

mongoose.connect(config.DATABASE[config.ENV].MONGODB_URI)


// clean & extract all field of domain into object
function extract_domain(text){
  text = text ? text.toString() : ''
  let result = {}
  // let thin = text.match
  for( let str of text.toString().split('\n').slice(0,-1)){
    let data = str.split(':')
    // clean data to can convert to type Date in javascript 
    if(data[0] === 'Updated Date' || data[0] === 'Creation Date' || data[0] === 'Expiration Date'){
      data[1] = data[1].replace('-T', 'T')
    }
    let obj = {}
    
    obj[data[0].trim()] = data.slice(1).join(':').trim()
    result = Object.assign(result, obj)
  }
  return result
}

/** 
 process data that result/information was got from whois protocal, extract all information can use into object/dict

 * @param data: a information/result string that get from whois protocal
 * @param message: origin data that received from message broker such as rabbitmq, redis with some information suchas timeout, domain name

 * processing_data(`Whois Server Version 2.0 Domain names in the .com and .net domains can now be registered 
 * with many different competing registrars. Go to http://www.internic.net
  for detailed information`, {'domain_name': 'google.com', 'timeout': 5000' })
**/

function processing_data(data, message){
  let extract_data = extract_domain(data)
  let who = extract_data
  // check data that got from whois protocal, if it have empty size or lack information 
  if(_.isEmpty(extract_data)){
    who = Object.assign(extract_data, {error: "This domain is not exists", 'Domain Name': message})
  }
  if(Object.keys(extract_data).length === 1 || Object.keys(extract_data).length === 5){
    who = Object.assign(extract_data, {error: "This domain is protect", 'Domain Name': message})
  }
  return who
}


/** 
 lookup information with deeply level of dns to find real owner domain 

 * @param domain - name domain or ip 
 * @param origin_data - origin data that you use to avoid override data when use whois with other domain
 @ @param deep_point - store state of finding dns with using whois protocal
 * @param options - options for whois module example: 
 * active: to check 
 * follow: deeply level use whois protocal
 * server: use external server with whois instead of using default server
 * @return promise with 2 callback function to process result when success or fail  
 * 
 * @example
 * fn('google.com', { 'domain_name': 'googlevietname.com'}, 0 , options = { active: true, follow: 0, server: 'whois.google.com' })
**/
let fn = (domain, origin_data = {}, deep_point = 0, options = { active: true, follow: 0 }) => new Promise( (resolve, reject) => {
  // call immediatly promise 
  process.nextTick(
    () => {
    whois.lookup(domain.toLowerCase(), options, (err, result) => {
      if(err || result === 'You have reached configured rate limit.\nPlease try after some time.\n\n') {
        logger.log('error', `1 ${err} ${domain}`)
        reject(domain)
        return `${err}`
      }

      // if call function is the first time, store result and check from whois into origin_data
      if(deep_point == 0){
        origin_data = extract_domain(result.match(THIN_DOMAIN_REGEX))
      }

      // find and match result that get from whois, if true is processing
      let data = result.match(THICK_DOMAIN_REGEX)
      if(data){
        resolve(data, origin_data)
        return 
      }
      
      // the first time use whois protocal with have infomation about owner dns but only a litte information, continue crawling data based on the information 
      // that crawled and extracted from previous    
      if(!_.isEmpty(origin_data) && options.active){
        fn(domain, origin_data, deep_point + 1, { follow: 0, server: origin_data['Whois Server'], active: false}).then(resolve, reject)
      }

      
      let deep = result.match(DEEP_DOMAIN_REGEX)
      if(deep){
        let deep_domain = extract_domain(deep)
        if(deep_domain && deep_domain['Registrant Organization'] !== domain){
          fn(deep_domain['Registrant Organization'], origin_data, deep_point + 1, { follow: 2, active: false, server: 'whois.name.com'}).then(resolve, reject)
        }
      }
      
      if(_.isEmpty(origin_data) && !deep && !data){
        resolve(data, {})
        return 
      }

      
    })
  }
  )
})


amqp.connect(`${config.RABBITMQ_URI}`, (err, conn) => {
  conn.createChannel( (err, ch)  => {
    let q = config.RABBITMQ_QUEUE
    // ch.assertExchange("delayed_exchange", 'fanout', {durable: false});
    ch.assertQueue(q, {
      durable: config.RABBITMQ_DURABLE, 
      // deadLetterExchange: "delayed_exchange",
      // messageTtl: 5000
      }, 
        (err, queue) => {
    })

    // fetch message every receive from rabbitmq
    ch.prefetch(config.RABBITMQ_FETCH_MESSAGE)
    logger.log("info",`[*] Waiting for messages in ${q}. To exit press CTRL+C`)
    ch.consume(q, msg => {
      let message = JSON.parse(msg.content.toString())

      fn(message.domain_name, {}, 0, { follow: 0, active: true}).then( (data, origin_data) => {
        let who = Object.assign(processing_data(data, message.domain_nameq), origin_data)

        // save data into database
        Who.create(who, (err, result) => {
          if (err) {
            logger.log('error', `2 ${err} message`)
            return err
          }

          logger.log('info', `completed processing ${message.domain_name}`)
        })
      }, data => {
        setTimeout( () => {
          console.log(`${data} -> ${message.timeout}`)
          // requeue or resend data that can process because some problem suchas network, block, etc 
          if(message.retry < config.RETRY){
            ch.sendToQueue(q, 
                         new Buffer(JSON.stringify({'domain_name': data, timeout: message.timeout * 2, retry: message.retry + 1})), 
                         {persistent: config.RABBITMQ_PERSISTENT})
          }
          else{
            Queue.create({domain_name: message.domain_name}, (err, result) =>{
              if (err) {
                logger.log('error', `2 ${err} message`)
                return err
              }
              logger.log('info', `${message.domain_name} cannot crawled so some problems, it'll pushed into database`)
            })
          }
        }, message.timeout)
      }).catch(err => logger.log('error', `3 ${err} message`))
        // timeout to send confirm to rabbitmq
        setTimeout( () => {
          ch.ack(msg);
        }, config.RABBITMQ_ACK_TIMEOUT)
    }, {noAck: false})
  })
})

