'use strict';

let expect = require('chai').expect;
let RAE = require('../index');

it('should return the definition of a word', function() {
  RAE.search('espejo').then(definition =>
    console.log(definition)
  )
});
