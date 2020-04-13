const { gql } = require('apollo-server');

const getGame = gameId => gql`
  query {
    game(gameId: "${gameId}") {
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
  }`;

const createGame = playerName => ({
  mutation: gql`
    mutation createGame($playerName: String!) {
      createGame(playerName: $playerName) {
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
  `,
  variables: { playerName }
});

const playTurn = (gameId, cardInput) => ({
  mutation: gql`
    mutation playTurn($gameId: String!, $cardInput: CardInput!) {
      playTurn(gameId: $gameId, cardPlayed: $cardInput) {
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
  `,
  variables: { gameId, cardInput }
});

const getMaxNumberOfTurns = () => gql`
  query {
    maxNumberOfTurns
  }
`;

module.exports = { getGame, createGame, playTurn, getMaxNumberOfTurns };
