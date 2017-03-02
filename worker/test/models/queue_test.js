const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const Queue = require('./../../models/queue')
const mongoose = require('mongoose')
const factory = require('factory-girl').factory

require('./../factories')

require('sinon-mongoose')

describe('queue', function() {

    let qu = factory.build('queue')
    debugger
    it('should be invalid if domain name is empty', done => {
        let q = new Queue()
        q.validate( err => {
          expect(err.errors.domain_name).to.exist
          done()
        })
    })

    it('should be valid if domain name is not empty', done => {
        let q = new Queue({'domain_name': 'google.com'})
        q.validate( err => {
          expect(err).is.null
          done()
        })
    })

    // it('should be valid if domain name with many value', done => {
    //     let m = new Who({'domain_name': 'google.com'})
    //     m = new Who({'domain_name': 'google.com', 'error': 'not error', 'name': 'server'})
    //     m.validate( err => {
    //       expect(err).is.null
    //       done()
    //     })
    // })
})
