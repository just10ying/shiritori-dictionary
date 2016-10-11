const dictionary = require('./shiritori-dictionary.js');
const assert = require('assert'); 

dictionary.setAPIKey('WAQifop2d1mshdv64vkiIrk42mBUp10GQPIjsnTQdTzKuWD3Ll');

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

// Any random word should also have a definition.
for (var i = 0; i < 10; i++) {
  dictionary.getWordBeginningWith('n', function(word) {
    dictionary.defineWord(word, function(definition) {
      assert(definition != null);
    });
  });
}

