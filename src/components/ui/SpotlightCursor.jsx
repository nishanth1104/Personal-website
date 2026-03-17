import { useEffect } from 'react'

export default function SpotlightCursor() {
  useEffect(() => {
    const el = document.getElementById('spotlight-cursor')
    if (!el) return
    const move = (e) => {
      el.style.setProperty('--x', `${e.clientX}px`)
      el.style.setProperty('--y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      id="spotlight-cursor"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        background:
          'radial-gradient(300px circle at var(--x, -9999px) var(--y, -9999px), rgba(163,230,53,0.06), transparent 70%)',
      }}
    />
  )
}
