require('./bootstrap')(console)
const amqp = require('amqplib/callback_api')
const config = require('./config')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const stream = require('stream')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
let argv = require('yargs')
              .default('dir', __dirname)
              .describe('f', 'file path to load data')
              .alias('f', 'file')
              .nargs('f', 1)
              .describe('u', 'uri of database to load data')
              .alias('u', 'uri')
              .nargs('u', 1)
              .help()
              .argv


// read file from a path in local and return a stream object
function mode_file(file) {
  let fileStream = fs.createReadStream(file, 'utf8')
  let outStream = new stream 
  outStream.readable = true
  outStream.writable = true
  let dataStream = readline.createInterface({ input: fileStream, output: outStream, terminal: false})
  return dataStream
}

// fetch all data from mongo database
function mode_database(uri, rabbit_conn, callback){
  MongoClient.connect(uri, (err, db) => {
    assert.equal(null, err)
    db.collection(config.MONGODB_COLLECTION).find({})
    .stream()
    .on('data', callback)
    .on('end', () => {
      db.close()
      if(config.RABBITMQ_CLOSE){
          setTimeout( () => { rabbit_conn.close(); process.exit(0) }, 2000)
      }
    })
  })  
}

function send(channel, queue, message){
  let data = JSON.stringify({'domain_name': message, timeout: config.RABBITMQ_TIMEOUT, retry: 0})
  channel.sendToQueue(queue, new Buffer(data), {persistent: config.RABBITMQ_PERSISTENT})
  console.log(`[x] Sent ${message}`)
}


amqp.connect(`${config.RABBITMQ_URI}`, (err, conn) => {
  conn.createChannel( (err, ch) => {
      let q = config.RABBITMQ_QUEUE
      // let msg = process.argv.slice(2).join(' ') || "Hello World!"

      ch.assertQueue(q, {durable: config.RABBITMQ_DURABLE})
      if(argv.f){
        mode_file(argv.f)
        .on('line', line => {
          send(ch, q, line)
        })
        .on('close', () => { 
          console.log('close file\n') 
          // close rabbitmq server after close file data.
          if(config.RABBITMQ_CLOSE){
            setTimeout( () => { conn.close(); process.exit(0) }, 2000)
          }
        })
      }
      else if(argv.u){
        mode_database(argv.u, conn, (message) => {
          send(ch, q, message.domain_name)
        })
      }
    
    })
})

