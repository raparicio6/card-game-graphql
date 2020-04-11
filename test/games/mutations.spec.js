const { mutate } = require('../server.test'),
  { createGame } = require('./graphql'),
  { mockCreateGame } = require('../testUtils/mocks'),
  { getGameExample } = require('../testUtils/schemas/gamesSchemas');

describe('games', () => {
  const playerName = 'Paul';
  beforeAll(done => {
    mockCreateGame(playerName);
    return done();
  });

  describe('mutations', () => {
    it('should create a game successfuly', () =>
      mutate(createGame({ game: { playerName } })).then(res => {
        const expectedGame = getGameExample({ playerName });
        const {
          game: { id: expectedId, player: expectedPlayer }
        } = expectedGame;
        const {
          game: { id, player }
        } = res.data.createGame;
        expect(id).toEqual(expectedId);
        expect(player.name).toEqual(expectedPlayer.name);
      }));
  });
});
