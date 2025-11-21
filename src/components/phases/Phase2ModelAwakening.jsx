import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Neural Network Brain - Network of connected nodes
const NeuralBrain = ({ onNeuronClick }) => {
  const groupRef = useRef();
  const [activeNeurons, setActiveNeurons] = useState(new Set());

  // Generate neuron positions in a brain-like structure
  const neurons = useMemo(() => {
    const neuronArray = [];
    const layers = 5;
    const neuronsPerLayer = 8;

    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < neuronsPerLayer; i++) {
        const angle = (i / neuronsPerLayer) * Math.PI * 2;
        const radius = 2 + layer * 0.5;
        const x = Math.cos(angle) * radius;
        const y = (layer - layers / 2) * 0.8;
        const z = Math.sin(angle) * radius;

        neuronArray.push({
          id: `${layer}-${i}`,
          position: [x, y, z],
          layer,
          index: i
        });
      }
    }
    return neuronArray;
  }, []);

  // Generate connections between neurons
  const connections = useMemo(() => {
    const connectionArray = [];
    neurons.forEach((neuron, idx) => {
      // Connect to 3-5 random neurons in adjacent layers
      const targetCount = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < targetCount; i++) {
        const targetIdx = Math.floor(Math.random() * neurons.length);
        if (targetIdx !== idx && Math.abs(neurons[targetIdx].layer - neuron.layer) <= 2) {
          connectionArray.push({
            start: neuron.position,
            end: neurons[targetIdx].position
          });
        }
      }
    });
    return connectionArray;
  }, [neurons]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }

    // Randomly activate neurons for firing effect
    if (Math.random() < 0.05) {
      const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
      setActiveNeurons(prev => {
        const newSet = new Set(prev);
        newSet.add(randomNeuron.id);
        setTimeout(() => {
          setActiveNeurons(current => {
            const updated = new Set(current);
            updated.delete(randomNeuron.id);
            return updated;
          });
        }, 500);
        return newSet;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Render connections */}
      {connections.map((conn, idx) => (
        <Line key={`conn-${idx}`} start={conn.start} end={conn.end} />
      ))}

      {/* Render neurons */}
      {neurons.map((neuron) => (
        <Neuron
          key={neuron.id}
          position={neuron.position}
          isActive={activeNeurons.has(neuron.id)}
          onClick={() => onNeuronClick && onNeuronClick(neuron)}
        />
      ))}
    </group>
  );
};

// Individual Neuron
const Neuron = ({ position, isActive, onClick }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && isActive) {
      meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.01) * 0.2);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={isActive ? '#A855F7' : '#00F5FF'}
        emissive={isActive ? '#A855F7' : '#00F5FF'}
        emissiveIntensity={isActive ? 1 : 0.3}
      />
    </mesh>
  );
};

// Connection Line between neurons
const Line = ({ start, end }) => {
  const ref = useRef();

  useMemo(() => {
    if (ref.current) {
      const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
      ref.current.setFromPoints(points);
    }
  }, [start, end]);

  return (
    <line>
      <bufferGeometry ref={ref} />
      <lineBasicMaterial color="#00F5FF" opacity={0.2} transparent />
    </line>
  );
};

// Floating Project Card in 3D space
const ProjectCard3D = ({ position, project, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Html
        transform
        occlude
        style={{
          transition: 'all 0.3s',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          cursor: 'pointer'
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <div className="glass-card" style={{ width: '200px', padding: '15px' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '8px', color: '#00F5FF' }}>
            {project.name}
          </h3>
          <p style={{ fontSize: '11px', color: '#A0AEC0', marginBottom: '8px' }}>
            {project.description.substring(0, 60)}...
          </p>
          <div style={{ fontSize: '10px', color: '#10B981' }}>
            Click to learn more →
          </div>
        </div>
      </Html>
    </group>
  );
};

// Metrics HUD
const MetricsHUD = () => {
  return (
    <div className="absolute top-20 left-10 space-y-4 z-20">
      <motion.div
        className="glass-card"
        style={{ padding: '15px 20px', minWidth: '200px' }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">
          Models Trained
        </div>
        <div className="text-2xl font-bold text-glow-cyan">50+</div>
      </motion.div>

      <motion.div
        className="glass-card"
        style={{ padding: '15px 20px', minWidth: '200px' }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">
          Avg Accuracy
        </div>
        <div className="text-2xl font-bold text-glow-purple">94.2%</div>
      </motion.div>

      <motion.div
        className="glass-card"
        style={{ padding: '15px 20px', minWidth: '200px' }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">
          Inference Time
        </div>
        <div className="text-2xl font-bold text-glow-green">&lt;100ms</div>
      </motion.div>
    </div>
  );
};

// Project Modal
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

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
        >
          <h2 className="phase-title" style={{ fontSize: '32px', marginBottom: '10px' }}>
            {project.name}
          </h2>
          <p className="body-text" style={{ marginBottom: '20px' }}>
            {project.description}
          </p>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#A855F7' }}>
              Tech Stack
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#00F5FF'
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            {project.source_code_link && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '14px' }}
              >
                View Code
              </a>
            )}
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '12px 24px', fontSize: '14px' }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Phase2ModelAwakening = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Position projects around the brain
  const projectPositions = useMemo(() => {
    return projects.slice(0, 6).map((_, idx) => {
      const angle = (idx / 6) * Math.PI * 2;
      const radius = 5;
      return [
        Math.cos(angle) * radius,
        (idx % 3 - 1) * 2,
        Math.sin(angle) * radius
      ];
    });
  }, [projects]);

  return (
    <section id="phase2" className="phase-section">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />

        <NeuralBrain onNeuronClick={(neuron) => console.log('Neuron clicked:', neuron)} />

        {/* Floating Project Cards */}
        {projects.slice(0, 6).map((project, idx) => (
          <ProjectCard3D
            key={project.name}
            position={projectPositions[idx]}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </Canvas>

      {/* Metrics HUD */}
      <MetricsHUD />

      {/* Text Overlay */}
      <div className="phase-content text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="phase-subtitle" style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.9)' }}>INTELLIGENCE EMERGES</p>
          <h2 className="phase-title" style={{ textShadow: '0 0 40px rgba(0, 0, 0, 0.8)' }}>Model Awakening</h2>
          <p className="body-text mt-4 max-w-2xl mx-auto" style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.9)' }}>
            Neural networks learn patterns, make predictions, and power intelligent systems
          </p>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Phase2ModelAwakening;
