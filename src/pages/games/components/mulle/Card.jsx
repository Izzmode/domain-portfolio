// import { useState } from 'react'
// import './card.css'

// const Card = ({ 
//   card, 
//   chosenCardToPlay, 
//   isSelected, 
//   isMatched,
//   tablesCard=false,
//   playersCard=false,
//   chooseMoveToMake,
//   playingBuild,
//   playingLay,
//   playingLock,
//   playingMulle,
//   playingPickUp,
//   playingTired,
//   handActive,
//   makeMove,
//   chosenCardFromHand,
//   playerCardIsClicked,
//   nestedIndex,
//   nestedArray,
//   scorePile=false
// }) => {

//   const test = nestedArray && (nestedArray?.length === nestedIndex+1)

//   return (
//     <>
//     {playersCard ?
    
//     playingLay ?
//     <div
//     id="playerCard" 
//     className={`Card ${chosenCardToPlay === card ? 'chosen' : ''}`} 
//     onClick={() => makeMove(card)}
//     >
//       {card.suit} {card.rank}
//     </div>
//     :
//     <div
//       id={card.id} 
//       className={`Card ${chosenCardFromHand === card ? 'chosen' : ''}`} 
//       onClick={() => playerCardIsClicked(card)}
//     >
//       {card.suit} {card.rank}
//     </div>
//     :
//     <div 
//       id={card.id}
//       className={`Card ${nestedArray && test ? 'hej' : 'då'} ${isSelected && 'selected'} ${isMatched && 'prel'}`}
//       onClick={(event) => makeMove(card, event, nestedArray)}
//     >
//       {card.suit} {card.rank}
//     </div>
//   }
//   {
//     scorePile && 
//     <div 
//     id={card.id}
//     className='Card card-in-pile'
//     >
//     {card.suit} {card.rank}
//     </div>
//   }
//     </>
//   )
// }

// export default Card

import BackOfCard from '../../../../assets/cards/back.png'
import clubs1 from '../../../../assets/cards/clubs-1.png';
import clubs2 from '../../../../assets/cards/clubs-2.png';
import clubs3 from '../../../../assets/cards/clubs-3.png';
import clubs4 from '../../../../assets/cards/clubs-4.png';
import clubs5 from '../../../../assets/cards/clubs-5.png';
import clubs6 from '../../../../assets/cards/clubs-6.png';
import clubs7 from '../../../../assets/cards/clubs-7.png';
import clubs8 from '../../../../assets/cards/clubs-8.png';
import clubs9 from '../../../../assets/cards/clubs-9.png';
import clubs10 from '../../../../assets/cards/clubs-10.png';
import clubs11 from '../../../../assets/cards/clubs-11.png';
import clubs12 from '../../../../assets/cards/clubs-12.png';
import clubs13 from '../../../../assets/cards/clubs-13.png';

import diamonds1 from '../../../../assets/cards/diamonds-1.png';
import diamonds2 from '../../../../assets/cards/diamonds-2.png';
import diamonds3 from '../../../../assets/cards/diamonds-3.png';
import diamonds4 from '../../../../assets/cards/diamonds-4.png';
import diamonds5 from '../../../../assets/cards/diamonds-5.png';
import diamonds6 from '../../../../assets/cards/diamonds-6.png';
import diamonds7 from '../../../../assets/cards/diamonds-7.png';
import diamonds8 from '../../../../assets/cards/diamonds-8.png';
import diamonds9 from '../../../../assets/cards/diamonds-9.png';
import diamonds10 from '../../../../assets/cards/diamonds-10.png';
import diamonds11 from '../../../../assets/cards/diamonds-11.png';
import diamonds12 from '../../../../assets/cards/diamonds-12.png';
import diamonds13 from '../../../../assets/cards/diamonds-13.png';

import hearts1 from '../../../../assets/cards/hearts-1.png';
import hearts2 from '../../../../assets/cards/hearts-2.png';
import hearts3 from '../../../../assets/cards/hearts-3.png';
import hearts4 from '../../../../assets/cards/hearts-4.png';
import hearts5 from '../../../../assets/cards/hearts-5.png';
import hearts6 from '../../../../assets/cards/hearts-6.png';
import hearts7 from '../../../../assets/cards/hearts-7.png';
import hearts8 from '../../../../assets/cards/hearts-8.png';
import hearts9 from '../../../../assets/cards/hearts-9.png';
import hearts10 from '../../../../assets/cards/hearts-10.png';
import hearts11 from '../../../../assets/cards/hearts-11.png';
import hearts12 from '../../../../assets/cards/hearts-12.png';
import hearts13 from '../../../../assets/cards/hearts-13.png';

