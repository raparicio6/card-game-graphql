exports.getGameExample = gameId => ({
  game: {
    id: gameId,
    turns: [{ entityWhoPlays: 'Player', cardCanBePlayed: true, cardPlayed: null }],
    player: {
      name: 'Fred',
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
