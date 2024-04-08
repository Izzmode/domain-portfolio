import './projectModal.css'

const ProjectModal = ({ images, setShowModal }) => {

  return (
    <div className='ProjectModal'>
        <div className="scroll-images">
            {
            images.map((img, index) => (
            <img src={img.image} key={index} className='modal-img'/>
            ))
            }
        </div>
    <button onClick={() => setShowModal(false)} >Close</button>
    </div>
  )
}

export default ProjectModal