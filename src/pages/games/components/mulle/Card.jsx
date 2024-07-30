import { useState } from 'react'
import './card.css'

const Card = ({ 
  card, 
  choseWhichCardToPlay, 
  chosenCardToPlay, 
  choseCardOnBoard, 
  isSelected, 
  isMatched,
  tablesCard=false,
  playersCard=false,
  chooseGameToPlay,
  playingBuild,
  playingLay,
  playingLock,
  playingMulle,
  playingPickUp,
  playingTired,
  handActive,
  playGame
}) => {

  return (
    <>
    {playersCard ?
    <div className={`Card ${chosenCardToPlay === card && 'hej'}`} onClick={() => playGame(card)}>{card.suit} {card.rank}</div>
    :
    <div 
      className={`Card ${chosenCardToPlay === card && 'hej'} ${isSelected && 'selected'} ${isMatched && 'prel'}`}
      onClick={() => choseCardOnBoard(card)}
    >
      {card.suit} {card.rank}
    </div>
  }
    </>
  )
}

export default Card