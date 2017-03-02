const mongoose = require('mongoose')
const fieldsAliasPlugin = require('mongoose-aliasfield')
let queueSchema = mongoose.Schema({
    'domain_name': { type: String, index: true, required: true},
    
})

queueSchema.set({'collection': 'queue'})
queueSchema.plugin(fieldsAliasPlugin)

let Queue = mongoose.model('queue', queueSchema)
module.exports = Queue