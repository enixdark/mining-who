# Who is Worker

## requirements:
- node version > 7.x.x
- whois tool 
  + Ubuntu: `apt-get install whois`
  + Centos: `yum install whois`
  + OtherOS: cp file whois to /usr/bin/local/
- rabbitmq server
- mongodb


## install
- `npm install -g babel-node`
- `npm install package.json`


## Before Run
- config variable for project in "configs/config.js":
- RABBITMQ_URI: uri to connect to rabbitmq server default: amqp://username:password@localhost:5672
- RABBITMQ_CHANNEL: channel use in rabbitmq, default: channel
- RABBITMQ_QUEUE: queue rabbitmq, default: queue
- RABBITMQ_ROUTE:route rabitmq, default: '#'
- RABBITMQ_DURABLE: default true
- RABBITMQ_PERSISTENT: default true
- ENV: environment to use for dev default: development/production/test
- RETRY: when have error in network when use whois, it'll requeue into message broker but with limit decide by retry - default 5
- MONGODB_URI: uri to connect to mongodb database, default: mongodb://username:password@localhost:27017/database

## Run
- use command `babel-node wokrer.js`
- for using multi process , use pm2 please install pm2 via command `npm install -g pm2` and run `pm2 start worker.js`

##Test Service With Rattitmq

- firstly, run worker serivce to connect to rabbitmq 
- use command `babel-node send.js google.com` , it send message to rabbitmq queue and then worker'll subscribe event from queue, get data and process, then save into database

##Test with data

- intstall mocha to use test with command `mocha test/*` or `npm test`