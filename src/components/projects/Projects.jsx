import { FaGithub } from "react-icons/fa";
import techspace from '../../assets/thumbnail_techspace_closer.jpg'
import typescriptProject from '../../assets/thumbnail_typescript.jpg'
import chatroom from '../../assets/thumbnail_chatroom.jpg'
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

import { LightThemeContext } from '../../context/LightThemeContext';
import React, { useContext } from 'react';
import './projects.css'
import ProjectModal from "../modals/projectModal";
import { useState } from "react";

const Projects = () => {


    const { lightTheme } = useContext(LightThemeContext)
    
    const [imagesProps, setImagesProps] = useState([])
    const [showModal, setShowModal] = useState(false)
    
    
    const images = [
        {seenThis: seenThisLogin},
        {seenThis: seenThisProfile},
        {seenThis: seenThisRestaurantDetails},
        {seenThis: seenThisRestaurants},
        {techSpace: techSpaceBooking},
        {techSpace: techSpaceFilter},
        {techSpace: techSpaceLiked},
        {techSpace: techSpacePopular},
        {techSpace: techSpaceTestimonials},
        {techSpace: techSpaceVenue},
        {techSpace: techSpaceVenueBooking},
    ]


    const handleClick = (string) => {
        const matchedImages = [];
    
        images.forEach((img) => {
            const keys = Object.keys(img);
            if (keys.includes(string)) {
                matchedImages.push({ image: img[keys[0]] }); // Assuming each object has only one key
            }
        });
    
        setImagesProps(matchedImages);
        setShowModal(true)
    };

  return (
    <section className={`Projects ${lightTheme ? 'ProjectsUnicorn' : ''}`} id="projects">
        { showModal && <ProjectModal images={imagesProps} setShowModal={setShowModal}/>}
        <div className='padding-wrapper width-wrapper'>
        <h2 className='title heading-projects'>Recent <span className='accent'>projects</span></h2>
            <div className="projects-wrapper">
                <div className="projects-wrapper-top">

                    <div className="card card-projects" onClick={() => handleClick('techSpace')}>
                        <img src={techspace} alt="" className='projects-image'/>
                        <div className="projects-text">
                            <h2>TechSpace</h2>
                            <p>Designed and developed a full website for a fictional company as a major school project.</p>
                            <p>Click on this image to get a sneak peak!</p>
                        </div>
                    </div>

                    <div className="card card-projects">
                        <img src={chatroom} alt="" className='projects-image'/>
                        <div className="projects-text">
                            <h2>Online Forum</h2>
                            <p>Contributed to a collaborative Typescript project with a focus on learning and mastering types and interfaces.</p>
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
                    <div className="card card-projects" onClick={() => handleClick('seenThis')}>
                    <img src={seenThisLunch} alt="webpage for restaurants" className='projects-image'/>
                    <div className="projects-text">
                        <h2>Firebase project</h2>
                            <p>Created a way for us at my intership company to easily choose where to eat lunch, while simultaneously deepening my knowledge in Firebase and Redux Toolkit.</p>
                            <p>Click on this image to get a sneak peak!</p>
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