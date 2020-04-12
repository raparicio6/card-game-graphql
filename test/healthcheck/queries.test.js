const { query } = require('../server.test'),
  { healthCheck } = require('./graphql');

describe('healthcheck', () => {
  describe('queries', () => {
    describe('healthCheck', () => {
      it('app is ok should respond with healt', () =>
        query(healthCheck()).then(res => expect(res.data.healthCheck).toStrictEqual(expect.any(String))));
    });
  });
});
