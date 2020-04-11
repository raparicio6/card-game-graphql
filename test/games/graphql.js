const { gql } = require('apollo-server');

const getGame = gameId => gql`
  query {
    game(gameId: "${gameId}") {
      game {
        id
        player {
          name
          hp
          shield
          cardsInHand {
            type
            value
          }
        }
        monster {
          hp
          shield
          cardsInHand {
            type
            value
          }
        }
        turns {
          entityWhoPlays
          cardCanBePlayed
          cardPlayed {
            type
            value
          }
        }
        monsterEffect {
          type
          value
        }
        winner
      }
    }
  }`;

module.exports = { getGame };
