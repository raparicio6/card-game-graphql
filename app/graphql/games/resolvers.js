const {
  getGame: getGameResolver,
  createGame: createGameResolver,
  playTurn: playTurnResolver
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

const playTurn = (_, { gameId, turn }) => playTurnResolver(gameId, turn);

module.exports = {
  Query: {
    game: getGame
  },
  Mutation: {
    createGame,
    playTurn
  }
};
