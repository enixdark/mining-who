FROM node:7


MAINTAINER quandc <cqshinn92@gmail.com>

ENV HOME /root

RUN npm i -g babel-cli pm2 yarn
# RUN npm i -g http-server
ADD . /usr/local/worker
WORKDIR /usr/local/worker
RUN yarn install
RUN mv whois_bak /usr/local/bin/whois
# CMD babel-node worker.js
CMD pm2 start --no-daemon worker.js
# CMD http-server