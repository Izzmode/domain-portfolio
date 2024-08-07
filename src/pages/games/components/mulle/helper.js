const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export const generateDeck = () => {
  const deck = [];
  for (let i = 0; i < 2; i++) {
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank, id: `${suit}-${rank}-${i}` });
      }
    }
  }
  return deck;
}

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

//tbd döp om? hantera modal här? ta in states eller ha ytterliggare en funkntion i denna?
export const countBuild = (initialCard, playersHand, cardInHand, ranks) => {

  if(ranks.length < 0) {
    return
  } else {

    let currentValueOfBuildPile = 0;
    for (let i = 0; i < ranks.length; i++) {
      currentValueOfBuildPile += ranks[i];
    }

    const valueOfBuildPileAfterAddingCard = currentValueOfBuildPile + cardInHand.rank;
  
    if(valueOfBuildPileAfterAddingCard > 16) {
      console.log('can not build above 16')
      return
    }
    if(valueOfBuildPileAfterAddingCard < 2) {
      console.log('can not build lower than 2')
      return
    }
  
    const newPlayersHand = playersHand.filter(card => {
      return card !== cardInHand
    })
  
    const isPermittedToLayChosenCard = newPlayersHand.some(card => {
      return card.rank === valueOfBuildPileAfterAddingCard
    })

    if(!isPermittedToLayChosenCard) {
      return
    }
  }

  

}

//lägg till calculate funktioner till pile, mulle och slutgiltigt?

//kalkylera opponents move? eller lägg till typ "isLockPossible" så man kan ge ledtrådar? ev mer avancerat?