import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import { projects } from './constants';

// Single 3D Scene that adapts to phases
const AdaptiveScene = ({ currentPhase }) => {
  const sphereRef = useRef();
  const particlesRef = useRef();
  const lightRef = useRef();
  const neuralNetRef = useRef();
  const agentHubRef = useRef();
  const ecosystemRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Phase 1: Data Sphere
    if (sphereRef.current && currentPhase === 1) {
      sphereRef.current.rotation.y += 0.003;
      sphereRef.current.rotation.x += 0.001;
      const scale = 1 + Math.sin(time) * 0.05;
      sphereRef.current.scale.set(scale, scale, scale);
    }

    // Particles (flow towards center in Phase 1)
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      const positions = particlesRef.current.geometry.attributes.position.array;

      if (currentPhase === 1) {
        // Particles flow inward
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] *= 0.998;
          positions[i + 1] *= 0.998;
          positions[i + 2] *= 0.998;

          const dist = Math.sqrt(positions[i]**2 + positions[i+1]**2 + positions[i+2]**2);
          if (dist < 2) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 8 + Math.random() * 2;
            positions[i] = Math.cos(angle) * radius;
            positions[i + 1] = (Math.random() - 0.5) * 8;
            positions[i + 2] = Math.sin(angle) * radius;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }

    // Phase 2: Neural Network
    if (neuralNetRef.current && currentPhase === 2) {
      neuralNetRef.current.rotation.y = time * 0.15;
      neuralNetRef.current.children.forEach((child, idx) => {
        child.position.y += Math.sin(time * 2 + idx) * 0.001;
      });
    }

    // Phase 3: Agent Hub
    if (agentHubRef.current && currentPhase === 3) {
      agentHubRef.current.rotation.y += 0.005;
      const scale = 1.2 + Math.sin(time * 0.8) * 0.1;
      agentHubRef.current.scale.set(scale, scale, scale);
    }

    // Phase 4: Ecosystem
    if (ecosystemRef.current && currentPhase === 4) {
      ecosystemRef.current.rotation.y += 0.003;
      ecosystemRef.current.children.forEach((child, idx) => {
        if (child.isMesh) {
          child.rotation.y += 0.01;
          const yOffset = Math.sin(time + idx * 0.5) * 0.02;
          child.position.y = yOffset;
        }
      });
    }

    // Change light color based on phase
    if (lightRef.current) {
      if (currentPhase === 1) lightRef.current.color.setHex(0x00F5FF);
      else if (currentPhase === 2) lightRef.current.color.setHex(0xA855F7);
      else if (currentPhase === 3) lightRef.current.color.setHex(0xA855F7);
      else if (currentPhase === 4) lightRef.current.color.setHex(0x10B981);
      else if (currentPhase === 5) lightRef.current.color.setHex(0x00F5FF);
    }
  });

  // Particle system
  const particleCount = 1500;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 6 + Math.random() * 3;
    positions[i] = Math.cos(angle) * radius;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = Math.sin(angle) * radius;

    const color = Math.random() > 0.5 ? new THREE.Color(0x00F5FF) : new THREE.Color(0xA855F7);
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  // Neural network nodes (Phase 2)
  const neurons = [];
  const layers = 4;
  const nodesPerLayer = 6;
  for (let layer = 0; layer < layers; layer++) {
    for (let i = 0; i < nodesPerLayer; i++) {
      const angle = (i / nodesPerLayer) * Math.PI * 2;
      const radius = 2;
      neurons.push({
        position: [
          Math.cos(angle) * radius,
          (layer - layers / 2) * 1.2,
          Math.sin(angle) * radius
        ]
      });
    }
  }

  // Agent modules (Phase 3)
  const agents = [
    { angle: 0, color: '#00F5FF' },
    { angle: Math.PI / 3, color: '#A855F7' },
    { angle: (Math.PI / 3) * 2, color: '#10B981' },
    { angle: Math.PI, color: '#F59E0B' },
    { angle: (Math.PI / 3) * 4, color: '#EF4444' },
    { angle: (Math.PI / 3) * 5, color: '#8B5CF6' }
  ];

  // Ecosystem services (Phase 4)
  const services = [
    { angle: 0, color: '#FF9900' },
    { angle: Math.PI / 3, color: '#336791' },
    { angle: (Math.PI / 3) * 2, color: '#DC382D' },
    { angle: Math.PI, color: '#2496ED' },
    { angle: (Math.PI / 3) * 4, color: '#326CE5' },
    { angle: (Math.PI / 3) * 5, color: '#47A248' }
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight ref={lightRef} position={[0, 0, 0]} intensity={2.5} color={0x00F5FF} />
      <pointLight position={[5, 5, 5]} intensity={1} color={0xA855F7} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color={0x10B981} />

      {/* Phase 1: Data Sphere with flowing particles */}
      <mesh ref={sphereRef} visible={currentPhase === 1}>
        <icosahedronGeometry args={[1.8, 3]} />
        <meshStandardMaterial
          color={0x00F5FF}
          emissive={0x00F5FF}
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Particles (visible in phases 1 and 5) */}
      <points ref={particlesRef} visible={currentPhase === 1 || currentPhase === 5}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} />
      </points>

      {/* Phase 2: Neural Network */}
      <group ref={neuralNetRef} visible={currentPhase === 2}>
        {neurons.map((neuron, idx) => (
          <mesh key={idx} position={neuron.position}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? 0x00F5FF : 0xA855F7}
              emissive={idx % 2 === 0 ? 0x00F5FF : 0xA855F7}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
        {/* Connection lines */}
        {neurons.map((neuron, idx) => {
          if (idx < neurons.length - nodesPerLayer) {
            const start = new THREE.Vector3(...neuron.position);
            const end = new THREE.Vector3(...neurons[idx + nodesPerLayer].position);
            const points = [start, end];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            return (
              <line key={`line-${idx}`} geometry={geometry}>
                <lineBasicMaterial color={0x00F5FF} opacity={0.3} transparent />
              </line>
            );
          }
          return null;
        })}
      </group>

      {/* Phase 3: Agent Hub */}
      <group visible={currentPhase === 3}>
        {/* Central Hub */}
        <mesh ref={agentHubRef}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color={0x00F5FF}
            emissive={0x00F5FF}
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
        {/* Agent Modules */}
        {agents.map((agent, idx) => {
          const radius = 3;
          const x = Math.cos(agent.angle) * radius;
          const z = Math.sin(agent.angle) * radius;
          return (
            <mesh key={idx} position={[x, 0, z]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial
                color={agent.color}
                emissive={agent.color}
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>

      {/* Phase 4: Ecosystem */}
      <group ref={ecosystemRef} visible={currentPhase === 4}>
        {services.map((service, idx) => {
          const radius = 3.5;
          const x = Math.cos(service.angle) * radius;
          const z = Math.sin(service.angle) * radius;
          return (
            <mesh key={idx} position={[x, 0, z]}>
              <cylinderGeometry args={[0.4, 0.4, 0.8, 6]} />
              <meshStandardMaterial
                color={service.color}
                emissive={service.color}
                emissiveIntensity={0.4}
              />
            </mesh>
          );
        })}
      </group>

      {/* Phase 5: Multiverse (spheres) */}
      <group visible={currentPhase === 5}>
        {[
          { pos: [-3, 1.5, 0], color: 0x10B981 },
          { pos: [0, 1.5, -3], color: 0x00F5FF },
          { pos: [3, 1.5, 0], color: 0xA855F7 },
          { pos: [0, 1.5, 3], color: 0xF59E0B }
        ].map((sphere, idx) => (
          <mesh key={idx} position={sphere.pos}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial
              color={sphere.color}
              emissive={sphere.color}
              emissiveIntensity={0.5}
              wireframe
            />
          </mesh>
        ))}
      </group>
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll;
      setScrollProgress(progress);

      // Calculate phase (1-5)
      const newPhase = Math.min(5, Math.floor(progress * 5) + 1);
      setCurrentPhase(newPhase);

      // Hide scroll indicator
      const indicator = document.getElementById('scroll-indicator');
      if (indicator) {
        indicator.style.opacity = scrollY > 100 ? '0' : '1';
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Make page scrollable
    document.body.style.height = '500vh';

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.height = 'auto';
    };
  }, [isLoading]);

  const handlePhaseClick = (phase) => {
    const scrollTarget = ((phase - 1) / 5) * (document.body.scrollHeight - window.innerHeight);
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  };

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <CustomCursor />

      {/* Navigation */}
      <nav className="nav">
        <div className="logo">NA</div>
        <div className="phase-indicators">
          {[1, 2, 3, 4, 5].map(phase => (
            <div
              key={phase}
              className={`phase-dot ${currentPhase === phase ? 'active' : ''}`}
              onClick={() => handlePhaseClick(phase)}
            />
          ))}
        </div>
      </nav>

      {/* Fixed 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: '#0A0A0F' }}
        >
          <AdaptiveScene currentPhase={currentPhase} />
          <OrbitControls enabled={false} />
        </Canvas>
      </div>

      {/* Phase 1: Data Nucleus */}
      <div className={`phase-overlay ${currentPhase === 1 ? 'active' : ''}`}>
        <div className="phase-title">DATA NUCLEUS</div>
        <div className="phase-subtitle">"Where intelligence begins"</div>
      </div>

      {/* Phase 2: Model Awakening */}
      <div className={`phase-overlay ${currentPhase === 2 ? 'active' : ''}`}>
        <div className="phase-title">MODEL AWAKENING</div>
        <div className="phase-subtitle">"The learning begins"</div>

        <div className="project-cards">
          {projects.slice(0, 3).map((project, idx) => (
            <div key={idx} className="project-card">
              <h3>🤖 {project.name}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.tags?.map(tag => (
                  <span key={tag.name} className="tech-tag">{tag.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="metrics-hud">
          <h3>TRAINING METRICS</h3>
          <div className="metric-row">
            <span>Models Trained:</span>
            <span className="metric-value">50+</span>
          </div>
          <div className="metric-row">
            <span>Avg Accuracy:</span>
            <span className="metric-value">94.2%</span>
          </div>
          <div className="metric-row">
            <span>Inference Time:</span>
            <span className="metric-value">&lt;100ms</span>
          </div>
        </div>
      </div>

      {/* Phase 3: Agent Architecture */}
      <div className={`phase-overlay ${currentPhase === 3 ? 'active' : ''}`}>
        <div className="phase-title">AGENT ARCHITECTURE</div>
        <div className="phase-subtitle">"The system takes form"</div>

        <div className="skills-grid">
          <div className="skill-item">
            <div className="skill-icon">🔀</div>
            <div className="skill-name">Router Agent</div>
          </div>
          <div className="skill-item">
            <div className="skill-icon">🔍</div>
            <div className="skill-name">Retrieval Agent</div>
          </div>
          <div className="skill-item">
            <div className="skill-icon">💾</div>
            <div className="skill-name">SQL Executor</div>
          </div>
          <div className="skill-item">
            <div className="skill-icon">📚</div>
            <div className="skill-name">Research Agent</div>
          </div>
          <div className="skill-item">
            <div className="skill-icon">💻</div>
            <div className="skill-name">Code Generator</div>
          </div>
          <div className="skill-item">
            <div className="skill-icon">💬</div>
            <div className="skill-name">Synthesizer</div>
          </div>
        </div>
      </div>

      {/* Phase 4: Ecosystem Integration */}
      <div className={`phase-overlay ${currentPhase === 4 ? 'active' : ''}`}>
        <div className="phase-title">ECOSYSTEM INTEGRATION</div>
        <div className="phase-subtitle">"The connected intelligence"</div>

        <div className="metrics-hud">
          <h3>SYSTEM PERFORMANCE</h3>
          <div className="metric-row">
            <span>Uptime:</span>
            <span className="metric-value">99.9%</span>
          </div>
          <div className="metric-row">
            <span>Latency:</span>
            <span className="metric-value">45ms</span>
          </div>
          <div className="metric-row">
            <span>Throughput:</span>
            <span className="metric-value">10K/s</span>
          </div>
          <div className="metric-row">
            <span>Error Rate:</span>
            <span className="metric-value">0.02%</span>
          </div>
        </div>
      </div>

      {/* Phase 5: Autonomous Multiverse */}
      <div className={`phase-overlay ${currentPhase === 5 ? 'active' : ''}`}>
        <div className="phase-title">AUTONOMOUS MULTIVERSE</div>
        <div className="phase-subtitle">"The deployed reality"</div>

        <div className="contact-info">
          <h1>Nishanth Ayyalasomayajula</h1>
          <p>AI/GenAI Engineer | Building Intelligent Systems</p>
          <div className="contact-buttons">
            <a href="mailto:nayyalasomayaj@fsu.edu" className="contact-btn">📧 Email</a>
            <a href="https://linkedin.com/in/nishanth-ayyalasomayajula" className="contact-btn" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
            <a href="https://github.com/nishanth1104" className="contact-btn" target="_blank" rel="noopener noreferrer">💻 GitHub</a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div id="scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-arrow"></div>
      </div>
    </>
  );
}

export default App;
