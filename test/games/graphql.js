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
        statusAfterTurnOfPlayer {
          player {
            hp
            shield
          }
          monster {
            hp
            shield
          }
          winner
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

const playTurn = (gameId, turnInput) => ({
  mutation: gql`
    mutation playTurn($gameId: String!, $turnInput: TurnInputContainer!) {
      playTurn(gameId: $gameId, turn: $turnInput) {
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
  variables: { gameId, turnInput }
});

const getMaxNumberOfTurns = () => gql`
  query {
    maxNumberOfTurns {
      maxNumberOfTurns
    }
  }
`;

module.exports = { getGame, createGame, playTurn, getMaxNumberOfTurns };
