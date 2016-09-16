const Dictionary = require('./shiritori-dictionary.js');
const assert = require('assert');

Dictionary.getWordBeginningWith('a', ['a bas', 'a bit'], function(result) {
  console.log(result);
});
