const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const Who = require('./../../models/who')
const mongoose = require('mongoose')
const factory = require('factory-girl').factory

require('sinon-mongoose')
let fake = require('./../factories')

describe('who', function() {
    // this.timeout(10000)

    sinon.mock(Who)
    .expects('findOne').withArgs({'domain_name': 'TIENGANHNGUOILON.COM'})
    .yields(null, fake.who_data)
    
    // beforeEach( (done) => {
    //   done()
    // })

    // afterEach( (done) => {
    //   sinon.mock(Who).restore()
    //   done()
    // })

    it('should be invalid if domain name is empty', done => {
        let m = new Who()
        m.validate( err => {
          expect(err.errors.domain_name).to.exist
          done()
        })
    })

    it('should be valid if domain name is not empty', done => {
        let m = new Who({'domain_name': 'google.com'})
        m.validate( err => {
          expect(err).is.null
          done()
        })
    })

    it('should be valid if domain name with many value', done => {
        let m = new Who({'domain_name': 'google.com'})
        m = new Who({'domain_name': 'google.com', 'error': 'not error', 'name': 'server'})
        m.validate( err => {
          expect(err).is.null
          done()
        })
    })

    it('should be return data with find query', done => {
        Who.findOne({'domain_name': 'TIENGANHNGUOILON.COM'}, (err, res) => {
           expect(res).eq(fake.who_data)
           done()
        })
    })


})
