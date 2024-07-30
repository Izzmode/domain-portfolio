import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import Resume from './components/resume/Resume'
import About from './components/about/About'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import Games from './pages/games/Games'
import Mulle from './pages/games/components/mulle/Mulle';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Resume />
            <Projects />
            <Contact />
          </>
        } />
        <Route path="/games" element={<Games />} />
        <Route path="/games/hej" element={<Mulle />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
