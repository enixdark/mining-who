const factory = require('factory-girl').factory
const Who    = require('./../models/who')
const Queue  = require('./../models/queue')
// const Factory = new factory.Factory()
// const MongooseAdapter = require('factory-girl-mongoose').MongooseAdapter
// Factory.setAdapter(MongooseAdapter)

// factory.define('queue', Queue, 
let queue_data = {
  domain_name: 'google.com'
}
// )

// factory.define('who', Who,
let who_data = {
      "domain_name" : "TIENGANHNGUOILON.COM",
      "registry_domain_id" : "2016927090_DOMAIN_COM-VRSN",
      "registrar_whois_server" : "whois.enom.com",
      "updated_date" : new Date("2016-03-29T10:37:05Z"),
      "creation_date" : new Date("2016-03-29T17:37:00Z"),
      "registrar" : "ENOM, INC.",
      "registrar_iana_id" : "48",
      "registry_registrant_id" : "",
      "registrant_name" : "WHOISGUARD PROTECTED",
      "registrant_organization" : "WHOISGUARD, INC.",
      "registrant_street" : "P.O. BOX 0823-03411",
      "registrant_city" : "PANAMA",
      "registrant_state_and_province" : "PANAMA",
      "registrant_postal_code" : "00000",
      "registrant_country" : "PA",
      "registrant_phone" : "+507.8365503",
      "registrant_phone_ext" : "",
      "registrant_fax" : "+51.17057182",
      "registrant_fax_ext" : "",
      "registrant_email" : "722D890772CA49319333DEA7CCEE379A.PROTECT@WHOISGUARD.COM",
      "registry_admin_id" : "",
      "admin_name" : "WHOISGUARD PROTECTED",
      "admin_organization" : "WHOISGUARD, INC.",
      "admin_street" : "P.O. BOX 0823-03411",
      "admin_city" : "PANAMA",
      "admin_state_and_province" : "PANAMA",
      "admin_postal_code" : "00000",
      "admin_country" : "PA",
      "admin_phone" : "+507.8365503",
      "admin_phone_ext" : "",
      "admin_fax" : "+51.17057182",
      "admin_fax_ext" : "",
      "admin_email" : "722D890772CA49319333DEA7CCEE379A.PROTECT@WHOISGUARD.COM",
      "registry_tech_id" : "",
      "tech_name" : "WHOISGUARD PROTECTED",
      "tech_organization" : "WHOISGUARD, INC.",
      "tech_street" : "P.O. BOX 0823-03411",
      "tech_city" : "PANAMA",
      "tech_state_and_province" : "PANAMA",
      "tech_postal_code" : "00000",
      "tech_country" : "PA",
      "tech_phone" : "+507.8365503",
      "tech_phone_ext" : "",
      "tech_fax" : "+51.17057182",
      "tech_fax_ext" : "",
      "tech_email" : "722D890772CA49319333DEA7CCEE379A.PROTECT@WHOISGUARD.COM",
      "name_server" : "NS81028.BKNS.COM.VN",
      "dnssec" : "unSigned",
      "registrar_abuse_contact_email" : "abuse@enom.com",
      "registrar_abuse_contact_phone" : "+1.4252982646"
}
// )

module.exports = {
  whois_data: who_data,
  queue_data: queue_data
}