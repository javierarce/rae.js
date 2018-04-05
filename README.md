RAE.js
=========

Node package that returns the definition of a word using the RAE dictionary.

## Installation

  `yarn add rae.js`

  or

  `npm install rae.js`

## Usage

```javascript
let RAE = require('rae.js');

RAE.getDefinitionForWord('planetoide', function (definition) {
    console.log(definition);
});

```

## Tests

  `npm test`

