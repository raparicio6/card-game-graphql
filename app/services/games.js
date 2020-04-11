const request = require('axios');
const {
  common: { gameApiBaseUrl }
} = require('../../config');
const { GET } = require('../constants');

exports.getGame = gameId => {
  const options = {
    method: GET,
    url: `${gameApiBaseUrl}/games/${gameId}`
  };
  return request(options).then(response => response.data);
};
