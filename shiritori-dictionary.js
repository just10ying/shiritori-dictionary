const querystring = require('querystring');
const unirest = require('unirest');

const DICTIONARY_API_URL = 'https://wordsapiv1.p.mashape.com/words/';
const MASHAPE_API_KEY = 'Hf6g30e7hsmsh7Z90Ty8JGj4QqxRp1Lvbcpjsn99NlC069SThT';

function getQueryString(letter) {
  var requestObject = {
    letterPattern: '^' + letter + '[a-z]+',
    random: true
  };
  return '?' + querystring.stringify(requestObject);
}

module.exports = {
  getWordBeginningWith: function(letter, usedWordsArray, callback) {
    unirest.get(DICTIONARY_API_URL + getQueryString(letter))
    .header("X-Mashape-Key", MASHAPE_API_KEY)
    .header("Accept", "application/json")
    .end(function(result) {
      var word = result.body.word;
      if (usedWordsArray.indexOf(word) < 0) {
        callback(word);
        return;
      }
      callback(null);
    });
  },
  validateWord: function(word, callback) {
    unirest.get(DICTIONARY_API_URL + word)
    .header("X-Mashape-Key", MASHAPE_API_KEY)
    .header("Accept", "application/json")
    .end(function(result) {
      if (result.code != 200) callback(false);
      else callback(true);
    });
  }
};
