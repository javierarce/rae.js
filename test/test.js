'use strict'

let expect = require('chai').expect
let RAE = require('../index')
let helper = require('../helpers')
let nock = require('nock')
let response = require('./response.js')

const URL = 'https://dle.rae.es/srv/search'

it('should return the definition of a word', async () => {
  const word = 'espejo'
  nock(URL).get(`?w=${word}`).reply(200, response)

  const definition = await RAE.search(word)

  expect(definition.length).to.equal(2)
  expect(definition[1].title).to.equal(word)
  expect(definition[0].title).to.equal('espejar')

  expect(definition[0].definition[0].entry).to.equal('De espejo.')
  expect(definition[0].definition[0].definition.length).to.equal(5)

  expect(definition[1].definition[0].entry).to.equal('Del lat. specŭlum.')
  expect(definition[1].definition[0].definition.length).to.equal(6)
})

