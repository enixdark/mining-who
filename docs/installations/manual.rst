..
   Author: Dinh Cong Quan <cqshinn@gmail.com>
   Maintainer: Dinh Cong Quan <cqshinn@gmail.com>

Manual Installation
===================

Installing Dependencies
-----------------------

1. Extract
^^^^^^^^^^

Config variables:

* RABBITMQ_URI: uri để kết nối tới rabbitmq
* RABBITMQ_CHANNEL: channel rabbitmqabbitmq
* RABBITMQ_QUEUE: queue rabbitmq để chứa dữ liệu.
* RABBITMQ_ROUTE: route để điều hướng tới các service của rabbitmq
* RABBITMQ_DURABLE: true 
* RABBITMQ_PERSISTENT: dữ liệu trong queue đc lưu trữ hay không 
* RABBITMQ_TIMEOUT: thời gian chời dành cho mỗi queue sau lần đẩy lại 
* ENV: môi trường phát triển ( dev )

Before Start::

  npm install package.json

Start::

    babel-node extract.js 

    or 

    node extract.js 

2. Worker
^^^^^^^^^

Config variables:

* RABBITMQ_URI: uri để kết nối tới rabbitmq
* RABBITMQ_CHANNEL: channel rabbitmqabbitmq
* RABBITMQ_QUEUE: queue rabbitmq để chứa dữ liệu.
* RABBITMQ_ROUTE: route để điều hướng tới các service của rabbitmq
* RABBITMQ_DURABLE: true 
* RABBITMQ_PERSISTENT: dữ liệu trong queue đc lưu trữ hay không 
* RABBITMQ_TIMEOUT: thời gian chời dành cho mỗi queue sau lần đẩy lại 
* ENV: môi trường phát triển ( dev )RABBITMQ_DURABLE': process.env.RABBITMQ_DURABLE || true,
* RABBITMQ_REQUEST_LIMIT_TIMEOUT: 
* RETRY: số lần retry lại message từ queue , publish tới 
* MONGODB_URI': uri để kết nối tới mongodb , mặc định la` 'mongodb://localhost:27017/dns'

Before Start::

  install whois tool
  npm install -g babel-cli
  npm install package.json

Start::

    babel-node worker.js

    or 

    node worker.js

3. Mongodb 
^^^^^^^^^^

Download mongodb from `https://www.mongodb.com/download-center?jmp=nav#community`

or 

install from repo for linux
:: 
  ubuntu

    apt-get install mongodb

  centos 
    
    yum install mongdb

Start::

  service mongodb start 

  or

  mongod 

4. Rabbitmq 
^^^^^^^^^^^

Download rabbitmq from `https://www.rabbitmq.com/download.html`

or 

install from repo for linux
:: 
  ubuntu

    apt-get install rabbitmq-server

  centos 
    
    yum install rabbitmq-server

Start::

  service rabbitmq-server start 

5. Elasticsearch + Kibana + Logstash ( ELK )
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

download elk from 