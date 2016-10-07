const querystring = require('querystring');
const unirest = require('unirest');

const DICTIONARY_API_URL = 'https://wordsapiv1.p.mashape.com/words/';
const MASHAPE_API_KEY = 'Hf6g30e7hsmsh7Z90Ty8JGj4QqxRp1Lvbcpjsn99NlC069SThT';


/**
 * Create the Mashape Words API query string for the provided letter
 * @param {string} letter Query string to get a random word starting with letter
 * @return {string} query string
 */
function getQueryString(letter) {
  var requestObject = {
    letterPattern: '^' + letter + '[a-z]$',
    random: true
  };
  return '?' + querystring.stringify(requestObject);
}

/**
 * Exports two dictionary functions useful for shiritori games
 */
module.exports = {
/**
 * Get a random word beginning with the specified letter
 * @param {string} letter desired letter
 * @param {Callback} callback first parameter is the returned word
 */
  getWordBeginningWith: function(letter, callback) {
    unirest.get(DICTIONARY_API_URL + getQueryString(letter))
    .header('X-Mashape-Key', MASHAPE_API_KEY)
    .header('Accept', 'application/json')
    .end(function(result) {
      callback(result.body.word);
    });
  },
/**
 * Validate the given word to ensure that it is a real word
 * @param {string} word word to validate
 * @param {Callback} callback first parameter is a boolean describing word validity
 */
  validateWord: function(word, callback) {
    unirest.get(DICTIONARY_API_URL + word)
    .header('X-Mashape-Key', MASHAPE_API_KEY)
    .header('Accept', 'application/json')
    .end(function(result) {
      if (result.code != 200) callback(false);
      else callback(true);
    });
  }
};
