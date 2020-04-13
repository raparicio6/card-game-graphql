const {
  getGame: getGameResolver,
  createGame: createGameResolver,
  playTurn: playTurnResolver,
  getMaxNumberOfTurns: getMaxNumberOfTurnsResolver
} = require('../../services/games');
const { gameApiError } = require('../../errors');
const logger = require('../../logger');

const getGame = (_, { gameId }) =>
  getGameResolver(gameId).catch(error => {
    const errorData = error.response.data;
    const statusCode = error.response.status;
    logger.error(
      `Could not get game with id ${gameId}. Error: ${JSON.stringify(errorData)} with status ${statusCode}`
    );
    return Promise.reject(gameApiError(errorData.message, statusCode));
  });

const createGame = (
  _,
  {
    game: {
      game: { playerName }
    }
  }
) =>
  createGameResolver(playerName).catch(error => {
    const errorData = error.response.data;
    const statusCode = error.response.status;
    logger.error(
      `Could not create game for player ${playerName}. Error: ${JSON.stringify(
        errorData
      )} with status ${statusCode}`
    );
    return Promise.reject(gameApiError(errorData.message, statusCode));
  });

const playTurn = (_, { gameId, turn }) =>
  playTurnResolver(gameId, turn).catch(error => {
    const errorData = error.response.data;
    const statusCode = error.response.status;
    logger.error(
      `Could not play turn for game with id ${gameId}. Error: ${JSON.stringify(
        errorData
      )} with status ${statusCode}`
    );
    return Promise.reject(gameApiError(errorData.message, statusCode));
  });

const getMaxNumberOfTurns = () =>
  getMaxNumberOfTurnsResolver().catch(error => {
    const errorData = error.response.data;
    const statusCode = error.response.status;
    logger.error(
      `Could not max number of turns. Error: ${JSON.stringify(errorData)} with status ${statusCode}`
    );
    return Promise.reject(gameApiError(errorData.message, statusCode));
  });

module.exports = {
  Query: {
    game: getGame,
    maxNumberOfTurns: getMaxNumberOfTurns
  },
  Mutation: {
    createGame,
    playTurn
  }
};
