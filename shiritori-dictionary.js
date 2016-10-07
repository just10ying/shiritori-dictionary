const querystring = require('querystring');
const unirest = require('unirest');

const DICTIONARY_API_URL = 'https://wordsapiv1.p.mashape.com/words/';
var mashapeAPIKey = null;

/**
 * Create the Mashape Words API query string for the provided letter
 * @param {string} letter Query string to get a random word starting with letter
 * @return {string} query string
 */
function getQueryString(letter) {
  var requestObject = {
    letterPattern: '^' + letter + '[a-z]+$',
    random: true
  };
  return '?' + querystring.stringify(requestObject);
}

/**
 * Create the Mashape Words API definition URL string for the provided word
 * @param {string} word string to get a random word starting with letter
 * @return {string} query string
 */
function getDefinitionString(word) {
  return word + '/definitions';
}

/**
 * Check if the user has set the API key
 */
function checkAPIKey() {
  if (mashapeAPIKey == null) {
    console.error('ERROR: API Key must be set!');
  }
}

/**
 * Exports two dictionary functions useful for shiritori games
 */
module.exports = {
/**
 * Set the API key to use for the Mashape Words API
 * @param {string} key API key to use
 */
  setAPIKey: function(key) {
    mashapeAPIKey = key;
  },
/**
 * Get a random word beginning with the specified letter
 * @param {string} letter desired letter
 * @param {Callback} callback first parameter is the returned word
 */
  getWordBeginningWith: function(letter, callback) {
    checkAPIKey();
    unirest.get(DICTIONARY_API_URL + getQueryString(letter))
    .header('X-Mashape-Key', mashapeAPIKey)
    .header('Accept', 'application/json')
    .end(function(result) {
      callback(result.body.word);
    });
  },
/**
 * Get a string definition for the given word
 * @param {string} word to define
 * @param {Callback} callback that provides the definition of the word.
 */
  defineWord: function(word, callback) {
    checkAPIKey();
    unirest.get(DICTIONARY_API_URL + getDefinitionString(word))
    .header('X-Mashape-Key', mashapeAPIKey)
    .header('Accept', 'application/json')
    .end(function(result) {
      if (typeof result.body.definitions == 'undefined') {
        callback(null);
      } else {
        if (result.body.definitions.length == 0) {
          callback(null);
        } else {
          callback(result.body.definitions[0].definition);
        }
      }
    });
  },
/**
 * Validate the given word to ensure that it is a real word
 * @param {string} word word to validate
 * @param {Callback} callback first parameter is a boolean describing word validity
 */
  validateWord: function(word, callback) {
    checkAPIKey();
    unirest.get(DICTIONARY_API_URL + word)
    .header('X-Mashape-Key', mashapeAPIKey)
    .header('Accept', 'application/json')
    .end(function(result) {
      if (result.code != 200) callback(false);
      else callback(true);
    });
  }
};
