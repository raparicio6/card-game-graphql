const { getGame: getGameService, createGame: createGameService } = require('../../services/games');

const getGame = (_, { gameId }) => getGameService(gameId);
const createGame = (
  _,
  {
    game: {
      game: { playerName }
    }
  }
) => createGameService(playerName);

module.exports = {
  Query: {
    game: getGame
  },
  Mutation: {
    createGame
  }
};
