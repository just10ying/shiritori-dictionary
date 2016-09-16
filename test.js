const Dictionary = require('./shiritori-dictionary.js');

Dictionary.getWordBeginningWith('a', [], function(result) {
  console.log(result);
});
