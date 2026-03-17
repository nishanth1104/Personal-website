import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from '@studio-freight/lenis'
import App from './App.jsx'
import './index.css'

const SmoothScrollApp = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, wheelMultiplier: 1.0 })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SmoothScrollApp />
  </React.StrictMode>,
)
