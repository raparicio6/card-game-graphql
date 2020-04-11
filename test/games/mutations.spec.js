const { mutate } = require('../server.test'),
  { createGame, playTurn } = require('./graphql'),
  { mockCreateGame, mockPlayTurn } = require('../testUtils/mocks'),
  { getGameExample, getGameWithTurns } = require('../testUtils/schemas/gamesSchemas');

describe('games', () => {
  describe('mutations', () => {
    it('should create a game successfuly', () => {
      const playerName = 'Paul';
      const expectedGame = getGameExample({ playerName });
      mockCreateGame(playerName, expectedGame);
      return mutate(createGame({ game: { playerName } })).then(res => {
        const {
          game: { id, turns, player, monster, monsterEffect, winner }
        } = expectedGame;
        expect(res.data.createGame).toMatchObject({
          game: {
            id,
            turns,
            player,
            monster,
            monsterEffect,
            winner
          }
        });
      });
    });

    it('should play a turn successfuly', () => {
      const gameId = 'abc123';
      const expectedGame = getGameWithTurns(gameId);
      mockPlayTurn(gameId, expectedGame);
      return mutate(playTurn(gameId, { turn: { cardPlayed: { value: 9, type: 'damage' } } })).then(res => {
        const {
          game: { id, turns, player, monster, monsterEffect, winner }
        } = expectedGame;
        expect(res.data.playTurn).toMatchObject({
          game: {
            id,
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
});
