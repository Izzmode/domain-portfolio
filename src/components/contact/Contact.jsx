import React, { useContext } from 'react';
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import computerAvatar from '../../assets/working.png'
import { LightThemeContext } from '../../context/LightThemeContext';
import './contact.css'

const Contact = () => {

    const { lightTheme } = useContext(LightThemeContext)

  return (
    <section className={`Contact ${lightTheme ? 'ContactUnicorn' : ''}`} id="contact">
        <div className='padding-wrapper width-wrapper'>
            <h2 className='title heading-contact'>Let's get in <span className='accent'>touch</span>!</h2>
            <div className="contact-wrapper">
                <div className='card-contact-wrapper'>
                    <div className='card card-contact'>
                        <div>
                            <a href="mailto:izabelleolofsson@live.se">
                                <FaEnvelope className='icon'/>
                            </a>
                        </div>
                        <h3>Email</h3>
                        <p className="connect"><a href="mailto:izabelleolofsson@live.se">izabelleolofsson@live.se</a></p>
                    </div>
                    <div className='card card-contact'>
                        <div>
                            <a href="https://www.linkedin.com/in/izabelle-olofsson/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className='icon'/>
                            </a>
                        </div>
                        <div className='contact-info'>
                            <h3>Linkedin</h3>
                            <p className="connect"><a href="https://www.linkedin.com/in/izabelle-olofsson/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a></p>
                        </div>
                    </div>
                </div>
                <div className='png-wrapper'>
                    <img src={computerAvatar} alt="" className='computer-avatar' />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contact