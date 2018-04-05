'use strict'

let fetch = require('node-fetch')
let FormData = require('form-data')
let xpath = require('xpath')
let dom = require('xmldom').DOMParser

let METHOD = 'POST'
let URL = 'http://dle.rae.es/srv/fetch'
let PARAMS = 'TS017111a7_id=3&TS017111a7_cr=1895c885a17201dca76eb401d01fd59f:jlmn:U9YRi5sw:1485055093&TS017111a7_76=0&TS017111a7_86=0&TS017111a7_md=1&TS017111a7_rf=0&TS017111a7_ct=0&TS017111a7_pd=0'

function getDefinitionForWord (word, callback) {
  let params = { method: METHOD, body: PARAMS }
  let url = `${URL}?w=${word}`

  let res = fetch(url, params)
    .then(body => body.text())
    .then(html => {
    callback(extract(html))
  })
}

function extract(text) {
  let errorHandler = () => {}

  const doc = new dom({ errorHandler })
    .parseFromString(text, 'text/xml')

  let result = xpath.evaluate("//article", doc, null, xpath.XPathResult.ANY_TYPE, null)

  let definitions = []
  let node = result.iterateNext()

  while (node) {
    let value = node.toString().replace(/(<([^>]+)>)/ig, '')
    let definition = value.split('\n').filter(s => s)
    let d = definition.slice(1)

    let results = []
    let subdefinitions = {}

    let i = 0

    while (i < d.length) {
      let line = d[i]

      let isNumber = !isNaN(+line.charAt(0))

      if (isNumber) {
        line = line.match(/\d+\. (.*?)$/)[1]
        subdefinitions.definition.push(line)
      } else {
        subdefinitions = { entry: line, definition: [] }
        results.push(subdefinitions)
      }

      i++
    }

    definitions.push({
      title: definition[0],
      definitions: results
    })

    node = result.iterateNext()
  }

  return definitions
}

getDefinitionForWord('espejo', function (definition) {
  console.log(definition)
})

