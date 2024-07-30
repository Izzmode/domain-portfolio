import React from 'react'
import { NavLink } from 'react-router-dom'
import mulle from '../../assets/thumbnail_mulle.avif'
import './games.css'

const Games = () => {
  return (
    <div className='Games'>

      <div className="card-wrapper">

        <NavLink to={'hej'} className='game-card'>
          <img src={mulle} alt="playing cards" className='card-img'/>
          <p className='info-text'>hejsan</p>
        </NavLink>

      </div>
    
    </div>
  )
}

export default Games