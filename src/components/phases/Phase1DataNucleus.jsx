import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Glowing Data Sphere
const DataSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.002;
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#00F5FF"
        emissive="#00F5FF"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  );
};

// Particle Streams flowing into sphere
const ParticleStreams = () => {
  const particlesRef = useRef();
  const particleCount = 1000;

  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    // Random position in a larger sphere
    const radius = 10 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Velocity towards center
    velocities[i * 3] = -positions[i * 3] * 0.01;
    velocities[i * 3 + 1] = -positions[i * 3 + 1] * 0.01;
    velocities[i * 3 + 2] = -positions[i * 3 + 2] * 0.01;
  }

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        // Move particles towards center
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset if too close to center
        const distance = Math.sqrt(
          positions[i * 3] ** 2 +
          positions[i * 3 + 1] ** 2 +
          positions[i * 3 + 2] ** 2
        );

        if (distance < 2.5) {
          const radius = 10 + Math.random() * 5;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;

          positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = radius * Math.cos(phi);
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00F5FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Orbit Labels
const OrbitLabel = ({ position, text }) => {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.3}
        color="#A855F7"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

const Phase1DataNucleus = () => {
  return (
    <section id="phase1" className="phase-section">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />

          <DataSphere />
          <ParticleStreams />

          <OrbitLabel position={[0, 3, 0]} text="TRAINING DATA" />
          <OrbitLabel position={[3, 0, 0]} text="REAL-TIME STREAMS" />
          <OrbitLabel position={[-3, 0, 0]} text="KNOWLEDGE GRAPHS" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>

      {/* Text Overlay */}
      <div className="phase-content relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="hero-title">
            NISHANTH
            <br />
            AYYALASOMAYAJULA
          </h1>
          <p className="body-text mt-6 max-w-3xl mx-auto">
            AI ENGINEER | BUILDING INTELLIGENT SYSTEMS
          </p>
          <p className="body-text mt-4 max-w-2xl mx-auto text-sm">
            From raw data to autonomous intelligence — architecting the future of AI systems
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Phase1DataNucleus;
