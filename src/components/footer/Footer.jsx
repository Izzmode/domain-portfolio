import { FaArrowAltCircleUp } from "react-icons/fa";
import React, { useContext } from 'react';
import { LightThemeContext } from '../../context/LightThemeContext';
import './footer.css'

const footer = () => {

  const { lightTheme } = useContext(LightThemeContext)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className={`Footer ${lightTheme ? 'FooterUnicorn' : ''}`}>
      <div className='width-wrapper width-wrapper-footer'>
        <div> 
          <p>By Izabelle Olofsson &copy; 2024</p>
          <p className='png-link'><a href='https://pngtree.com/freepng/desktop-computer-one-flat-style-work-girl-vector_4754026.html'>png image from pngtree.com/</a></p>
        </div>
        <div className='footer-arrow' onClick={scrollToTop}><FaArrowAltCircleUp/></div>
        </div>
    </div>
  )
}

export default footer