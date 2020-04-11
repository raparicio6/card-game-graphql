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
        const expectedGame = getGameExample(gameId);
        expect(res.data.game).toMatchObject({
          game: {
            id: gameId,
            turns: expectedGame.game.turns,
            player: {
              name: expectedGame.game.player.name,
              hp: expectedGame.game.player.hp,
              shield: expectedGame.game.player.shield,
              cardsInHand: expectedGame.game.player.cardsInHand
            },
            monster: {
              hp: expectedGame.game.monster.hp,
              shield: expectedGame.game.monster.shield,
              cardsInHand: expectedGame.game.monster.cardsInHand
            },
            monsterEffect: expectedGame.game.monsterEffect,
            winner: expectedGame.game.winner
          }
        });
      }));
  });
});
