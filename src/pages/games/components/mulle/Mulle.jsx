import { useState, useEffect } from 'react'
import Card from './card';
import './mulle.css'

const Mulle = () => {

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

  const generateDeck = () => {
    const deck = [];
    for (let i = 0; i < 2; i++) {
      for (const suit of suits) {
        for (const rank of ranks) {
          deck.push({ suit, rank, id: `${suit}-${rank}-${i}` });
        }
      }
    }
    return deck;
  };

  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };
  
  const initialDeck = shuffleDeck(generateDeck());
  const [activeDeck, setActiveDeck] = useState(initialDeck);

  const [playersDeck, setPlayersDeck] = useState([]);
  const [playersHand, setPlayersHand] = useState([]);

  const [opponentsDeck, setOpponentsDeck] = useState(null);
  const [opponentsHand, setOpponentsHand] = useState(null);

  const [cardsInPlay, setCardsInPlay] = useState([])
  const [cardsOnTable, setCardsOnTable] = useState([])

  const [chosenCardToPlay, setChosenCardToPlay] = useState(null)
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedSelectedCards, setMatchedSelectedCards] = useState([]);

  const [errorMessage, setErrorMessage] = useState(false)

  const [boardActive, setBoardActive] = useState(false)
  const [handActive, setHandActive] = useState(false)

  const [playingMulle, setPlayingMulle] = useState(false)
  const [playingTired, setPlayingTired] = useState(false)
  const [playingBuild, setPlayingBuild] = useState(false)
  const [playingLock, setPlayingLock] = useState(false)
  const [playingLay, setPlayingLay] = useState(false)
  const [playingPickUp, setPlayingPickUp] = useState(false)

  const [showAllButtons, setShowAllButtons] = useState(true)

  const choseCardOnBoard = (selectedCard) => {
    if (!chosenCardToPlay) return;
  
    const newSelectedCards = selectedCards.includes(selectedCard)
      ? selectedCards.filter((c) => c !== selectedCard)
      : [...selectedCards, selectedCard];
  
    const totalValue = newSelectedCards.reduce((sum, c) => sum + parseInt(c.rank, 10), 0);
    const chosenValue = parseInt(chosenCardToPlay.rank, 10);
  
    if (totalValue > chosenValue) {
      //fixa felmeddelande
      setErrorMessage('Total value exceeds chosen card rank');
    } else {
      setSelectedCards(newSelectedCards);
  
      if (totalValue === chosenValue) {
        setMatchedSelectedCards((prev) => [...prev, ...newSelectedCards]);
        //start a new så att säga. 
        //markera synligt att de är "par"
        //gör så man kan klicka på andra.
        // setVisibleCards((prev) => prev.filter((c) => !newSelectedCards.includes(c)));
        setSelectedCards([]); // Reset selectedCards array after successful match
        // alert('Matched!');
      }
    }
  };
  

  const choseWhichCardToPlay = (card) => {
    if (card === chosenCardToPlay) {
      setChosenCardToPlay(null);
      setSelectedCards([]);
      setMatchedSelectedCards([])

    } else {
      setChosenCardToPlay(card);
      setSelectedCards([]);
      setMatchedSelectedCards([])
    }
  };

  const [isCardAdded, setIsCardAdded] = useState(false);
  
  const dispurseFirstRoundOfCards = () => {
    const newDeck = [...activeDeck];
    const cardsOnTable = newDeck.splice(0, 24);
    setActiveDeck(newDeck);
    setCardsInPlay(cardsOnTable);
    
    const newCardsInPlay = [...cardsOnTable]
    const playersHand = newCardsInPlay.splice(0, 8)
    const opponentsHand = newCardsInPlay.splice(0, 8)
    const visibleCards = newCardsInPlay.splice(0, 8)
    setOpponentsHand(opponentsHand)
    setPlayersHand(playersHand)
    setCardsOnTable(visibleCards)
  }

  const removedCards = [
    { id: 'hearts-2-0' },
    { id: 'diamonds-5-1' },
    { id: 'spades-K-0' }
  ];

  const addOneNewCard = (cardRemoved, player) => {
    const newDeck = [...activeDeck];
    const dealtCard = newDeck.splice(0, 1)[0];
    setActiveDeck(newDeck)

    if(player) {
      const newHand = playersHand?.filter(card => {
        return card.id !== cardRemoved.id
      })
      
      newHand.push(dealtCard)
      setPlayersHand(newHand)

    } else {
      const newHand = opponentsHand?.filter(card => {
        return card.id !== cardRemoved.id
      })
      
      newHand.push(dealtCard)
      setOpponentsHand(newHand)

    }

  }

  useEffect(() => {
    dispurseFirstRoundOfCards()    
  }, [])

  useEffect(() => {
    if (opponentsHand && !isCardAdded) {
      const delay = setTimeout(() => {
        addOneNewCard({ id: 'clubs-2-1' }, false);
        setIsCardAdded(true);
      }, 2000); // Delay of 3 seconds (3000 milliseconds)

      // Clear timeout if the component unmounts
      return () => clearTimeout(delay);
    }
  }, [opponentsHand]);

  useEffect(() => {
    console.log(playersDeck)
  }, [playersDeck]);

  const submitPoints = () => {

    setPlayersDeck((prev) => [...prev, ...matchedSelectedCards, chosenCardToPlay])

    //dela ut nytt kort och uppdatera kortleken
    const newDeck = [...activeDeck];
    const [newDealtCard] = newDeck.splice(0, 1);
    setActiveDeck(newDeck);

    const newPlayersHand = playersHand.filter(function(item) {
      return item !== chosenCardToPlay  
    })
    
    const newCardsOnTable = cardsOnTable.filter((item) => 
      !matchedSelectedCards.some((selectedCard) => selectedCard.id === item.id)
    );

    setCardsOnTable(newCardsOnTable)
    setPlayersHand([...newPlayersHand, newDealtCard ])
    setMatchedSelectedCards([])

  }

  const addCardToBoard = (card) => {

    //dela ut nytt kort och uppdatera kortleken
    const newDeck = [...activeDeck];
    const [newDealtCard] = newDeck.splice(0, 1);
    setActiveDeck(newDeck);

    const newPlayersHand = playersHand.filter(function(item) {
      return item !== card  
    })
    const newCardsOnTable = [...cardsOnTable, card];
    console.log(newCardsOnTable, 'newcards on table, blir det fel?')
    
    setCardsOnTable(newCardsOnTable)
    setPlayersHand([...newPlayersHand, newDealtCard ])
    //ha kvar den, för man kan clicka i dom
    setMatchedSelectedCards([])
  }

  console.log(cardsOnTable, 'cardsontable utandör')

  //tbd different modes beroende på vad du vill göra? 
  //bygga, låsa, (mulle? eftersom den får man inte ta mer av), lägga kort, ta kort?

  const onPickMulle = () => {
    setBoardActive(true)
    const newCardsOnTable = cardsOnTable.filter(card => {

    })
  }

  const chooseGameToPlay = (e, card) => {
    // console.log(e, 'e', card, 'card')

    console.log(handActive)
    //kommentera ut for now
    // if(!handActive) return

    const game = e.target.id;
    // tbdsätt i en egen funktion?
    setPlayingBuild(false)
    setPlayingLay(false)
    setPlayingLock(false)
    setPlayingMulle(false)
    setPlayingPickUp(false)
    setPlayingTired(false)
    setShowAllButtons(false)

    switch(game) {
      case 'mulle':
      setPlayingMulle(true)
      setHandActive(true)
      //om jag har en funktion här, flytta set till funktionen
      break;

      case 'build':
      setPlayingBuild(true)
      console.log('build')
      break;

      case 'tired':
      setPlayingTired(true)
      console.log('tired')
      break;

      case 'lock':
      setPlayingLock(true)
      console.log('lock')
      break;

      case 'lay':
      //tbd gör om bara så de andra alterantiven försinner
      //highlighta players card
      //ändra texten i knappen till submit
      // addCardToBoard()
      setHandActive(true)
      setPlayingLay(true)
      break;

      case 'pickUp':
      setPlayingPickUp(true)
      console.log('pickUp')
      break;

    }

  }

  const playGame = (card) => {

    if(playingMulle) {
      console.log('you are playing mulle')
    } else if(playingBuild) {
      console.log('you are playing build')
    } else if (playingLay) {
      addCardToBoard(card)
      //återställa efter man kört?
      //fast då ska motståndaren köra...
      //ha en funktion som kommar när isPlaying är klar typ? 
      //då köra datorns drag, sen sätta isPlating till true?
    } else if(playingLock) {
      console.log('you are playing lock')

    } else if(playingPickUp) {
      console.log('you are playing pickUp')

    } else if(playingTired) {
      console.log('you are playing tired')

    } else {
      console.log('something went wrong')
    }

  }

  return (
    <div className='Mulle'>
      <div className={`cards-table ${boardActive && 'active'}`}>
          {cardsOnTable?.map((card) => (
          <Card
          key={card.id}
          card={card} 
          choseCardOnBoard={choseCardOnBoard}
          chosenCardToPlay={chosenCardToPlay}
          isSelected={selectedCards.includes(card)}
          isMatched={matchedSelectedCards.includes(card)}
          tablesCard={true}
          chooseGameToPlay={chooseGameToPlay}
          playingBuild
          playingLay
          playingLock
          playingMulle
          playingPickUp
          playingTired
          />
        ))}
      </div>
      <div className="card-and-options-wrapper">
            {/* <p className='error'>{errorMessage && errorMessage}</p> */}
          {showAllButtons &&
            <p>What do you wish to do?</p>
          }
          <div className='options'>
          { (playingLay || showAllButtons) &&
            <button 
            className='add-btn btn' 
            id="lay" 
            onClick={chooseGameToPlay}>
              Add a card to the board
            </button>
            }
            { cardsOnTable.length > 0 &&
            <>
            { (playingBuild || showAllButtons) &&
            <button 
            className='add-btn btn' 
            id="build" 
            onClick={chooseGameToPlay}>
              Build on a card
            </button>
            }
            { (playingLock || showAllButtons) &&
            <button 
            className='add-btn btn' 
            id="lock" 
            onClick={chooseGameToPlay}>
              Lock cards
            </button>
            }
            { (playingTired || showAllButtons) &&
            <button 
            className='add-btn btn' 
            id="tired" 
            onClick={chooseGameToPlay}>
              Tired
            </button>
            }
            { (playingPickUp || showAllButtons) &&
            <button 
            className='submit-btn btn' 
            id="pickUp" 
            onClick={chooseGameToPlay}>
              Pick up cards from the board
            </button>
            }
            { (playingMulle || showAllButtons) &&
            <button 
            className='submit-btn btn' 
            id="mulle" 
            onClick={chooseGameToPlay}>
              Take Mulle
            </button>
            }
            </>
          }
          </div>
      <div className={`cards-player ${handActive && 'active'}`}>
      {playersHand?.map((card) => (
          <Card 
          key={card.id} 
          card={card} 
          choseWhichCardToPlay={choseWhichCardToPlay} 
          chosenCardToPlay={chosenCardToPlay}
          playersCard={true}
          handActive={handActive}
          playGame={playGame}
          />
        ))}
      </div>

      </div>
    </div>
  )
}

export default Mulle