const unirest = require('unirest');
const min_letters = 3;
const max_letters = 10;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getLetterPattern(char) {
  return '^' + char + '.{' + 4 + '}$';
}

module.exports = {
  getWordBeginningWith: function(char, not, callback) {
    unirest.get('https://wordsapiv1.p.mashape.com/words/?limit=10&letterPattern=' + getLetterPattern(char))
    .header("X-Mashape-Key", "Hf6g30e7hsmsh7Z90Ty8JGj4QqxRp1Lvbcpjsn99NlC069SThT")
    .header("Accept", "application/json")
    .end(function(result) {
      var availableWords = result.body.results.data;
      console.log(availableWords);
      for (var index = 0; index < availableWords.length; index++) {
        var word = availableWords[index];
        if (not.indexOf(word) < 0) {
          callback(word);
          return;
        }
      }
      callback(null);
    });
  }
};
