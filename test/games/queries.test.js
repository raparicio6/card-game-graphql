const { query } = require('../server.test'),
  { getGame } = require('./graphql'),
  { mockGetGame, mockGetGameRespondWithError } = require('../testUtils/mocks'),
  { getGameExample, gameWasNotFoundError } = require('../testUtils/schemas/gamesSchemas');

describe('games', () => {
  describe('queries', () => {
    describe('getGame', () => {
      it('Service respond with 200, should respond with game properly', () => {
        const gameId = 'hi123';
        const expectedGame = getGameExample({ gameId });
        mockGetGame(gameId, expectedGame);
        return query(getGame(gameId)).then(res => {
          const {
            game: { turns, player, monster, monsterEffect, winner }
          } = expectedGame;
          expect(res.data.game).toMatchObject({
            game: {
              id: gameId,
              turns,
              player,
              monster,
              monsterEffect,
              winner
            }
          });
        });
      });
    });

    it('Service respond with error, should respond with error', () => {
      const gameId = 'IdontExist';
      const statusCode = 404;
      mockGetGameRespondWithError(gameId, gameWasNotFoundError, statusCode);
      return query(getGame(gameId)).then(res => {
        expect(res.data).toBe(null);
        expect(res.errors[0].message).toBe(gameWasNotFoundError.message);
        expect(res.errors[0].extensions.code).toBe(statusCode);
      });
    });
  });
});
