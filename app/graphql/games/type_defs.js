const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    game(gameId: String!): GameContainer!
  }
`;

const customTypes = gql`
  type GameContainer {
    game: Game!
  }
  type Game {
    id: String!
    turns: [Turn!]
    player: Player!
    monster: Monster!
    monsterEffect: Card
    winner: String
  }
  type Turn {
    entityWhoPlays: String!
    cardCanBePlayed: Boolean!
    cardPlayed: Card
  }
  type Player {
    name: String!
    hp: Int!
    shield: Int!
    cardsInHand: [Card!]
  }
  type Monster {
    hp: Int!
    shield: Int!
    cardsInHand: [Card!]
  }
  type Card {
    type: String!
    value: Int
  }
`;

exports.typeDefs = [rootTypes, customTypes];
