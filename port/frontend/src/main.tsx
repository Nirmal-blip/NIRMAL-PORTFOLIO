import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Lenis from 'lenis'

function Root() {
  useEffect(() => {
    const lenis = new Lenis({
      wheelMultiplier: 1.5,
      touchMultiplier: 2,
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<Root />)
