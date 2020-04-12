const { gql } = require('apollo-server');

const healthCheck = () => gql`
  query {
    healthCheck
  }
`;

module.exports = { healthCheck };
