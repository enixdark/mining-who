import pymongo
from pymongo import MongoClient
import json
client = MongoClient('103.57.220.75', 27017)
db = client.whois
collection = db.suffix

with open('./data/server.json', 'wb') as f:
    data = {}
    for item in collection.find():
        try:
            data[item['suffix']] = item['host']
        except Exception, err:
            pass
    json.dump(data, f)

