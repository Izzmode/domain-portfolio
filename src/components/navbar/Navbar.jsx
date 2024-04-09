import React, { useState, useEffect, useContext } from 'react';
import { PiRainbowCloudBold, PiCloudMoon } from "react-icons/pi";
import { LightThemeContext } from '../../context/LightThemeContext';
import './navbar.css';

const Navbar = () => {

  const { lightTheme, toggleLightTheme } = useContext(LightThemeContext)
  const [activeLink, setActiveLink] = useState('home'); 
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);

    const targetElement = document.getElementById(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = () => {
    const sections = ['home', 'about', 'resume', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 50; 

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
          setActiveLink(section);
          break;
        }
      }
    }
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={`Navbar ${menuOpen ? 'menu-open' : ''} ${lightTheme ? 'NavbarLightTheme' : ''}`}>
      <header className='header-wrapper'>
        <div className='logo'>. io</div>
        <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={handleToggleMenu}>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <ul className={`ul-header ${menuOpen ? 'open' : ''}`}>
          <li className='rainbow-li' onClick={toggleLightTheme}>
            {lightTheme ? 
            <div className='moon-icon-wrapper'>
              <PiCloudMoon className='moon-icon'/> 
            </div>    
              :   
            <div className='rainbow-icon-wrapper'>
              <PiRainbowCloudBold className='rainbow-icon'/>
              <div className='shimmer-icon'></div>
            </div>
          }
          </li>
          <li>
            <a href="#home" className={activeLink === 'home' ? 'active' : ''} onClick={() => handleLinkClick('home')}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className={activeLink === 'about' ? 'active' : ''} onClick={() => handleLinkClick('about')}>
              About
            </a>
          </li>
          <li>
            <a href="#resume" className={activeLink === 'resume' ? 'active' : ''} onClick={() => handleLinkClick('resume')}>
              CV
            </a>
          </li>
          <li>
            <a href="#projects" className={activeLink === 'projects' ? 'active' : ''} onClick={() => handleLinkClick('projects')}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className={activeLink === 'contact' ? 'active' : ''} onClick={() => handleLinkClick('contact')}>
              Contact
            </a>
          </li>
        </ul>
      </header>
    </section>
  );
};

export default Navbar;
