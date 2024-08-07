import { useState, useEffect } from 'react'
import Card from './Card';
import { generateDeck, shuffleDeck, countBuild } from './helper';
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


  //dessa två för pick up cards on board?
  const pickUpCardsFromBoard = (selectedCard) => {
    console.log(selectedCard, 'selectedCard i pickUpCardsFromBoard')
  
    const newSelectedCards = selectedCards.includes(selectedCard)
      ? selectedCards.filter((c) => c !== selectedCard)
      : [...selectedCards, selectedCard];
    
  
    const totalValue = newSelectedCards.reduce((sum, c) => sum + parseInt(c.rank, 10), 0);
    const chosenValue = parseInt(chosenCardHand.rank, 10);
  
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
    console.log('körs här')

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

  const [chosenCardHand, setChosenCardHand] = useState([])
  const [chosenCardTable, setChosenCardTable] = useState([])

  //tbd okej så många tankar
  //ha istället att man bara setChosenCard (hand eller table) och sen kör funktionen i sista steget?
  //vad ska köras i makeMove?
  //kör setChosenCardHand på alla moves som har playerHand först?
  //nu när jag har olika alternativ kanske alla kan börja med spelarens hand?
  //i så fall så kan jag setChosenCardHand direkt...
  //fast inte på build...eller kanske?


  const pickMulleTable = (card) => {
    if((chosenCardHand.rank !== card.rank) && (chosenCardHand.suit !== card.suit)) {
      console.log('no match')
      return
    }
    const newPlayersHand = playersHand.filter(function(item) {
      return item !== chosenCardHand  
    })
    const newCardsOnTable = cardsOnTable.filter(function(item){
      return item !== card
    })
    setCardsOnTable(newCardsOnTable)
    setPlayersHand(newPlayersHand)
    setPlayerMullePile(prev => [...prev, chosenCardHand])
    setPlayerScorePile(prev => [...prev, card, chosenCardHand])
    // setPlayingMulle(false)
  }

  const [buildUp, setBuildUp] = useState(false)
  const [buildDown, setBuildDown] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const buildOnCard = (card, event) => {
    //tbd check ranks in nested array for no more than 16 or less than 2.
    //also create a function for calculation the build (- or +)
    // if(card.rank + chosenCardHand.rank > 16) {
    //   return
    // }

    //as soon as there is an array (aka after a build has been made and this function runs again)
    //ranks contains all the ranks of previous laid cards, but not the current one (chosenCardHand.rank)
    let ranks = [];

    //if there is an array (aka u can build up or down)
    //always have modal. wish to build up to x or wish to build down to y?
    //or even (later maybe) you can not build on this pile with the card you have chosen

    const onlyBuildUp = cardsOnTable.map((item) => {
      if (Array.isArray(item)) {
          // setOpenModal(true)
          //if array exists get all the ranks and but them in a array
          item.filter(obj => {
            ranks.push(obj.rank);
          })
          return false; 
        }else {
          return true
        }
    });

    console.log(ranks, 'fungerar det?')

    if((+card.rank + +chosenCardHand.rank > 16) && onlyBuildUp) {
      return
    }
    

    const newPlayersHand = playersHand.filter(function(item) {
      return item !== chosenCardHand  
    })

    const updatedCardsOnTable = cardsOnTable.map((item) => {
      // If item is an array, check if the card is in the nested array
      if (Array.isArray(item)) {
        // Card is found in the nested array, push chosenCardHand to it
        if (item.some(nestedCard => nestedCard.id === card.id)) {
          //if building down has been chosen, make the rank negative (tbd, make everything positive later when calc score)
          if(!openModal && buildDown) {
            chosenCardHand.rank = -Math.abs(Number(chosenCardHand.rank));
            item.push(chosenCardHand);  // This line uses `push` to add `chosenCardHand` to the existing nested array
          } else {
            item.push(chosenCardHand)
          }
          return item;  // Return the modified nested array
        }
      } else if (item.id === card.id) {
        // If item matches the card, create a new array with item and chosenCardHand
        return [item, chosenCardHand];
      }
      // No match, return the item as it is
      return item;
    });

    countBuild(card, playersHand, chosenCardHand, ranks)
    setCardsOnTable(updatedCardsOnTable)
    setPlayersHand(newPlayersHand)
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

  const makeMove = (card, event) => {

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
      pickUpCardsFromBoard(card)
      console.log('you are playing pickUp')

    } else if(playingTired) {
      console.log('you are playing tired')

    } else {
      console.log('something went wrong')
    }

  }
  console.log(cardsOnTable)

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
    setChosenCardHand(card)
    if(playingLay) {
      return
    }

      if (card === chosenCardHand) {
        setChosenCardHand([]);
        setSelectedCards([]);
        setMatchedSelectedCards([])
  
      } else {
        setChosenCardHand(card);
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
      <div className={`cards-table ${boardActive && 'active'}`}>
        {cardsOnTable?.map((card, index) => {
          // Check if card is an array
          if (Array.isArray(card)) {
            return (
              <div className="build-wrapper" id={index} key={index}>
                {card.map((nestedCard, nestedIndex) => (
                  <div 
                  className="build-card" 
                  style={
                    nestedIndex !== 0
                      ? { marginTop: '-8rem'}
                      : { marginTop: '0' }
                  }
                  >
                  <Card
                    key={nestedCard.id}
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
          chosenCardHand={chosenCardHand}
          />
        ))}
      </div>

      </div>
    </div>
  )
}

export default Mulle