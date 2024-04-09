import { useContext } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaVuejs, FaSass, FaNodeJs } from "react-icons/fa";
import { TbBrandJavascript } from "react-icons/tb";
import portfolioImage from '../../assets/img_two.jpg'
import portfolioImageColor from '../../assets/color.jpg'
import { LightThemeContext } from '../../context/LightThemeContext';
import './about.css'

const About = () => {
    
  const { lightTheme } = useContext(LightThemeContext)

  return (
    <section className={`About ${lightTheme ? 'AboutLightTheme' : ''}`} id="about">
      <div className='width-wrapper padding-wrapper'>
        <div className='about-wrapper'>
          <div className="image-container-about">
            <img src={lightTheme ? portfolioImageColor : portfolioImage} alt="avatar image"  className='about-me-image'/>
          </div>
          <div className="text-container-about">
            <div className='about-text'>
              <h2 className='heading-about'>Who am I?</h2>
              <p>
                I am a waitress turned preschool-teacher, turned salesperson, and eventually found my passion in development. 
                I absolutely love to learn new things and strive to be better than I am today. 
                My passion is problem-solving, finding the bug and <span className='stricken'>crushing</span> fixing it, 
                creating reusable functions and overall making good, clean code.
                <br /> 
                <br /> 

                During my time in school, I worked mostly with React and REST APIs to create different projects. 
                Now, during my internship, I am delving into Vue and GraphQL which is both challenging and exciting. I am learning the 
                importance of reusable code and how to always think one step ahead when creating something.
                <br />
                <br />
                My goal is to actively seek out new knowledge and skills, while working in collaborative teams that value teamwork and intellectual curiosity.
              </p>
            </div>
            <div className='icons-skills'>
              <FaHtml5 className='icon'/>
              <FaCss3Alt className='icon icon-margin'/>
              <FaSass className='icon icon-margin'/>
              <TbBrandJavascript className='icon icon-margin'/>
              <FaNodeJs className='icon icon-margin'/>
              <FaReact className='icon icon-margin'/>
              <FaVuejs className='icon icon-margin'/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About