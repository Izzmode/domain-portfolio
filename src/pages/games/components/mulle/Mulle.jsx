import { useState, useEffect } from 'react'
import { generateDeck, shuffleDeck, countBuild } from './helper';
import Card from './Card';
import Modal from './Modal'
import './mulle.css'

const Mulle = () => {

  const initialDeck = shuffleDeck(generateDeck());
  const [activeDeck, setActiveDeck] = useState(initialDeck);

  const [playerScorePile, setPlayerScorePile] = useState([]);
  const [playerMullePile, setPlayerMullePile] = useState([])
  const [playersHand, setPlayersHand] = useState([]);

  const [opponentScorePile, setOpponentScorePile] = useState([]);
  const [opponentMullePile, setOpponentMullePile] = useState([])
  const [opponentsHand, setOpponentsHand] = useState([]);

  //behövs cards in play?
  const [cardsInPlay, setCardsInPlay] = useState([])
  const [cardsOnTable, setCardsOnTable] = useState([])

  const [chosenCardToPlay, setChosenCardToPlay] = useState(null)
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedSelectedCards, setMatchedSelectedCards] = useState([]);

  const [errorMessage, setErrorMessage] = useState(false)

  const [boardActive, setBoardActive] = useState(false)
  const [handActive, setHandActive] = useState(false)

  //gör om till key value pairs?
  const [playingMulle, setPlayingMulle] = useState(false)
  const [playingTired, setPlayingTired] = useState(false)
  const [playingBuild, setPlayingBuild] = useState(false)
  const [playingLock, setPlayingLock] = useState(false)
  const [playingLay, setPlayingLay] = useState(false)
  const [playingPickUp, setPlayingPickUp] = useState(false)

  const [showAllButtons, setShowAllButtons] = useState(true)
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
  useEffect(() => {
    dispurseFirstRoundOfCards()    
  }, [])

  //dessa två för pick up cards on board?
  // const pickUpCardsFromBoard = (selectedCard, nestedArray) => {
  
  //   const newSelectedCards = selectedCards.includes(selectedCard)
  //     ? selectedCards.filter((c) => c !== selectedCard)
  //     : [...selectedCards, selectedCard];
    
  
  //   const totalValue = newSelectedCards.reduce((sum, c) => sum + parseInt(c.rank, 10), 0);
  //   const chosenValue = parseInt(chosenCardFromHand.rank, 10);
  
  //   if (totalValue > chosenValue) {
  //     //fixa felmeddelande
  //     setErrorMessage('Total value exceeds chosen card rank');
  //   } else {
  //     setSelectedCards(newSelectedCards);
  
  //     if (totalValue === chosenValue) {
  //       setMatchedSelectedCards((prev) => [...prev, ...newSelectedCards]);
  //       //start a new så att säga. 
  //       //markera synligt att de är "par"
  //       //gör så man kan klicka på andra.
  //       // setVisibleCards((prev) => prev.filter((c) => !newSelectedCards.includes(c)));
  //       setSelectedCards([]);
  //     }
  //   }
  // };

  // const choseWhichCardToPlay = (card) => {
//   //togglar
//   if (card === chosenCardToPlay) {
//     setChosenCardToPlay(null);
//     setSelectedCards([]);
//     setMatchedSelectedCards([])

