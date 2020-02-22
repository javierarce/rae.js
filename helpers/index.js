let xpath = require('xpath')
let DOMParser = require('xmldom').DOMParser

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
        let lineWithoutNumber = line.match(/\d+\. (.*?)$/) && line.match(/\d+\. (.*?)$/)[1]

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
  extractDefinitionFromHTML
}
