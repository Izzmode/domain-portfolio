import React from 'react'
import './modal.css'

const Modal = ({ chosenBuild, card, setShowModal, canBuildUp, canBuildDown, isPermittedToLayChosenCard }) => {
  return (
    <div className='Modal'>

    <div className="popup">
      {!isPermittedToLayChosenCard ?
      <p>You can only choose to build up or down to a value which you have in hand</p>
      :
      <p>What do you wish to do?</p>}
      <div className="btns">
        { (canBuildUp && isPermittedToLayChosenCard) &&
        <button className='up-btn btn' onClick={() => chosenBuild(card, true)}>Build Up</button>
        }
        { (canBuildDown && isPermittedToLayChosenCard) &&
        <button className='down-btn btn' onClick={() => chosenBuild(card, false)}>Build Down</button>
        }
        <button className='back-btn btn' onClick={() => setShowModal(false)}>Go Back</button>
      </div>
    </div>

    </div>
  )
}

export default Modal