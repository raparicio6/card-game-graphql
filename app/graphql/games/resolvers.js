const {
  getGame: getGameResolver,
  createGame: createGameResolver,
  playTurn: playTurnResolver
} = require('../../services/games');

const getGame = (_, { gameId }) => getGameResolver(gameId);
const createGame = (
  _,
  {
    game: {
      game: { playerName }
    }
  }
) => createGameResolver(playerName);
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
