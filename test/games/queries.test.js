const { query } = require('../server.test'),
  { getGame } = require('./graphql'),
  { mockGetGame } = require('../testUtils/mocks'),
  { getGameExample } = require('../testUtils/schemas/gamesSchemas');

describe('games', () => {
  describe('queries', () => {
    const gameId = 'hi123';
    const expectedGame = getGameExample({ gameId });
    beforeAll(done => {
      mockGetGame(gameId, expectedGame);
      return done();
    });

    it('should get game properly', () =>
      query(getGame(gameId)).then(res => {
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
      }));
  });
});
