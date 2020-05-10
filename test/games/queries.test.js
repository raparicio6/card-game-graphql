const { query } = require('../server.test'),
  { getGame, getMaxNumberOfTurns } = require('./graphql'),
  {
    mockGetGame,
    mockGetGameRespondWithError,
    mockGetMaxNumberOfTurns,
    mockGetMaxNumberOfTurnsError
  } = require('../testUtils/mocks'),
  { getGameExample, gameWasNotFoundError } = require('../testUtils/schemas/gamesSchemas');

describe('games', () => {
  describe('queries', () => {
    describe('game', () => {
      it('Service respond with 200, respond with game', () => {
        const gameId = 'hi123';
        const expectedGame = getGameExample({ gameId });
        mockGetGame(gameId, expectedGame);
        return query(getGame(gameId)).then(res => {
          const {
            game: { turns, player, monster, monsterEffect, winner, statusAfterTurnOfPlayer }
          } = expectedGame;
          expect(res.data.game).toMatchObject({
            id: gameId,
            turns,
            player,
            monster,
            monsterEffect,
            winner,
            statusAfterTurnOfPlayer
          });
        });
      });

      it('Service respond with error, respond with error', () => {
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

    describe('maxNumberOfTurns', () => {
      it('Service respond with 200, respond with maxNumberOfTurns', () => {
        const maxNumberOfTurns = { maxNumberOfTurns: 12 };
        mockGetMaxNumberOfTurns(maxNumberOfTurns);
        return query(getMaxNumberOfTurns()).then(res => expect(res.data).toMatchObject(maxNumberOfTurns));
      });

      it('Service respond with error, respond with error', () => {
        const error = { message: 'Service Unavailable' };
        const statusCode = 503;
        mockGetMaxNumberOfTurnsError(error, statusCode);
        return query(getMaxNumberOfTurns()).then(res => {
          expect(res.data).toBe(null);
          expect(res.errors[0].message).toBe(error.message);
          expect(res.errors[0].extensions.code).toBe(statusCode);
        });
      });
    });
  });
});
