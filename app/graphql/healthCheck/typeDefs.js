const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    healthCheck: String!
  }
`;

exports.typeDefs = [rootTypes];
