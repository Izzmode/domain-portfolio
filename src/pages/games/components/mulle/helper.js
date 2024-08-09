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

export const countBuild = (playersHand, cardInHand, ranks) => {

  let currentValueOfBuildPile = 0;

  // Calculate the current value of the build pile from the ranks array
  if (ranks.length > 0) {
    for (let i = 0; i < ranks.length; i++) {
      currentValueOfBuildPile += ranks[i];
    }
  }

  //what value of the build pile will be after added card (+/-)
  let valueOfBuildPileAfterAddingCard = currentValueOfBuildPile + cardInHand.rank;
  let valueOfBuildPileAfterSubtractingCard = currentValueOfBuildPile - cardInHand.rank;

  let buildUp = false;
  let buildDown = false;

  //checking if the number being builts value is in players hand (except from the one being built with)
  const newPlayersHand = playersHand.filter(card => card !== cardInHand);
  const isPermittedToLayChosenCard = newPlayersHand.some(card => {
    return (
      card.rank === valueOfBuildPileAfterAddingCard ||
      card.rank === valueOfBuildPileAfterSubtractingCard
    );
  });

  // Check if building up is possible
  if (valueOfBuildPileAfterAddingCard <= 16) {
    buildUp = true;
  } else {
    buildUp = false;
  }

  // Check if building down is possible
  if (valueOfBuildPileAfterSubtractingCard >= 2 && ranks.length !== 1) {
    buildDown = true;
  } else {
    buildDown = false;
  }

  return {
    isPermittedToLayChosenCard,
    buildUp,
    buildDown,
    currentValueOfBuildPile
  };
};



//lägg till calculate funktioner till pile, mulle och slutgiltigt?

//kalkylera opponents move? eller lägg till typ "isLockPossible" så man kan ge ledtrådar? ev mer avancerat?