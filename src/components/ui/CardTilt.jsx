import { useState, useRef } from 'react'

export default function CardTilt({
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave: externalLeave,
}) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, glow: 0 })
  const [active, setActive] = useState(false)

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -ny * 8, y: nx * 8, glow: Math.sqrt(nx * nx + ny * ny) })
    setActive(true)
  }

  const onMouseLeave = (e) => {
    setTilt({ x: 0, y: 0, glow: 0 })
    setActive(false)
    externalLeave?.(e)
  }

  const handleMouseEnter = (e) => {
    onMouseEnter?.(e)
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: active ? 'transform 0.1s ease' : 'transform 0.5s ease',
        boxShadow:
          tilt.glow > 0
            ? `0 0 ${20 + tilt.glow * 40}px rgba(163,230,53,${0.04 + tilt.glow * 0.12})`
            : undefined,
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
