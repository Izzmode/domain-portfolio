import { useContext } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import aboutImage from '../../assets/avatar_9.png'
import fullName from '../../assets/full_name.png'
import aboutImageUnicorn from '../../assets/unicorn_avatar_3.png'
import { LightThemeContext } from '../../context/LightThemeContext';
import './hero.css'

const Hero = () => {

  const { lightTheme } = useContext(LightThemeContext)

  return (
    <section className={`Hero ${lightTheme ? 'HeroUnicorn' : ''}`} id="home">
      <div className='width-wrapper width-wrapper-hero'>
        <div className='hero-wrapper'>
          <div className='hero-left'>
            <div className='greeting-wrapper'>
              <h1 className='accent dark'>Hello</h1>
              <h1>, I'm <span className='accent-mobile'>Izabelle</span> .</h1>
            </div>
              
              <h2>Front end developer</h2>
              <div className='based-text'>
                  <p>Based in Stockholm</p>
                  <span>
                      <CiLocationOn />
                  </span>
              </div>
              <div className='icon-wrapper'>
                  <a href="https://www.linkedin.com/in/izabelle-olofsson/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className='icon' />
                  </a>
                  <a href="https://github.com/Izzmode" target="_blank" rel="noopener noreferrer">
                      <FaGithub className='icon icon-margin' />
                  </a>
              </div>
          </div>

          <div className='avatar-image-container hero-right'>
            <img className="full-name" src={fullName} alt="Izabelle Olofsson" />
            <div className='barbie-description'>
              <p>She's a frontend developer</p>
            </div>
            <img 
                src={lightTheme ? aboutImageUnicorn : aboutImage} 
                alt="portfolio image" 
                className='avatar-image'
            />
            <div className='hover-box'>
              <p>Image made with imagine.art</p>
            </div>
            <div className='barbie-box'>
              <p className='barbie-text'>Belle</p>
            </div>
          </div>
        </div>
      </div>
      <div className='shimmer'></div>
    </section>
  )
}

export default Hero