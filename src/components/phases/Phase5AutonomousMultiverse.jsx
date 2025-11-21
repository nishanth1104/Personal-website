import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import * as THREE from 'three';

// Industry Clusters
const industries = [
  { id: 'healthcare', name: 'Healthcare', color: '#10B981', position: [-4, 2, 0] },
  { id: 'finance', name: 'Finance', color: '#00F5FF', position: [0, 2, -4] },
  { id: 'ecommerce', name: 'E-commerce', color: '#A855F7', position: [4, 2, 0] },
  { id: 'education', name: 'Education', color: '#F59E0B', position: [0, 2, 4] }
];

// Industry Cluster Sphere
const IndustryCluster = ({ position, industry }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      const scale = 1 + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={industry.color}
          emissive={industry.color}
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.25}
        color={industry.color}
        anchorX="center"
        anchorY="top"
      >
        {industry.name}
      </Text>
    </group>
  );
};

// Cross-Ecosystem Network
const CrossEcosystemNetwork = () => {
  const particlesRef = useRef();
  const particleCount = 300;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
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
        size={0.02}
        color="#00F5FF"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

// Contact Form
const ContactForm = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // EmailJS configuration - replace with your actual IDs
    emailjs
      .sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      )
      .then(
        () => {
          setLoading(false);
          setMessage('Message sent successfully! I\'ll get back to you soon.');
          formRef.current.reset();
        },
        (error) => {
          setLoading(false);
          setMessage('Failed to send message. Please try again.');
          console.error(error);
        }
      );
  };

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md px-4">
      <motion.div
        className="glass-card"
        style={{ padding: '30px' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#00F5FF' }}>
          Let's Connect
        </h3>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-cyan)]"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-cyan)]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            required
            className="w-full px-4 py-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-cyan)] resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
            style={{ padding: '14px' }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {message && (
            <p className="text-center text-sm" style={{ color: message.includes('success') ? '#10B981' : '#EF4444' }}>
              {message}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

const Phase5AutonomousMultiverse = () => {
  return (
    <section id="phase5" className="phase-section">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />

        {/* Industry Clusters */}
        {industries.map((industry) => (
          <IndustryCluster
            key={industry.id}
            position={industry.position}
            industry={industry}
          />
        ))}

        {/* Cross-Ecosystem Network */}
        <CrossEcosystemNetwork />
      </Canvas>

      {/* Text Overlay */}
      <div className="phase-content text-center" style={{ marginTop: '-20vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="phase-subtitle" style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.9)' }}>THE FUTURE IS NOW</p>
          <h2 className="phase-title" style={{ textShadow: '0 0 40px rgba(0, 0, 0, 0.8)' }}>Autonomous Multiverse</h2>
          <p className="body-text mt-4 max-w-2xl mx-auto" style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.9)' }}>
            AI systems deployed across industries, creating intelligent solutions at scale
          </p>
        </motion.div>
      </div>

      {/* Contact Form */}
      <ContactForm />
    </section>
  );
};

export default Phase5AutonomousMultiverse;