import spades1 from '../../../../assets/cards/spades-1.png';
import spades2 from '../../../../assets/cards/spades-2.png';
import spades3 from '../../../../assets/cards/spades-3.png';
import spades4 from '../../../../assets/cards/spades-4.png';
import spades5 from '../../../../assets/cards/spades-5.png';
import spades6 from '../../../../assets/cards/spades-6.png';
import spades7 from '../../../../assets/cards/spades-7.png';
import spades8 from '../../../../assets/cards/spades-8.png';
import spades9 from '../../../../assets/cards/spades-9.png';
import spades10 from '../../../../assets/cards/spades-10.png';
import spades11 from '../../../../assets/cards/spades-11.png';
import spades12 from '../../../../assets/cards/spades-12.png';
import spades13 from '../../../../assets/cards/spades-13.png';

import './card.css';

const Card = ({ 
  card, 
  chosenCardToPlay, 
  isSelected, 
  isMatched,
  tablesCard = false,
  playersCard = false,
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
  nestedArray,
  scorePile = false,
  scorePileIndex
}) => {

  const cardImages = {
    'clubs-1': clubs1,
    'clubs-2': clubs2,
    'clubs-3': clubs3,
    'clubs-4': clubs4,
    'clubs-5': clubs5,
    'clubs-6': clubs6,
    'clubs-7': clubs7,
    'clubs-8': clubs8,
    'clubs-9': clubs9,
    'clubs-10': clubs10,
    'clubs-11': clubs11,
    'clubs-12': clubs12,
    'clubs-13': clubs13,
  
    'diamonds-1': diamonds1,
    'diamonds-2': diamonds2,
    'diamonds-3': diamonds3,
    'diamonds-4': diamonds4,
    'diamonds-5': diamonds5,
    'diamonds-6': diamonds6,
    'diamonds-7': diamonds7,
    'diamonds-8': diamonds8,
    'diamonds-9': diamonds9,
    'diamonds-10': diamonds10,
    'diamonds-11': diamonds11,
    'diamonds-12': diamonds12,
    'diamonds-13': diamonds13,
  
    'hearts-1': hearts1,
    'hearts-2': hearts2,
    'hearts-3': hearts3,
    'hearts-4': hearts4,
    'hearts-5': hearts5,
    'hearts-6': hearts6,
    'hearts-7': hearts7,
    'hearts-8': hearts8,
    'hearts-9': hearts9,
    'hearts-10': hearts10,
    'hearts-11': hearts11,
    'hearts-12': hearts12,
    'hearts-13': hearts13,
  
    'spades-1': spades1,
    'spades-2': spades2,
    'spades-3': spades3,
    'spades-4': spades4,
    'spades-5': spades5,
    'spades-6': spades6,
    'spades-7': spades7,
    'spades-8': spades8,
    'spades-9': spades9,
    'spades-10': spades10,
    'spades-11': spades11,
    'spades-12': spades12,
    'spades-13': spades13,
  };
  

  // Determines if the card is part of the nestedArray and should be styled differently
  const isNestedCard = nestedArray && (nestedArray?.length === nestedIndex + 1);
  const cardId = card.id.split('-').slice(0, 2).join('-');
  const cardImageSrc = cardImages[cardId];

  // Conditional rendering logic for different types of cards
  if (playersCard) {
    // Rendering player card based on different conditions
    if (playingLay) {
      return (
        <div
          id="playerCard"
          className={`Card ${chosenCardToPlay === card ? 'chosen' : ''}`} 
          onClick={() => makeMove(card)}
        >
          <img src={cardImageSrc} alt="card" className='visible-card'/>

          {/* {card.suit} {card.rank} */}
        </div>
      );
    } else {
      return (
        <div
          id={card.id}
          className={`Card ${chosenCardFromHand === card ? 'chosen' : ''}`}
          onClick={() => playerCardIsClicked(card)}
        >
          <img src={cardImageSrc} alt="card" className='visible-card'/>
          {/* <img src={`/assets/cards/${cardId}.png`} alt="card" className='visible-card' /> */}

        </div>
      );
    }
  }

  if (scorePile) {
    return (
      <div
        id={card.id}
        className='Card card-in-pile'
        style={{left: `${scorePileIndex}px`}}
      >
        <img src={BackOfCard} alt="card" className='back-of-card-img'/>
      </div>
    );
  }

  // Rendering generic card with conditional styling
  return (
    <div 
      id={card.id}
      className={`Card ${isNestedCard ? 'hej' : 'då'} ${isSelected ? 'selected' : ''} ${isMatched ? 'prel' : ''}`}
      onClick={(event) => makeMove(card, event, nestedArray)}
    >
      <img src={cardImageSrc} alt="card" className='visible-card'/>
      {/* <img src={`/assets/cards/${cardId}.png`} alt="card" className='visible-card'/> */}


    </div>
  );
};

export default Card;
