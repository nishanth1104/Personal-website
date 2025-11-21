import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html, Sphere } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Agent types with their specializations
const agentTypes = [
  { id: 'router', name: 'Router Agent', color: '#00F5FF', description: 'Routes queries to specialized agents' },
  { id: 'retrieval', name: 'Retrieval Agent', color: '#A855F7', description: 'Fetches relevant information from knowledge bases' },
  { id: 'sql', name: 'SQL Agent', color: '#10B981', description: 'Executes database queries and operations' },
  { id: 'code', name: 'Code Agent', color: '#F59E0B', description: 'Generates and debugs code' },
  { id: 'analysis', name: 'Analysis Agent', color: '#EF4444', description: 'Performs data analysis and insights' },
  { id: 'reasoning', name: 'Reasoning Agent', color: '#8B5CF6', description: 'Complex logical reasoning and planning' }
];

// Central Orchestrator Hub
const OrchestratorHub = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      // Pulsing effect
      const scale = 1.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#00F5FF"
        emissive="#00F5FF"
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.1}
        wireframe
      />
    </mesh>
  );
};

// Agent Module
const AgentModule = ({ position, agent, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color={agent.color}
          emissive={agent.color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Agent Label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.15}
        color={agent.color}
        anchorX="center"
        anchorY="top"
      >
        {agent.name}
      </Text>
    </group>
  );
};

// Communication Particles between orchestrator and agents
const CommunicationParticles = ({ agentPositions }) => {
  const particlesRef = useRef();
  const particleCount = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Random position along paths between center and agents
      const targetAgent = agentPositions[Math.floor(Math.random() * agentPositions.length)];
      const t = Math.random();
      pos[i * 3] = targetAgent[0] * t;
      pos[i * 3 + 1] = targetAgent[1] * t;
      pos[i * 3 + 2] = targetAgent[2] * t;
    }
    return pos;
  }, [agentPositions]);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        // Move particles along their paths
        const targetAgent = agentPositions[Math.floor(i / (particleCount / agentPositions.length))];
        const speed = 0.02;
        
        positions[i * 3] += (targetAgent[0] - positions[i * 3]) * speed;
        positions[i * 3 + 1] += (targetAgent[1] - positions[i * 3 + 1]) * speed;
        positions[i * 3 + 2] += (targetAgent[2] - positions[i * 3 + 2]) * speed;

        // Reset if reached target
        const dist = Math.sqrt(
          Math.pow(positions[i * 3] - targetAgent[0], 2) +
          Math.pow(positions[i * 3 + 1] - targetAgent[1], 2) +
          Math.pow(positions[i * 3 + 2] - targetAgent[2], 2)
        );

        if (dist < 0.5) {
          positions[i * 3] = 0;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = 0;
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
        size={0.03}
        color="#00F5FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// State Graph Visualization (simplified)
const StateGraph = () => {
  return (
    <group position={[0, -3, 0]}>
      {/* Simple state flow visualization */}
      {[0, 1, 2, 3].map((idx) => (
        <mesh key={idx} position={[idx * 1.5 - 2.25, 0, 0]}>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color="#A855F7" opacity={0.5} transparent />
        </mesh>
      ))}
    </group>
  );
};

// Agent Detail Panel
const AgentDetailPanel = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: '600px' }}
        >
          <h2 className="phase-title" style={{ fontSize: '28px', marginBottom: '10px', color: agent.color }}>
            {agent.name}
          </h2>
          <p className="body-text" style={{ marginBottom: '20px' }}>
            {agent.description}
          </p>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#A855F7' }}>
              Capabilities
            </h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
              <li>Real-time processing and decision making</li>
              <li>Integration with external APIs and services</li>
              <li>Collaborative multi-agent workflows</li>
              <li>State management and context awareness</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '14px' }}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Phase3AgentArchitecture = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Position agents in a circle around the orchestrator
  const agentPositions = useMemo(() => {
    return agentTypes.map((_, idx) => {
      const angle = (idx / agentTypes.length) * Math.PI * 2;
      const radius = 4;
      return [
        Math.cos(angle) * radius,
        Math.sin(idx * 0.5) * 1.5,
        Math.sin(angle) * radius
      ];
    });
  }, []);

  return (
    <section id="phase3" className="phase-section">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 2, 10], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />

          {/* Central Orchestrator */}
          <OrchestratorHub />

          {/* Agent Modules */}
          {agentTypes.map((agent, idx) => (
            <AgentModule
              key={agent.id}
              position={agentPositions[idx]}
              agent={agent}
              onClick={() => setSelectedAgent(agent)}
            />
          ))}

          {/* Communication Particles */}
          <CommunicationParticles agentPositions={agentPositions} />

          {/* State Graph */}
          <StateGraph />
        </Canvas>
      </div>

      {/* Text Overlay */}
      <div className="phase-content relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="phase-subtitle">ORCHESTRATED INTELLIGENCE</p>
          <h2 className="phase-title">Agent Architecture</h2>
          <p className="body-text mt-4 max-w-2xl mx-auto">
            Specialized AI agents collaborate to solve complex problems through intelligent orchestration
          </p>
        </motion.div>
      </div>

      {/* Agent Detail Panel */}
      {selectedAgent && (
        <AgentDetailPanel
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </section>
  );
};

export default Phase3AgentArchitecture;
