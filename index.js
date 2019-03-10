'use strict'

let helper = require('./helpers')
let request = require('request')
let rq = require('request-promise-native')

function search (word) {
  let options = { method: 'GET',
    url: `https://dle.rae.es/srv/search/${Date.now()}`,
    qs: { w: word },
    headers: { 'cache-control': 'no-cache' } 
  }

  return rq(options)
    .then(html => {
      return helper.extractDefinitionFromHTML(html)
    })
}

module.exports = { search }

search('perro').then((a) => { console.log(a)})
