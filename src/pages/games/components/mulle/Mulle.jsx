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
  const [chosenCardFromHand, setChosenCardFromHand] = useState([])


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
  const pickUpCardsFromBoard = (selectedCard, nestedArray, event) => {

  const clickedCardId = event.target.id; 
  const chosenCardValue = chosenCardFromHand.rank; 

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
      setErrorMessage('');
      return;
    } else {
      setErrorMessage('This stack of cards total does not match your chosen card rank');
      return;
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
    setErrorMessage(''); 

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

const onSubmit = () => {
  setPlayerScorePile((prev) => [...prev, ...matchedSelectedCards, chosenCardFromHand])

  const newPlayersHand = playersHand.filter(function(item) {
    return item !== chosenCardFromHand
  })
  const newCardsOnTable = cardsOnTable.filter(item => {
    if (Array.isArray(item)) {
      // If item is a nested array, check if any card in matchedSelectedCards is inside this array
      return !item.some(nestedCard => 
        matchedSelectedCards.some(matchedCard => matchedCard.id === nestedCard.id)
      );
    } else {
      // If item is a single card, just check if it's in matchedSelectedCards
      return !matchedSelectedCards.some(matchedCard => matchedCard.id === item.id);
    }
  });
  
  resetChosenMove()
  setCardsOnTable(newCardsOnTable)
  setPlayersHand(newPlayersHand)
  setMatchedSelectedCards([])
  setChosenCardFromHand([])
}

console.log(playerScorePile, 'playerScorepile')

  
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

  console.log(playerScorePile, 'playerScorePile')

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
            <>
            <p>Click on the card in your hand you wish to use to take cards from the board</p>
            <button 
              className='submit-btn btn' 
              id="submit" 
              onClick={onSubmit}>
                Submit
              </button>
            </>
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
          <div className="players-score-pile">
          {playerScorePile.map((card, index) => (
            <Card 
            card={card}
            key={card.id}
            scorePileIndex={index}
            scorePile
            />
          ))
          }
        </div>
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