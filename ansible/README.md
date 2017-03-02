

### Automation deploy mailship
- collections scripts use ansible to deploy services of mailship to server

## Require
- local
  + python >= 2.7
  + ansible >= 2.1.0
- server
  + docker-compose >= 1.8.0

## Before Setup
- Config remote host , private key ssh in ansible.cfg and hosts file
- add password via ssh-agent to avoid ask about password when remote to any servers
  +  `ssh-agent bash && ssh-add ~/.ssh/id_rsa`
- Config variables for services in environments/staging/group_vars ( example: username, password to setup for worker, 
  elasticsearch , network host for docker....)


## Setup
- Enable exec file in project:
  + `chmod +x *.sh`
- setup virtualenv with ansible
  + ./env.sh
  + source ./venv/bin/activate
- clone source code from gitlab/github/svn of worker app into projects folder ( because it have a error. hangup when use git/svn module or shell command in ansible so should clone source from local )
- deploy services to server, add -vvv if you want full logs to check tasks
  + ansible-playbook playbook.yml [-vvv]
  