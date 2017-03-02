#!/usr/bin/env node

let amqp = require('amqplib/callback_api')
let config = require('./configs/config')

amqp.connect(`${config.RABBITMQ_URI}`, (err, conn) => {
  conn.createChannel( (err, ch) => {
  var q = config.RABBITMQ_QUEUE
    var msg = process.argv.slice(2).join(' ') || "google.com"

    ch.assertQueue(q, {durable: config.RABBITMQ_DURABLE})
    ch.sendToQueue(q, new Buffer(JSON.stringify({ domain_name: msg, timeout: 5000, retry: 0})), {persistent: config.RABBITMQ_PERSISTENT})
    console.log(" [x] Sent '%s'", msg)
  })
  setTimeout( () => { conn.close(); process.exit(0) }, 500)
})

process.on('uncaughtException', (err) => {
  console.log(`${err}`)
})