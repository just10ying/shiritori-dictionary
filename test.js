const dictionary = require('./shiritori-dictionary.js');
const assert = require('assert'); 

dictionary.setAPIKey('insert your key here');

dictionary.validateWord('John', function(valid) {
  assert(valid);
});
dictionary.validateWord('Johnwefggg', function(valid) {
  assert(!valid);
});

dictionary.getWordBeginningWith('g', function(word) {
  assert(word.charAt(0) == 'g');
});

dictionary.defineWord('notawordlol', function(definition) {
  assert(definition == null);
});
dictionary.defineWord('car', function(definition) {
  assert(definition == 'a motor vehicle with four wheels; usually propelled by an internal combustion engine');
});
