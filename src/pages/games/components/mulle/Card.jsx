import { useState } from 'react'
import './card.css'

const Card = ({ 
  card, 
  chosenCardToPlay, 
  isSelected, 
  isMatched,
  tablesCard=false,
  playersCard=false,
  chooseMoveToMake,
  playingBuild,
  playingLay,
  playingLock,
  playingMulle,
  playingPickUp,
  playingTired,
  handActive,
  makeMove,
  chosenCardHand,
  playerCardIsClicked,
  nestedIndex,
  nestedArray
}) => {

  //när ska vilken funktion köras?
  //översta diven är kortet/korten i spelarens händer
  //understa diven är kortet/korten på bordet
  //båda kan tillhöra samma spelomgång..
  //ha ett state, making a move? så länge den är aktiv..?

  const [isTopCard, setIsTopCard] = useState(false)
  // const isTopCard1 = nestedIndex && (nestedArrayL == nestedIndex)

  if(nestedArray && (nestedArray?.length === nestedIndex+1)) {
    console.log('hej')
  }
  // console.log(nestedArray, 'array')
  // console.log(nestedArray?.length, 'length')
  // console.log(nestedIndex, 'index')

  const test = nestedArray && (nestedArray?.length === nestedIndex+1)
  // console.log(test)

  return (
    <>
    {playersCard ?
    
    playingLay ?
    <div
    id="playerCard" 
    className={`Card ${chosenCardToPlay === card ? 'chosen' : ''}`} 
    onClick={() => makeMove(card)}
    >
      {card.suit} {card.rank}
    </div>
    :
    <div
      id={card.id} 
      className={`Card ${chosenCardHand === card ? 'chosen' : ''}`} 
      onClick={() => playerCardIsClicked(card)}
    >
      {card.suit} {card.rank}
    </div>

    :
    <div 
      id={card.id}
      className={`Card ${nestedArray && test ? 'hej' : 'då'} ${isSelected && 'selected'} ${isMatched && 'prel'}`}
      onClick={(event) => makeMove(card, event)}
    >
      {card.suit} {card.rank}
    </div>
  }
    </>
  )
}

export default Card