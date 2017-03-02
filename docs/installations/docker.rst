..
   Author: Dinh Cong Quan <cqshinn@gmail.com>
   Maintainer: Dinh Cong Quan <cqshinn@gmail.com>

Docker
======

Installing Dependencies
-----------------------

1. Extract
^^^^^^^^^^

Environment/Config variables:

* RABBITMQ_URI: uri để kết nối tới rabbitmq
* RABBITMQ_CHANNEL: channel rabbitmqabbitmq
* RABBITMQ_QUEUE: queue rabbitmq để chứa dữ liệu.
* RABBITMQ_ROUTE: route để điều hướng tới các service của rabbitmq
* RABBITMQ_DURABLE: true 
* RABBITMQ_PERSISTENT: dữ liệu trong queue đc lưu trữ hay không 
* RABBITMQ_TIMEOUT: thời gian chời dành cho mỗi queue sau lần đẩy lại 
* ENV: môi trường phát triển ( dev )

Pulling image::

    docker pull extract

Start container::

    docker run -e RABBITMQ_URI=amqp://guest:guest@localhost:5672 \
               -e RABBITMQ_CHANNEL=channel \
               -e RABBITMQ_QUEUE=queue \
               -e RABBITMQ_ROUTE=route \
               -e RABBITMQ_DURABLE=true \
               -e RABBITMQ_PERSISTENT=true \
               -e RABBITMQ_TIMEOUT=5000 \
               extract -f file_path
    or

    docker run -e RABBITMQ_URI=amqp://guest:guest@localhost:5672 \
               -e RABBITMQ_CHANNEL=channel \
               -e RABBITMQ_QUEUE=queue \
               -e RABBITMQ_ROUTE=route \
               -e RABBITMQ_DURABLE=true \
               -e RABBITMQ_PERSISTENT=true \
               -e RABBITMQ_TIMEOUT=5000 \
               extract -u mongodb_uri


2. Worker
^^^^^^^^^

Environment/Config variables:

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

Pulling image::

    docker pull worker

Start container::

    docker run -e RABBITMQ_URI=amqp://guest:guest@localhost:5672 \
               -e RABBITMQ_CHANNEL=channel \
               -e RABBITMQ_QUEUE=queue \
               -e RABBITMQ_ROUTE=route \
               -e RABBITMQ_DURABLE=true \
               -e RABBITMQ_PERSISTENT=true \
               -e RABBITMQ_TIMEOUT=5000 \
               -e RETRY=5 \
               -e MONGODB_URI=mongodb://localhost:27017/dns \
               worker 

2. MongoDB
^^^^^^^^^^

Environment variables:

* MONGO_USER: root                                                                                                               
* MONGODB_PASS: root                                                                                                          
* MONGODB_DATABASE: dns

Pulling image::

    docker pull mongodb

Start container::

    docker run -p 27017:27017 
               -p 27018:27018 -d --name mongodb \
               -e MONGO_USER=root \                                                                                                          
               -e MONGODB_PASS=root \                                                                                                          
               -e MONGODB_DATABASE=dns \
               mongodb

Start Service::

    mongod 

3. RabbitMQ
^^^^^^^^^^^

Environment variables:

* RABBITMQ_DEFAULT_USER: RabbitMQ user
* RABBITMQ_DEFAULT_PASS: RabbitMQ user password

Pulling image::

    docker pull rabbitmq:3

Start container::

    docker run -d --name rabbitmq \
               -p 5672:5672 \
               -e RABBITMQ_DEFAULT_USER=user \
               -e RABBITMQ_DEFAULT_PASS=password \
               rabbitmq:3

RabbitMQ with management plugin::

    docker run -d --name rabbitmq \
               -p 5672:5672 \
               -p 8080:15672 \
               -e RABBITMQ_DEFAULT_USER=user \
               -e RABBITMQ_DEFAULT_PASS=password \
               rabbitmq:3-management


5. ElasticSearch + Logstash + Kibana (ELK)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ELK stack (elk) cung cấp một công cụ để phân tích, thống kê, tìm kiếm dữ liệu log. các service đăng ký tới logstash, logstash ghi nhận dữ liệu log của service sau đó gửi
tới elasticsearch và từ elasticsearch , kibana sẽ query ra và hiển thị bằng giao diện( GUI ).

Setup::

    $ docker build -t logstash ./elk/logstash
    $ docker build -t kibana ./elk/kibana
    $ docker build -t elasticsearch ./elk/elasticsearch

Các biến môi trường bắt buộc:

* **.env**
    * **ES_HEAP_SIZE=**: giới hạn memory mà elasticsearch sử dụng
    * **LS_HEAP_SIZE**: giới hạn memory mà logstash sử dụng
    * **LS_OPTS**: Append logstash options.

6. MongoDB
^^^^^^^^^^

Sử dụng làm storage engine cho whois, nếu tuỳ chọn cho **ENGINE_STORAGE** là `mongo_engine`.

Environment variables:

* MONGODB_USER: mongo user
* MONGODB_PASS: mongo user password
* MONGODB_DATABASE: mongo user database

Pulling images::

    docker pull mongodb

Start containers::

    docker run -d --name mongodb \
               -p 27017:27017 \
               -p 28017:28017 \
               -e MONGO_USER="user"
               -e MONGODB_DATABASE="mydatabase" \
               -e MONGODB_PASS="mypass" \
               mongodb


