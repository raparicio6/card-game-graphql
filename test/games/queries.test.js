const { query } = require('../server.test'),
  { getGame } = require('./graphql'),
  { mockGetGame } = require('../testUtils/mocks'),
  { getGameExample } = require('../testUtils/schemas/gamesSchemas');

describe('games', () => {
  describe('queries', () => {
    const gameId = 'hi123';
    beforeAll(done => {
      mockGetGame(gameId);
      return done();
    });

    it('should get game properly', () =>
      query(getGame(gameId)).then(res => {
        const expectedGame = getGameExample({ gameId });
        const {
          game: { turns, player, monster, monsterEffect, winner }
        } = expectedGame;
        expect(res.data.game).toMatchObject({
          game: {
            id: gameId,
            turns,
            player: {
              name: player.name,
              hp: player.hp,
              shield: player.shield,
              cardsInHand: player.cardsInHand
            },
            monster: {
              hp: monster.hp,
              shield: monster.shield,
              cardsInHand: monster.cardsInHand
            },
            monsterEffect,
            winner
          }
        });
      }));
  });
});
