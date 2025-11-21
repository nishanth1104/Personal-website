import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Html } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

const Bot = ({ isHovered, setIsHovered }) => {
  const mesh = useRef()
  const { scale } = useSpring({ scale: isHovered ? 1.2 : 1 })

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.position.y = Math.sin(t * 2) * 0.1
    mesh.current.rotation.z = Math.sin(t) * 0.1
  })

  return (
    <a.mesh
      ref={mesh}
      scale={scale}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={isHovered ? "#bc13fe" : "#00f3ff"}
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
      <Html position={[0, 1.5, 0]} center pointerEvents="none">
        <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-black/80 backdrop-blur-md border border-neon-blue p-2 rounded-lg text-xs text-white whitespace-nowrap">
            Hi! Click me for a tour.
          </div>
        </div>
      </Html>
    </a.mesh>
  )
}

const Bot3D = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-10 left-10 w-32 h-32 z-50">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Bot isHovered={isHovered} setIsHovered={setIsHovered} />
      </Canvas>
    </div>
  )
}

export default Bot3D
