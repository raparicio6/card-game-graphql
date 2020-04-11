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

const createGame = gameInput => ({
  mutation: gql`
    mutation createGame($gameInput: GameInputContainer!) {
      createGame(game: $gameInput) {
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
    }
  `,
  variables: { gameInput }
});

module.exports = { getGame, createGame };
