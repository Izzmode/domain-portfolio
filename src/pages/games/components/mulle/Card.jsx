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
  chosenCardFromHand,
  playerCardIsClicked,
  nestedIndex,
  nestedArray
}) => {

  const test = nestedArray && (nestedArray?.length === nestedIndex+1)

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
      className={`Card ${chosenCardFromHand === card ? 'chosen' : ''}`} 
      onClick={() => playerCardIsClicked(card)}
    >
      {card.suit} {card.rank}
    </div>

    :
    <div 
      id={card.id}
      className={`Card ${nestedArray && test ? 'hej' : 'då'} ${isSelected && 'selected'} ${isMatched && 'prel'}`}
      onClick={(event) => makeMove(card, event, nestedArray)}
    >
      {card.suit} {card.rank}
    </div>
  }
    </>
  )
}

export default Card