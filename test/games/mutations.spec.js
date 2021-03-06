const { mutate } = require('../server.test'),
  { createGame, playTurn } = require('./graphql'),
  {
    mockCreateGame,
    mockPlayTurn,
    mockCreateGameRespondWithError,
    mockPlayTurnRespondWithError
  } = require('../testUtils/mocks'),
  {
    getGameExample,
    getGameWithTurnsExample,
    databaseError,
    cardPlayedIsNotInHandError
  } = require('../testUtils/schemas/gamesSchemas');

describe('games', () => {
  describe('mutations', () => {
    describe('createGame', () => {
      it('Service respond with 201, respond with game', () => {
        const playerName = 'Paul';
        const expectedGame = getGameExample({ playerName });
        mockCreateGame(playerName, expectedGame);
        return mutate(createGame(playerName)).then(res => {
          const {
            game: { id, turns, player, monster, monsterEffect, statusAfterTurnOfPlayer, winner }
          } = expectedGame;
          expect(res.data.createGame).toMatchObject({
            id,
            turns,
            player,
            monster,
            monsterEffect,
            statusAfterTurnOfPlayer,
            winner
          });
        });
      });

      it('Service respond with error, respond with error', () => {
        const playerName = 'Fred';
        const statusCode = 503;
        mockCreateGameRespondWithError(playerName, databaseError, statusCode);
        return mutate(createGame(playerName)).then(res => {
          expect(res.data).toBe(null);
          expect(res.errors[0].message).toBe(databaseError.message);
          expect(res.errors[0].extensions.code).toBe(statusCode);
        });
      });
    });

    describe('playTurn', () => {
      it('Service respond with 200, respond with game', () => {
        const gameId = 'abc123';
        const expectedGame = getGameWithTurnsExample(gameId);
        mockPlayTurn(gameId, expectedGame);
        return mutate(playTurn(gameId, { value: 9, type: 'damage' })).then(res => {
          const {
            game: { id, turns, player, monster, monsterEffect, statusAfterTurnOfPlayer, winner }
          } = expectedGame;
          expect(res.data.playTurn).toMatchObject({
            id,
            turns,
            player,
            monster,
            monsterEffect,
            statusAfterTurnOfPlayer,
            winner
          });
        });
      });

      it('Service respond with error, respond with error', () => {
        const gameId = 'abc123';
        const statusCode = 400;
        mockPlayTurnRespondWithError(gameId, cardPlayedIsNotInHandError, statusCode);
        return mutate(playTurn(gameId, { value: 100, type: 'damage' })).then(res => {
          expect(res.data).toBe(null);
          expect(res.errors[0].message).toBe(cardPlayedIsNotInHandError.message);
          expect(res.errors[0].extensions.code).toBe(statusCode);
        });
      });
    });
  });
});
