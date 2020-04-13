const request = require('axios');
const {
  common: { gameApiBaseUrl }
} = require('../../config');
const { GET, POST, PUT } = require('../constants');

exports.getGame = gameId => {
  const options = {
    method: GET,
    url: `${gameApiBaseUrl}/games/${gameId}`
  };
  return request(options).then(response => response.data.game);
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
  return request(options).then(response => response.data.game);
};

exports.playTurn = (gameId, cardPlayed) => {
  const options = {
    method: PUT,
    url: `${gameApiBaseUrl}/games/${gameId}`,
    data: {
      turn: {
        cardPlayed
      }
    }
  };
  return request(options).then(response => response.data.game);
};

exports.getMaxNumberOfTurns = () => {
  const options = {
    method: GET,
    url: `${gameApiBaseUrl}/games/max_number_of_turns`
  };
  return request(options).then(response => response.data.maxNumberOfTurns);
};
