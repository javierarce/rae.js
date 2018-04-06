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

RAE.search('planetoide').then(definition =>
  console.log(definition);
);

```

That should return something like this:

```javascript
[
  {
    "title": "planetoide",
    "definition": [
      {
        "entry": [],
        "definition": [
          "m. asteroide (‖ cuerpo menor del sistema solar)."
        ]
      }
    ]
  }
]
```

## Tests

  `npm test`

