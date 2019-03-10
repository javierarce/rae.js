let xpath = require('xpath')
let DOMParser = require('xmldom').DOMParser

const URL = 'https://dle.rae.es/srv/search/1552223354284'
const PARAMS = ['TS017111a7_id=3',
'TS017111a7_cr=1895c885a17201dca76eb401d01fd59f:jlmn:U9YRi5sw:1485055093',
'TS017111a7_76=0',
'TS017111a7_86=0',
'TS017111a7_md=1',
'TS017111a7_rf=0',
'TS017111a7_ct=0',
'TS017111a7_pd=0'].join('&')

function extractDefinitionFromHTML (text) {
  let errorHandler = () => {}

  const doc = new DOMParser({ errorHandler })
    .parseFromString(text, 'text/xml')

  let result = xpath.evaluate("//article", doc, null, xpath.XPathResult.ANY_TYPE, null)


  let response = []
  let node = result.iterateNext()

  while (node) {
    let value = node.toString().replace(/(<([^>]+)>)/ig, '')
    let definition = value.split('\n').filter(s => s)
    let lines = definition.slice(1)

    let results = []
    let subdefinitions = {}

    let i = 0

    while (i < lines.length) {
      let line = lines[i]

      let lineBeginsWithNumber = !isNaN(+line.charAt(0))

      if (lineBeginsWithNumber) {
        let lineWithoutNumber = line.match(/\d+\. (.*?)$/)[1]

        if (subdefinitions.definition) {
          subdefinitions.definition.push(lineWithoutNumber)
        } else {
          subdefinitions = {
            entry: [],
            definition: [lineWithoutNumber]
          }

          results.push(subdefinitions)
        }

      } else {
        subdefinitions = {
          entry: line,
          definition: []
        }

        results.push(subdefinitions)
      }

      i++
    }

    let title = definition[0]
    title = title.replace(/[0-9.]/g, '')

    response.push({
      title: title,
      definition: results
    })

    node = result.iterateNext()
  }

  return response
}

module.exports = {
  URL,
  PARAMS,
  extractDefinitionFromHTML
}
