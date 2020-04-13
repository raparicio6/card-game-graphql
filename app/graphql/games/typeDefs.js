const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    game(gameId: String!): Game!
    maxNumberOfTurns: Int!
  }
  extend type Mutation {
    createGame(playerName: String!): Game!
    playTurn(gameId: String!, cardPlayed: CardInput): Game!
  }
`;

const customTypes = gql`
  type Game {
    id: String!
    turns: [Turn!]
    player: Player!
    monster: Monster!
    monsterEffect: Card
    statusAfterTurnOfPlayer: GameStatus
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
  type GameStatus {
    player: EntityStatus!
    monster: EntityStatus!
    winner: String
  }
  type EntityStatus {
    hp: Int!
    shield: Int!
  }
`;

const inputTypes = gql`
  input CardInput {
    type: String!
    value: Int!
  }
`;

exports.typeDefs = [rootTypes, customTypes, inputTypes];
