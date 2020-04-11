const request = require('axios');
const {
  common: { gameApiBaseUrl }
} = require('../../config');
const { GET, POST } = require('../constants');

exports.getGame = gameId => {
  const options = {
    method: GET,
    url: `${gameApiBaseUrl}/games/${gameId}`
  };
  return request(options).then(response => response.data);
};

exports.createGame = playerName => {
  const options = {
    method: POST,
    url: `${gameApiBaseUrl}/games`,
    data: {
      game: {
        playerName
      }
    }
  };
  return request(options).then(response => response.data);
};
