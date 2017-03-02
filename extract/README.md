# Who is Extract

load data from file or database or crawl to send to rabbitmq server

## requirements:
- node version > 7.x.x
- rabbitmq server


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
- RABBITMQ_TIMEOUT: default true
- ENV: environment to use for dev default: development/production/test

- if this service/job load data from file, please provide data file into folder ./data/*

## Run
- use command `babel-node extract.js -f file_path` when use data from localfile .example: `babel-node extract.js -f data/mini_data.txt`
- use command `babel-node extract.js -u mongodb://address:port/db` when use data from database as mongodb
