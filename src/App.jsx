import { Routes, Route, useLocation  } from 'react-router-dom';
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
//tbd alternate navbar when game is active
const location = useLocation();
  const isGamesRoute = location.pathname.includes("games");
  return (
    <>
      {!isGamesRoute && <Navbar />}
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
        <Route path="/games/mulle" element={<Mulle />} />
      </Routes>
      {!isGamesRoute && <Footer />}
    </>
  )
}

export default App
