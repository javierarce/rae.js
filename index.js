'use strict'

let fetch = require('node-fetch')
let extractDefinitionFromHTML = require('./helper')

const URL = 'http://dle.rae.es/srv/fetch'
const PARAMS = 'TS017111a7_id=3&TS017111a7_cr=1895c885a17201dca76eb401d01fd59f:jlmn:U9YRi5sw:1485055093&TS017111a7_76=0&TS017111a7_86=0&TS017111a7_md=1&TS017111a7_rf=0&TS017111a7_ct=0&TS017111a7_pd=0'

function getDefinitionForWord (word) {
  let params = { method: 'post', body: PARAMS }
  let url = URL + '?w=' + word

  return fetch(url, params)
    .then(body => body.text())
    .then(html => {
      return extractDefinitionFromHTML(html)
    })
}

module.exports = { search: getDefinitionForWord }
