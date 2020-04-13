const nock = require('nock');

const {
  common: { gameApiBaseUrl }
} = require('../../config');

exports.mockGetGame = (gameId, expectedGame) =>
  nock(`${gameApiBaseUrl}`)
    .get(`/games/${gameId}`)
    .reply(200, expectedGame);

exports.mockGetGameRespondWithError = (gameId, expectedError, expectedStatus) =>
  nock(`${gameApiBaseUrl}`)
    .get(`/games/${gameId}`)
    .reply(expectedStatus, expectedError);

exports.mockCreateGame = (playerName, expectedGame) =>
  nock(`${gameApiBaseUrl}`)
    .post('/games', { game: { playerName } })
    .reply(201, expectedGame);

exports.mockCreateGameRespondWithError = (playerName, expectedError, expectedStatus) =>
  nock(`${gameApiBaseUrl}`)
    .post('/games', { game: { playerName } })
    .reply(expectedStatus, expectedError);

exports.mockPlayTurn = (gameId, expectedGame) =>
  nock(`${gameApiBaseUrl}`)
    .put(`/games/${gameId}`)
    .reply(200, expectedGame);

exports.mockPlayTurnRespondWithError = (gameId, expectedError, expectedStatus) =>
  nock(`${gameApiBaseUrl}`)
    .put(`/games/${gameId}`)
    .reply(expectedStatus, expectedError);

exports.mockGetMaxNumberOfTurns = expectedResponse =>
  nock(`${gameApiBaseUrl}`)
    .get('/games/max_number_of_turns')
    .reply(200, expectedResponse);

exports.mockGetMaxNumberOfTurnsError = (expectedError, expectedStatus) =>
  nock(`${gameApiBaseUrl}`)
    .get('/games/max_number_of_turns')
    .reply(expectedStatus, expectedError);
