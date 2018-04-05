let xpath = require('xpath')
let DOMParser = require('xmldom').DOMParser

module.exports = function (text) {
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
        subdefinitions.definition.push(lineWithoutNumber)
      } else {
        subdefinitions = {
          entry: line,
          definition: []
        }

        results.push(subdefinitions)
      }

      i++
    }

    response.push({
      title: definition[0],
      definition: results
    })

    node = result.iterateNext()
  }

  return response
}
