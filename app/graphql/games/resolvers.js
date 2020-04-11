const { getGame: getGameService } = require('../../services/games');

const getGame = (_, { gameId }) => getGameService(gameId);

module.exports = {
  Query: {
    game: getGame
  }
};
