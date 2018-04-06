'use strict'

let expect = require('chai').expect
let RAE = require('../index')
let helper = require('../helpers')
let nock = require('nock')
let response = require('./response.js')

it('should return the definition of a word', function() {
  nock(helper.URL).post('?w=espejo').reply(200, response)

  RAE.search('espejo').then(definition => {
    expect(definition.length).to.equal(2)
    expect(definition[1].title).to.equal('espejo')
    expect(definition[0].title).to.equal('espejar')

    expect(definition[0].definition[0].entry).to.equal('De espejo.')
    expect(definition[0].definition[0].definition.length).to.equal(5)

    expect(definition[1].definition[0].entry).to.equal('Del lat. specŭlum.')
    expect(definition[1].definition[0].definition.length).to.equal(6)
  })
})
