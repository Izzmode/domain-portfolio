import { LightThemeContext } from '../../context/LightThemeContext';
import { useContext } from "react";
import './projectModal.css'

const ProjectModal = ({ setShowModal, project }) => {

  const { lightTheme } = useContext(LightThemeContext)

  return (
    <div className={`ProjectModal ${lightTheme ? 'ProjectModalLightTheme' : ''}`}>
      <div className="scroll-images">

        {(project.text || project.linkURL) &&
        <div className='project-info-container'>
          <h1 className='heading'>{project.heading && project.heading}</h1>
          <p className='project-text'>
            {project.text}
          </p>
          {project.linkURL &&
          <div className='project-links'>
            <p>
              <a href={project.linkURL} target="_blank" rel="noopener noreferrer">{project.linkLabel}</a>
            </p>
            
            {project.linkURL2 &&
            <p>
              <a href={project.linkURL2} target="_blank" rel="noopener noreferrer">{project.linkLabel2}</a>
            </p>
            }
          </div>
          }
          <p className='project-text'>
            {project.text2 && project.text2}
          </p>
        </div>
        }
        {
        project.images.map((img, index) => (
        <img src={img} key={index} className='modal-img'/>
        ))
        }
      </div>
      <button onClick={() => setShowModal(false)} >Close</button>
    </div>
  )
}

export default ProjectModal