const nock = require('nock');

const {
  common: { gameApiBaseUrl }
} = require('../../config');

exports.mockGetGame = (gameId, expectedGame) =>
  nock(`${gameApiBaseUrl}`)
    .get(`/games/${gameId}`)
    .reply(200, expectedGame);

exports.mockGetGameRespondWithError = (gameId, expectedError) =>
  nock(`${gameApiBaseUrl}`)
    .get(`/games/${gameId}`)
    .reply(404, expectedError);

exports.mockCreateGame = (playerName, expectedGame) =>
  nock(`${gameApiBaseUrl}`)
    .post('/games', { game: { playerName } })
    .reply(201, expectedGame);

exports.mockPlayTurn = (gameId, expectedGame) =>
  nock(`${gameApiBaseUrl}`)
    .put(`/games/${gameId}`)
    .reply(200, expectedGame);
