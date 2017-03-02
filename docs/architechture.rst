..
   Author: Dinh Cong Quan <cqshinn@gmail.com>
   Maintainer: Dinh Cong Quan <cqshinn@gmail.com>

Architechture
=============

Link to image:

- simple

.. image:: simple.png

- advance

.. image:: advance.png

Services
--------

1. extract
^^^^^^^^^^

Service để lấy dữ liệu domain từ file, database, internet , xử lí để bóc tách lấy domain và chuyền tới message broker như rabbitmq, redis, kafka, mqtt

- Service yêu cầu: Rabbitmq

2. worker
^^^^^^^^^

Service xử lí request để lấy thông tin owner thông quan dns bằng whois protocal, sau khi nhận đựoc thông tin thì tiến hành bóc tách dữ liệu và đẩy vào database  

- Service yêu cầu: Mongodb, Rabittmq
- Service phụ thuộc:


Required Softwares
------------------

1. RabbitMQ
^^^^^^^^^^^

Message queue cho việc đẩy dns từ extract service sang worker service, và phân tán đồng đều tới các service worker qua cơ chê round robin hoặc load balance

2. MongoDB 
^^^^^^^^^^

DB dùng để lưu thông tin các dns information

3. ElasticSearch
^^^^^^^^^^^^^^^^

Chứa log tu` cac' service

4. Logstash
^^^^^^^^^^^

Nhận các thông tin logs từ các service để chuyển tới elasticsearch

5. Kibana 
^^^^^^^^^

get dữ liệu từ elasticsearch để hiển thị lên dashboard, service này đực sử dụng làm monitoring hay alert system cho toàn bộ hệ thông


Configuration Management
------------------------

1. Ansible
^^^^^^^^^^

- công cụ để tự động deploy các service (cụ thể là worker) lên các con server 

2. Terraform
^^^^^^^^^^^^