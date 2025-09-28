import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <PageTransition />
                  <Hero />
                  <About />
                  <Experience />
                  <Skills />
                  <Projects />
                  <Contact />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <PageTransition />
                  <About />
                  <Experience />
                  <Skills />
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <PageTransition />
                  <Projects />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <PageTransition />
                  <Contact />
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
