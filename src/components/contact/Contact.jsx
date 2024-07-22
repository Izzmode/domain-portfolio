import { useContext } from 'react';
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { LightThemeContext } from '../../context/LightThemeContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import computerAvatar from '../../assets/working.png'
import './contact.css'

const Contact = () => {

  const { lightTheme } = useContext(LightThemeContext)
  const { ref, inView } = useInView();

  return (
    <section className={`Contact ${lightTheme ? 'ContactLightTheme' : ''}`} id="contact">
      <div className='padding-wrapper width-wrapper'>
        <div className="title-wrapper heading-contact" ref={ref}>
          <h2>Let's Get In </h2>
          <motion.h2
          initial={{ x: + 500 }}
          animate={{ x: inView ? 0 : + 500 }}
          transition={{ duration: 1.2 }}
          className="accent title"
          >
          Touch
          </motion.h2>
          <h2>!</h2>
        </div>
        {/* <h2 className='title heading-contact'>Let's get in <span className='accent'>touch</span>!</h2> */}
        <div className="contact-wrapper">
          <div className='card-contact-wrapper'>
            <div className='card-contact'>
              <div>
                <a href="mailto:izabelleolofsson@live.se">
                  <FaEnvelope className='icon'/>
                </a>
              </div>
              <h3>Email</h3>
              <p className="connect"><a href="mailto:izabelleolofsson@live.se">izabelleolofsson@live.se</a></p>
            </div>
            <div className='card-contact'>
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