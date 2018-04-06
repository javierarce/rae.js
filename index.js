'use strict'

let fetch = require('node-fetch')
let helper = require('./helpers')

function search (word) {
  let params = { method: 'post', body: helper.PARAMS }
  let url = helper.URL + '?w=' + word

  return fetch(url, params)
    .then(body => body.text())
    .then(html => {
      return helper.extractDefinitionFromHTML(html)
    })
}

module.exports = { search }
