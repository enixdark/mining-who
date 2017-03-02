# Whois Service

use docker with docker-compose to run automation service in local

## requirements:

- python
- docker
- docker-compose

## Before Run 

- please install docker via repo or script file

all:

`curl -sSL https://get.docker.com/ | sh' # or: # 'wget -qO- https://get.docker.com/ | sh'`

for ubuntu:

`apt-get install docker.io`

for centos

`yum install docker.io`

- then, install python, python-dev , python-pip and docker-compose 

`pip install docker-compose`

- check port in iptable or via netstat to ensure don't have any service conflict with service in docker-compose 

## Run 

- use `docker-compose up` to run all service, or `docker-compose up -d` to run background/daemon 
- for each service, use `docker-compose up [name]` 
  + name, it mean: name for each service that define in "services" area
  + example `docker-compose up mongodb` or `docker-compose up worker`

- to scale out service use `docker-compose scale worker=number_service`
