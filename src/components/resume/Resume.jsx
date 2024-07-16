import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { useContext } from 'react';
import { LightThemeContext } from '../../context/LightThemeContext';
import './resume.css'

const Resume = () => {

  const { lightTheme } = useContext(LightThemeContext)

  return (
    <section className={`Resume ${lightTheme ? 'ResumeLightTheme' : ''}`} id="resume">
      <div className='padding-wrapper width-wrapper'>
        <h2 className='title heading-resume'>Experience <span className='accent'>&</span> Education</h2>
        <div className='resume-content'>
          <div className='resume-experience'>
            <h3>Experience</h3>
            <div className='card-education'>
            <div className='icon icon-margin icon-briefcase'><FaBriefcase/></div>
              <div className="card-content">
                <h2>Developer Summerjob</h2>
                <h3> Dise | Summer 2024</h3>
                <p>Used TypeScript to develop and update ad templates for our CMS and player displays.</p>
              </div>
            </div>

            <div className='card-education'>
            <div className='icon icon-margin icon-briefcase'><FaBriefcase/></div>
              <div className="card-content">
                <h2>Frontend Developer Intern</h2>
                <h3> SeenThis | 2023 - present</h3>
                <p>Deepened my knowledge in React, Vue.js, Node.js, GraphQL, Apollo and Git version control.</p>
              </div>
            </div>

            <div className='card-education'>
              <div className='icon icon-margin icon-briefcase'><FaBriefcase/></div>
              <div className="card-content">
                <h2>Salesperson in Retail</h2>
                <h3>Scorett | 2022 - 2023</h3>
                <p>The job focused on personal customer interactions but also meeting daily budget targets.</p>
              </div>
            </div>

            <div className='card-education'>
            <div className='icon icon-margin icon-briefcase'><FaBriefcase/></div>
              <div className="card-content">
                <h2>Preschool Teacher</h2>
                <h3>Danderyds Kommun | 2021 - 2022</h3>
                <p>Lead preschool teacher with a focus on implemeting an intercultural perspective.</p>
              </div>
            </div>

          </div>
          <div className='resume-education'>
              <h3>Education</h3>
              
              <div className='card-education'>
                <div className='icon icon-margin'><FaGraduationCap/></div>
                <div className='card-content'>
                  <h2>KYH Yrkeshögskola</h2>
                  <h3>Frontend Developer 2022 - present</h3>
                  <p>Mastering frontend development, set to graduate in May 2024.</p>
                </div>
              </div>

              <div className='card-education'>
                <div className='icon icon-margin'><FaGraduationCap/></div>
                <div className="card-content">
                  <h2>Karlstads University</h2>
                  <h3>Preschool teacher 2014 - 2018</h3>
                  <p>Pedagogy, psychology and leadership.</p>
                </div>
              </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume