const { ApolloError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

exports.gameApiError = (message, statusCode) => createError(message, statusCode);
