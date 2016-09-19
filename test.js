const Dictionary = require('./shiritori-dictionary.js');
const assert = require('assert');

Dictionary.getWordBeginningWith('a', [], function(result) {
  console.log(result);
});

function Word(word, real) {
  this.word = word;
  this.real = real;
}

var testWords = [];
testWords.push(new Word('John', true));
testWords.push(new Word('ggjohnlee', false));

testWords.forEach(function(obj) {
  Dictionary.validateWord(obj.word, function(result) {
    assert(obj.real == result);
  });
});


