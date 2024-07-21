import { useContext } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaVuejs, FaSass, FaNodeJs } from "react-icons/fa";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";
import { LightThemeContext } from '../../context/LightThemeContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import portfolioImage from '../../assets/img_two.jpg'
import portfolioImageColor from '../../assets/color.jpg'
import './about.css'

const About = () => {
    
  const { lightTheme } = useContext(LightThemeContext)
  const { ref, inView } = useInView();


  return (
    <section className={`About ${lightTheme ? 'AboutLightTheme' : ''}`} id="about">
      <div className='width-wrapper padding-wrapper'>
        <div className='about-wrapper'>
          <div className="image-container-about">
            <img src={lightTheme ? portfolioImageColor : portfolioImage} alt="avatar image"  className='about-me-image'/>
          </div>
          <div className="text-container-about">
            <div className='about-text'>
              <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="sub-title"
              ref={ref}
              >
              Who am I?
              </motion.h2>
              <p>
                I am a waitress turned preschool-teacher, turned salesperson, and eventually found my passion in development. 
                I absolutely love to learn new things and strive to be better than I am today. 
                My passion is problem-solving, finding the bug and <span className='stricken'>crushing</span> fixing it, 
                creating reusable functions and overall making good, clean code.
                <br /> 
                <br /> 

                During my time in school, I worked mostly with React and REST APIs to create different projects, whilst 
                at my internship, I delved into Vue and GraphQL, which were both challenging and exciting. 
                It was during my internship that I learned the importance of reusable code and how to always think one step ahead 
                when creating something.
                <br />
                <br />
                My goal is to actively seek out new knowledge and skills, while working in collaborative teams that value teamwork and intellectual curiosity.
              </p>
            </div>
            <div className='icons-skills'>
              <div className='icon-wrapper'>
                <FaHtml5 className='icon'/>
                <p className='icon-text'>HTML</p>
              </div>
              <div className='icon-wrapper'>
                <FaCss3Alt className='icon'/>
                <p className='icon-text'>CSS</p>
              </div>
              <div className='icon-wrapper'>
                <FaSass className='icon'/>
                <p className='icon-text'>Sass</p>
              </div>
              <div className='icon-wrapper'>
              <TbBrandJavascript className='icon'/>
                <p className='icon-text'>JavaScript</p>
              </div>
              <div className='icon-wrapper'>
              <TbBrandTypescript className='icon'/>
                <p className='icon-text'>TypeScript</p>
              </div>
              <div className='icon-wrapper'>
              <FaNodeJs className='icon'/>
                <p className='icon-text'>NodeJS</p>
              </div>
              <div className='icon-wrapper'>
                <FaVuejs className='icon'/>
                <p className='icon-text'>Vue</p>
              </div>
              <div className='icon-wrapper'>
                <FaReact className='icon'/>
                <p className='icon-text'>React</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About