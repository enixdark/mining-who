FROM node:7


MAINTAINER quandc <cqshinn92@gmail.com>

ENV HOME /root


RUN npm install -g pm2 yarn babel-cli

ADD . /usr/local/extract
WORKDIR /usr/local/extract
RUN yarn install


# CMD ["/sbin/my_init"]
CMD ["babel-node", "extract", "-f", "data/data.txt"]
