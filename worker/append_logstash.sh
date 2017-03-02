#!/bin/bash

until echo >/dev/tcp/logstash/"$LOGSTASH_PORT"
do    echo wait logstash
      sleep 1
done  2>/dev/null

tail -f /var/log/mail.log | nc logstash "$LOGSTASH_PORT"