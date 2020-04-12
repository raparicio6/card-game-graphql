const logger = require('../../logger');

const createGame = (resolve, root, args) => {
  logger.info('Starting game creation with these args: ', args);
  return resolve(root, args);
};

const playTurn = (resolve, root, args) => {
  logger.info('Starting turn playing with these args: ', args);
  return resolve(root, args);
};

module.exports = {
  Mutation: {
    createGame,
    playTurn
  }
};
