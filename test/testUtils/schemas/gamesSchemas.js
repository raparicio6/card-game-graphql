exports.getGameExample = ({ gameId = 'abc123', name = 'Fred' }) => ({
  game: {
    id: gameId,
    turns: [{ entityWhoPlays: 'Player', cardCanBePlayed: true, cardPlayed: null }],
    player: {
      name,
      hp: 20,
      shield: 0,
      cardsInHand: [
        {
          type: 'heal',
          value: 8
        },
        {
          type: 'shield',
          value: 9
        }
      ]
    },
    monster: {
      hp: 20,
      shield: 10,
      cardsInHand: [
        {
          type: 'damage',
          value: 10
        },
        {
          type: 'horror'
        }
      ]
    },
    monsterEffect: null,
    winner: null
  }
});

exports.getGameWithTurnsExample = gameId => ({
  game: {
    id: gameId,
    turns: [
      {
        entityWhoPlays: 'Player',
        cardCanBePlayed: true,
        cardPlayed: {
          type: 'damage',
          value: 9
        }
      },
      {
        entityWhoPlays: 'Monster',
        cardCanBePlayed: true,
        cardPlayed: {
          type: 'damage',
          value: 7
        }
      },
      {
        entityWhoPlays: 'Player',
        cardCanBePlayed: true,
        cardPlayed: null
      }
    ],
    player: {
      name: 'Fred',
      hp: 13,
      shield: 0,
      cardsInHand: [
        {
          type: 'shield',
          value: 8
        },
        {
          type: 'damage',
          value: 11
        },
        {
          type: 'heal',
          value: 11
        },
        {
          type: 'shield',
          value: 10
        },
        {
          type: 'shield',
          value: 8
        }
      ]
    },
    monster: {
      hp: 20,
      shield: 1,
      cardsInHand: [
        {
          type: 'heal',
          value: 7
        },
        {
          type: 'shield',
          value: 6
        },
        {
          type: 'heal',
          value: 7
        },
        {
          type: 'damage',
          value: 6
        }
      ]
    },
    monsterEffect: {
      type: 'damage',
      value: 7
    },
    winner: null
  }
});

exports.gameWasNotFoundError = { message: 'Game was not found', internalCode: 'game_was_not_found_error' };
