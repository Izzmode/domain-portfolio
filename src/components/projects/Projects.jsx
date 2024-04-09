import { useState, useContext } from "react";
import { FaGithub } from "react-icons/fa";
import techspace from '../../assets/thumbnail_techspace_closer.jpg'
import typescriptProject from '../../assets/thumbnail_typescript.jpg'
import seenThisWeb from '../../assets/thumbnail_website.png'
import seenThisLunch from '../../assets/thumbnail_seenThis.png'
import seenThisLogin from '../../assets/seenthis_login.png'
import seenThisProfile from '../../assets/seenthis_profile.png'
import seenThisRestaurantDetails from '../../assets/seenthis_restaurantDetails.png'
import seenThisRestaurants from '../../assets/seenthis_restaurants.png'
import techSpaceBooking from '../../assets/techspace_booking.png'
import techSpaceFilter from '../../assets/techspace_filter.png'
import techSpaceLiked from '../../assets/techspace_liked.png'
import techSpacePopular from '../../assets/techspace_popular.png'
import techSpaceSearch from '../../assets/techspace_search.png'
import techSpaceTestimonials from '../../assets/techspace_testimonials.png'
import techSpaceVenue from '../../assets/techspace_venue.png'
import techSpaceVenueBooking from '../../assets/techspace_venueBooking.png'
import seenThisWebScopes from '../../assets/seenThisWeb_types-of-scopes.png'
import { LightThemeContext } from '../../context/LightThemeContext';
import ProjectModal from "../modals/projectModal";
import './projects.css'

const Projects = () => {

  const { lightTheme } = useContext(LightThemeContext)
  
  const [showModal, setShowModal] = useState(false)
  const [projectForModal, setProjectForModal] = useState(null)
    
    
  const modalData = {
    seenThisLunch: {
      images: 
      [seenThisLogin, seenThisProfile, seenThisRestaurantDetails, seenThisRestaurants],
      heading: 'Co-working lunch',
      text: 
      `I really wanted to explore Firebase since I hadn't used it before. I also wanted to create something that might actually hold value. Since we have lunch together every Friday, I decided to create an easy way for us to choose where to eat. You only have access to the website in its entirety if you are logged in and verified as a SeenThis employee, but you can still view some things if you are not:
      `,
      linkURL: 'https://lunch-77c6b.web.app/',
      linkLabel: 'Website built using Firebase/Firestore'
    },
    techSpace: {
      images: 
      [techSpaceBooking, techSpaceFilter, techSpaceLiked, techSpacePopular,
      techSpaceTestimonials, techSpaceVenue, techSpaceVenueBooking],
      heading: 'TechSpace',
      subHeading: '- air bnb for tech companies',
      text: 'A significant school project spanning approximately 11 weeks. The initial five weeks were primarily focused on UX design. We developed various personas for our proposed concept, conducted interviews with the pertinent target audience, and extensively utilized Figma to create wireframes and a prototype. The remaining seven weeks were dedicated to individual work and the implementation of the design. I utilized React with MongoDB as my database for development.'
    },
    seenThisWeb: {
      images: 
      [seenThisWebScopes],
      heading: 'Sustainability pages',
      text: 'While working at SeenThis, I was tasked with translating Figma sketches provided by our designers into functional pages for our website. This involved both implementing new reusable components within existing projects and utilizing established design patterns.',
      linkURL: 'https://seenthis.co/sustainability/types-of-emissions-scope/',
      linkLabel: 'Types of scopes page',
      linkURL2: 'https://seenthis.co/sustainability/data-transfer-and-emissions/',
      linkLabel2: 'Data transfer and emissions page'
    }
  }

  const handleClick = (string) => {
    if(window.innerWidth < 1000) {
      return
    }

    if(string){
      setProjectForModal(modalData[string])
      setShowModal(true)
    }

  }

  return (
    <section className={`Projects ${lightTheme ? 'ProjectsUnicorn' : ''}`} id="projects">
      { showModal && <ProjectModal setShowModal={setShowModal} project={projectForModal}/>}
      <div className='padding-wrapper width-wrapper'>
        <h2 className='title heading-projects'>Recent <span className='accent'>projects</span></h2>
        <div className="projects-wrapper">
          <div className="projects-wrapper-top">
            <div className="card card-projects" onClick={() => handleClick('techSpace')}>
              <img src={techspace} alt="" className='projects-image'/>
              <div className="projects-text">
                <h2>TechSpace</h2>
                <p>Designed and developed a full website for a fictional company as a major school project.</p>
                <p className="click-for-modal">Click on this image to get a sneak peak!</p>
              </div>
            </div>
              <div className="card card-projects" onClick={() => handleClick('seenThisWeb')}>
                  <img src={seenThisWeb} alt="SeenThis website" className='projects-image'/>
                  <div className="projects-text">
                      <h2>SeenThis website</h2>
                      <p>During my internship I got the opportunity to create new and update existing pages to the SeenThis website.
                      </p>
                      <p className="click-for-modal">Click on this image to get a sneak peak!</p>
                  </div>
              </div>
          </div>
          <div className="projects-wrapper-bottom">
            <div className="card card-projects">
              <img src={typescriptProject} alt="" className='projects-image' />
              <div className="projects-text">
                <h2>Typescript Project</h2>
                <p>Typescript project with CRUD operations and a shopping cart, utilizing context for efficient data storage.</p>
              </div>
            </div>
            <div className="card card-projects" onClick={() => handleClick('seenThisLunch')}>
              <img src={seenThisLunch} alt="webpage for restaurants" className='projects-image'/>
              <div className="projects-text">
                <h2>Firebase project</h2>
                <p>Created a way for us at my intership company to easily choose where to eat lunch, while simultaneously deepening my knowledge in Firebase and Redux Toolkit.</p>
                <p className="click-for-modal">Click on this image to get a sneak peak!</p>
              </div>
            </div>
          </div>
        </div>
        <div className='gh-icon'>
          <a href="https://github.com/Izzmode" target="_blank" rel="noopener noreferrer">
            <FaGithub className='icon'/>
          </a>
          <p>
          <a href="https://github.com/Izzmode" target="_blank" rel="noopener noreferrer">
          More on GitHub
          </a>
          </p>       
        </div>
      </div>
    </section>
  )
}

export default Projects