//   } else {
//     setChosenCardToPlay(card);
//     setSelectedCards([]);
//     setMatchedSelectedCards([])
//   }
// };
const pickUpCardsFromBoard = (selectedCard, nestedArray, event) => {
  const clickedCardId = event.target.id; // ID of the clicked card
  const chosenCardValue = chosenCardFromHand.rank; // Assuming rank is already a number

  // 1. Handle Nested Array Separately
  if (nestedArray) {
    const nestedArrayTotalValue = nestedArray.reduce((sum, c) => sum + c.rank, 0);

    if (nestedArrayTotalValue === chosenCardValue) {
      // Check if the nested array is already in matchedSelectedCards
      const alreadyMatched = matchedSelectedCards.some(card => nestedArray.includes(card));

      if (alreadyMatched) {
        // Remove the nested array from matchedSelectedCards
        setMatchedSelectedCards(prev => prev.filter(card => !nestedArray.includes(card)));
      } else {
        // Add the nested array to matchedSelectedCards
        setMatchedSelectedCards(prev => [...prev, ...nestedArray]);
      }
      // Clear selected cards when a nested array is matched
      setSelectedCards([]);
      setErrorMessage(''); // Clear any error message
      return; // Exit after handling the nested array
    } else {
      setErrorMessage('Nested array total does not match the chosen card rank');
      return; // Exit if the nested array doesn't match
    }
  }

  // 2. Handle Individual Card Selection
  const newSelectedCards = selectedCards.includes(selectedCard)
    ? selectedCards.filter(c => c !== selectedCard) // Toggle off
    : [...selectedCards, selectedCard]; // Toggle on

  // 3. Calculate the total value of the newly selected cards
  const selectedCardsTotalValue = newSelectedCards.reduce((sum, c) => sum + c.rank, 0);

  // 4. Check if the selected cards match the chosen card's rank
  if (selectedCardsTotalValue > chosenCardValue) {
    setErrorMessage('Total value exceeds chosen card rank');
  } else {
    setSelectedCards(newSelectedCards);
    setErrorMessage(''); // Clear any previous error messages

    // Match if total value equals chosen card's rank
    if (selectedCardsTotalValue === chosenCardValue) {
      // Check if the newSelectedCards are already in matchedSelectedCards
      const alreadyMatched = matchedSelectedCards.some(card => newSelectedCards.includes(card));
      
      if (alreadyMatched) {
        // Remove the new selected cards from matchedSelectedCards
        setMatchedSelectedCards(prev => prev.filter(card => !newSelectedCards.includes(card)));
      } else {
        // Add new selected cards to matchedSelectedCards
        setMatchedSelectedCards(prev => [...prev, ...newSelectedCards]);
        setSelectedCards([]); // Clear selection after matching
      }
    }
  }
};

  

  

  
  
  
  
  // const choseWhichCardToPlay = (card) => {
  //   //togglar
  //   if (card === chosenCardToPlay) {
  //     setChosenCardToPlay(null);
  //     setSelectedCards([]);
  //     setMatchedSelectedCards([])

  //   } else {
  //     setChosenCardToPlay(card);
  //     setSelectedCards([]);
  //     setMatchedSelectedCards([])
  //   }
  // };


  // const addOneNewCard = (cardRemoved, player) => {
  //   const newDeck = [...activeDeck];
  //   const dealtCard = newDeck.splice(0, 1)[0];
  //   setActiveDeck(newDeck)

  //   if(player) {
  //     const newHand = playersHand?.filter(card => {
  //       return card.id !== cardRemoved.id
  //     })
      
  //     newHand.push(dealtCard)
  //     setPlayersHand(newHand)

  //   } else {
  //     const newHand = opponentsHand?.filter(card => {
  //       return card.id !== cardRemoved.id
  //     })
      
  //     newHand.push(dealtCard)
  //     setOpponentsHand(newHand)

  //   }

  // }

  // useEffect(() => {
  //   if (opponentsHand && !isCardAdded) {
  //     const delay = setTimeout(() => {
  //       addOneNewCard({ id: 'clubs-2-1' }, false);
  //       setIsCardAdded(true);
  //     }, 2000); // Delay of 3 seconds (3000 milliseconds)

  //     // Clear timeout if the component unmounts
  //     return () => clearTimeout(delay);
  //   }
  // }, [opponentsHand]);


  // useEffect(() => {
  //   console.log(playerScorePile, 'playerScorePile')
  // }, [playerScorePile]);
  // useEffect(() => {
  //   console.log(playerMullePile, 'playerMullePile')
  // }, [playerMullePile]);

  // const submitPoints = () => {

  //   setPlayerScorePile((prev) => [...prev, ...matchedSelectedCards, chosenCardToPlay])

  //   //dela ut nytt kort och uppdatera kortleken
  //   const newDeck = [...activeDeck];
  //   const [newDealtCard] = newDeck.splice(0, 1);
  //   setActiveDeck(newDeck);

  //   const newPlayersHand = playersHand.filter(function(item) {
  //     return item !== chosenCardToPlay  
  //   })
    
  //   const newCardsOnTable = cardsOnTable.filter((item) => 
  //     !matchedSelectedCards.some((selectedCard) => selectedCard.id === item.id)
  //   );

  //   setCardsOnTable(newCardsOnTable)
  //   setPlayersHand([...newPlayersHand, newDealtCard ])
  //   setMatchedSelectedCards([])

  // }

  //MOVES FUNCTIONS
 
 
  const addCardToBoard = (card) => {

    const newPlayersHand = playersHand.filter(function(item) {
      return item !== card  
    })
    const newCardsOnTable = [...cardsOnTable, card];
    
    setCardsOnTable(newCardsOnTable)
    setPlayersHand([...newPlayersHand ])
    setPlayingLay(false)
    //köra någon reset? när kortet är lagt så gå tillbaka
    //så sätt showAllButtons till true, men måste också kör motståndare?
    //ha kvar den, för man kan clicka i dom
    setMatchedSelectedCards([])
  }

  const [chosenCardFromHand, setChosenCardFromHand] = useState([])

  const pickMulleTable = (card) => {
    if((chosenCardFromHand.rank !== card.rank) && (chosenCardFromHand.suit !== card.suit)) {
      console.log('no match')
      return
    }
    const newPlayersHand = playersHand.filter(function(item) {
      return item !== chosenCardFromHand  
    })
    const newCardsOnTable = cardsOnTable.filter(function(item){
      return item !== card
    })
    setCardsOnTable(newCardsOnTable)
    setPlayersHand(newPlayersHand)
    setPlayerMullePile(prev => [...prev, chosenCardFromHand])
    setPlayerScorePile(prev => [...prev, card, chosenCardFromHand])
    // setPlayingMulle(false)
  }

  const [canBuildUp, setCanBuildUp] = useState(false)
  const [canBuildDown, setCanBuildDown] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isPermittedToLayChosenCard, setIsPermittedToLayChosenCard] = useState(false)
  const [ogCardForBuild, setOgCardForBuild] = useState(null)

  const buildOnCard = (card) => {
    let ranks = [];
    setShowModal(true)
    setOgCardForBuild(card)
  
    const getAllRanks = cardsOnTable.map((item) => {
      if (Array.isArray(item)) {
          item.filter(obj => {
            ranks.push(obj.rank);
          })
        } else {
          return
        }
    });

    if(ranks.length <= 0) {

      ranks.push(card.rank)
    }
  
    const {
      isPermittedToLayChosenCard,
      buildUp,
      buildDown } = countBuild(playersHand, chosenCardFromHand, ranks)
  
    
    if (buildUp) {
      setCanBuildUp(true)
    } else {
      setCanBuildUp(false)
    }
    if(buildDown) {
      setCanBuildDown(true)
    } else {
      setCanBuildDown(false)
    }
    if(isPermittedToLayChosenCard) {
      setIsPermittedToLayChosenCard(true)
    } else {
      setIsPermittedToLayChosenCard(false)
    }
  
  }


  const chosenBuild = (card, up) => {
    //behövs eller fixas i modal?
    // if((canBuildUp || canBuildDown) && isPermittedToLayChosenCard) {
  
      const newPlayersHand = playersHand.filter(function(item) {
        return item !== chosenCardFromHand  
      })
  
      const updatedCardsOnTable = cardsOnTable.map((item) => {
        if (Array.isArray(item)) {
          if (item.some(nestedCard => nestedCard.id === card.id)) {
            if(!up) {
              chosenCardFromHand.rank = -Math.abs(Number(chosenCardFromHand.rank));
              item.push(chosenCardFromHand); 
            } else {
              item.push(chosenCardFromHand)
            }
            return item;
          }
        } else if (item.id === card.id) {
          return [item, chosenCardFromHand];
        }
        return item;
      });
  
      setCardsOnTable(updatedCardsOnTable)
      setPlayersHand(newPlayersHand)
      setShowModal(false)
      // }
  
  }





  const chooseMoveToMake = (e) => {

    const move = e.target.id;

    resetChosenMove()
    setHandActive(true)
    setShowAllButtons(false)

    switch(move) {
      case 'mulle':
      setPlayingMulle(true)
      setHandActive(true)
      //om jag har en funktion här, flytta set till funktionen
      break;

      case 'build':
      setPlayingBuild(true)
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
      setHandActive(true)
      setPlayingLay(true)
      break;

      case 'pickUp':
      setPlayingPickUp(true)
      console.log('pickUp')
      break;

    }

  }

  const makeMove = (card, event, nestedArray) => {

    if(playingMulle) {
      pickMulleTable(card, event);

    } else if(playingBuild) {
      buildOnCard(card, event)

    } else if (playingLay) {
      addCardToBoard(card)
      //återställa efter man kört?
      //fast då ska motståndaren köra...
      //ha en funktion som kommar när isPlaying är klar typ? 
      //då köra datorns drag, sen sätta isPlating till true?

    } else if(playingLock) {
      console.log('you are playing lock')

    } else if(playingPickUp) {
      pickUpCardsFromBoard(card, nestedArray, event)

    } else if(playingTired) {
      console.log('you are playing tired')

    } else {
      console.log('something went wrong')
    }

  }

  const resetChosenMove = () => {
    setPlayingBuild(false)
    setPlayingLay(false)
    setPlayingLock(false)
    setPlayingMulle(false)
    setPlayingPickUp(false)
    setPlayingTired(false)
    setBoardActive(false)
    setHandActive(false)
  }

  // tbd ev denna när motståndaren kört? ändra namn, generalisera?
  const onGoBack = () => {
    resetChosenMove()
    setShowAllButtons(true)
  }

  const playerCardIsClicked = (card) => {
    setChosenCardFromHand(card)
    if(playingLay) {
      return
    }

      if (card === chosenCardFromHand) {
        setChosenCardFromHand([]);
        setSelectedCards([]);
        setMatchedSelectedCards([])
  
      } else {
        setChosenCardFromHand(card);
        setSelectedCards([]);
        setMatchedSelectedCards([])
      }

  }

  return (
    <div className='Mulle'>
      {/* <div className={`cards-table ${boardActive && 'active'}`}>
          {cardsOnTable?.map((card, index) => (
            <div className="build-wrapper" id={index}>
          <Card
          key={card.id}
          card={card} 
          chosenCardToPlay={chosenCardToPlay}
          isSelected={selectedCards.includes(card)}
          isMatched={matchedSelectedCards.includes(card)}
          tablesCard={true}
          chooseMoveToMake={chooseMoveToMake}
          playingBuild
          playingLay
          playingLock
          playingMulle
          playingPickUp
          playingTired
          makeMove={makeMove}
          />
          </div>
        ))}
      </div> */}
      {showModal && 
      <Modal 
      chosenBuild={chosenBuild}
      card={ogCardForBuild}
      setShowModal={setShowModal}
      canBuildUp={canBuildUp}
      canBuildDown={canBuildDown}
      isPermittedToLayChosenCard={isPermittedToLayChosenCard}
      />
      }
      <div className={`cards-table ${boardActive && 'active'}`}>
        {cardsOnTable?.map((card, index) => {
          // Check if card is an array
          if (Array.isArray(card)) {
            return (
              <div className="build-wrapper" id={index} key={index}>
                {card.map((nestedCard, nestedIndex) => (
                  <div 
                  className="build-card" 
                  key={nestedCard.id}
                  style={
                    nestedIndex !== 0
                      ? { marginTop: '-8rem'}
                      : { marginTop: '0' }
                  }
                  >
                  <Card
                    nestedArray={card}
                    card={nestedCard}
                    nestedIndex={nestedIndex}
                    chosenCardToPlay={chosenCardToPlay}
                    isSelected={selectedCards.includes(nestedCard)}
                    isMatched={matchedSelectedCards.includes(nestedCard)}
                    tablesCard={true}
                    chooseMoveToMake={chooseMoveToMake}
                    playingBuild
                    playingLay
                    playingLock
                    playingMulle
                    playingPickUp
                    playingTired
                    makeMove={makeMove}
                  />
                  </div>
                ))}
              </div>
            );
          } else {
            // If card is not an array, render as usual
            return (
                <Card
                  key={card.id}
                  card={card}
                  chosenCardToPlay={chosenCardToPlay}
                  isSelected={selectedCards.includes(card)}
                  isMatched={matchedSelectedCards.includes(card)}
                  tablesCard={true}
                  chooseMoveToMake={chooseMoveToMake}
                  playingBuild
                  playingLay
                  playingLock
                  playingMulle
                  playingPickUp
                  playingTired
                  makeMove={makeMove}
                />
            );
          }
        })}
      </div>

      <div className="card-and-options-wrapper">
            {/* <p className='error'>{errorMessage && errorMessage}</p> */}
          {showAllButtons &&
            <p>What do you wish to do?</p>
          }
          <div className='options'>
            {
              !showAllButtons &&
              <button 
              className='back-btn btn' 
              id="back" 
              onClick={onGoBack}>
                Go back
              </button>
            }
            {playingLay ?
            <p>Click on the card you wish to add to the board</p>
            :
            playingBuild ?
            <p>Click on the card in your hand you wish to add as building block, then click on the card on the board you wish to add it to.</p>
            :
            playingMulle ?
            <p>Click on the card in your hand you wish to take your Mulle with, then click on the Mulle on the Board to take it</p>
            :
            playingLock ?
            <>
            <p>Förklara här</p>
            <p>och här</p>
            </>
            :
            playingPickUp ?
            <p>Click on the card in your hand you wish to use to take cards from the board</p>
            :
            playingTired &&
            <p>Chose the Built or Locked pile of cards you wish to tire, then choose the card from your hand you wish to add</p>
            }
          {showAllButtons &&
            <button 
            className='add-btn btn' 
            id="lay" 
            onClick={chooseMoveToMake}>
              Add a card to the board
            </button>
          }
            { (cardsOnTable.length > 0 && showAllButtons) &&
            <>
            <button 
            className='add-btn btn' 
            id="build" 
            onClick={chooseMoveToMake}>
              Build on a card
            </button>
            <button 
            className='add-btn btn' 
            id="lock" 
            onClick={chooseMoveToMake}>
              Lock cards
            </button>
            <button 
            className='add-btn btn' 
            id="tired" 
            onClick={chooseMoveToMake}>
              Tired
            </button>
            <button 
            className='submit-btn btn' 
            id="pickUp" 
            onClick={chooseMoveToMake}>
              Pick up cards from the board
            </button>
            <button 
            className='submit-btn btn' 
            id="mulle" 
            onClick={chooseMoveToMake}>
              Take Mulle
            </button>
            </>
          }
        
        </div>
      <div className={`cards-player ${handActive && 'active'}`}>
      {playersHand?.map((card) => (
          <Card 
          key={card.id} 
          card={card} 
          chosenCardToPlay={chosenCardToPlay}
          playersCard={true}
          handActive={handActive}
          makeMove={makeMove}
          playerCardIsClicked={playerCardIsClicked}
          playingLay={playingLay}
          chosenCardFromHand={chosenCardFromHand}
          />
        ))}
      </div>

      </div>
    </div>
  )
}

export default Mulle