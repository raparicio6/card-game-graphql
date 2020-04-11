const { ApolloServer } = require('apollo-server'),
  config = require('./config'),
  logger = require('./app/logger'),
  schema = require('./app/graphql');

const port = config.common.api.port || 8080;

new ApolloServer({ schema })
  .listen(port)
  .then(({ url, subscriptionsUrl }) => {
    logger.info(`🚀 Server ready at ${url}`);
    logger.info(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  })
  .catch(logger.error);
