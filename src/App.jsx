import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projects, technologies, educations } from './constants';

// Preloader Component
const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing neural pathways...');

  const statuses = [
    'Initializing neural pathways...',
    'Loading vector embeddings...',
    'Establishing synaptic connections...',
    'Calibrating agent networks...',
    'Optimizing neural weights...',
    'System ready...'
  ];

  useEffect(() => {
    let currentProgress = 0;
    let statusIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      setProgress(Math.min(100, currentProgress));

      if (statusIndex < statuses.length) {
        setStatus(statuses[statusIndex]);
        statusIndex++;
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader">
      <div className="neural-loader">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="neural-node" style={{ animationDelay: `${i * 0.2}s` }}></div>
        ))}
      </div>
      <div className="loading-text">INITIALIZING NEURAL NETWORK</div>
      <div className="loading-status">{status}</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="system-stats">
        <div className="stat-item">
          <div className="stat-label">Neurons</div>
          <div className="stat-value">{Math.floor(progress * 8.47)}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Synapses</div>
          <div className="stat-value">{Math.floor(progress * 28.47)}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Networks</div>
          <div className="stat-value">{Math.floor(progress * 0.06)}</div>
        </div>
      </div>
    </div>
  );
};

// Custom Cursor
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={cursorRef} className="custom-cursor"></div>;
};

// Neural Network Scene
const NeuralScene = ({ currentPhase }) => {
  const groupRef = useRef();
  const neuronsRef = useRef([]);
  const connectionsRef = useRef([]);

  // Work experiences (placeholder - add your actual work experience)
  const workExperiences = [
    { title: 'AI Engineer', company: 'Current', position: new THREE.Vector3(-3, 2, 0), color: 0x00F5FF },
    { title: 'ML Developer', company: 'Previous', position: new THREE.Vector3(-1, 2, 0), color: 0xA855F7 },
    { title: 'Research Assistant', company: 'FSU', position: new THREE.Vector3(1, 2, 0), color: 0x10B981 },
  ];

  // Create neuron positions based on phase
  const neuronData = useMemo(() => {
    if (currentPhase === 1) return []; // Data nucleus - just center sphere
    if (currentPhase === 2) return []; // Overview - expanding network

    if (currentPhase === 3) {
      // Experience - Linear horizontal arrangement
      return workExperiences.map((exp, i) => ({
        ...exp,
        position: new THREE.Vector3(i * 3 - 3, 0, 0)
      }));
    }

    if (currentPhase === 4) {
      // Projects - Scattered arrangement
      return projects.map((proj, i) => {
        const angle = (i / projects.length) * Math.PI * 2;
        const radius = 3 + Math.random() * 2;
        return {
          title: proj.name,
          description: proj.description,
          tags: proj.tags,
          position: new THREE.Vector3(
            Math.cos(angle) * radius,
            (Math.random() - 0.5) * 2,
            Math.sin(angle) * radius
          ),
          color: 0x00F5FF
        };
      });
    }

    if (currentPhase === 5) {
      // Tech stack - Random scattered
      return technologies.map((tech, i) => {
        const angle = (i / technologies.length) * Math.PI * 2;
        const radius = 4;
        return {
          title: tech.name,
          position: new THREE.Vector3(
            Math.cos(angle) * radius + (Math.random() - 0.5),
            (Math.random() - 0.5) * 3,
            Math.sin(angle) * radius + (Math.random() - 0.5)
          ),
          color: 0xA855F7
        };
      });
    }

    if (currentPhase === 6) {
      // Education - Semi-linear vertical
      return educations.map((edu, i) => ({
        ...edu,
        position: new THREE.Vector3((i - 0.5) * 2, -i * 2, 0),
        color: 0x10B981
      }));
    }

    return [];
  }, [currentPhase]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }

    // Animate neurons
    neuronsRef.current.forEach((neuron, i) => {
      if (neuron) {
        neuron.rotation.y += 0.02;
        const scale = 1 + Math.sin(time * 2 + i) * 0.1;
        neuron.scale.set(scale, scale, scale);
      }
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color={0x00F5FF} />
      <pointLight position={[5, 5, 5]} intensity={1} color={0xA855F7} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color={0x10B981} />

      {/* Phase 1: Central Data Nucleus */}
      {currentPhase === 1 && (
        <mesh>
          <icosahedronGeometry args={[2, 3]} />
          <meshStandardMaterial
            color={0x00F5FF}
            emissive={0x00F5FF}
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      )}

      {/* Phase 2: Expanding network */}
      {currentPhase === 2 && (
        <>
          <mesh>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial
              color={0x00F5FF}
              emissive={0x00F5FF}
              emissiveIntensity={0.5}
              wireframe
            />
          </mesh>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(angle) * 3, Math.sin(angle) * 3, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color={0xA855F7}
                  emissive={0xA855F7}
                  emissiveIntensity={0.5}
                />
              </mesh>
            );
          })}
        </>
      )}

      {/* Phases 3-6: Neurons */}
      {(currentPhase >= 3 && currentPhase <= 6) && neuronData.map((neuron, i) => (
        <mesh
          key={i}
          position={neuron.position}
          ref={(el) => (neuronsRef.current[i] = el)}
          userData={neuron}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={neuron.color}
            emissive={neuron.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Background particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(Array.from({ length: 3000 }, () => (Math.random() - 0.5) * 20))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color={0x00F5FF} transparent opacity={0.6} />
      </points>
    </group>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [hoveredNeuron, setHoveredNeuron] = useState(null);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll;

      // 7 phases total
      const newPhase = Math.min(7, Math.floor(progress * 7) + 1);
      setCurrentPhase(newPhase);

      // Hide scroll indicator
      const indicator = document.getElementById('scroll-hint');
      if (indicator) {
        indicator.style.opacity = scrollY > 100 ? '0' : '1';
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.body.style.height = '700vh'; // 7 phases

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.height = 'auto';
    };
  }, [isLoading]);

  const handlePhaseClick = (phase) => {
    const scrollTarget = ((phase - 1) / 7) * (document.body.scrollHeight - window.innerHeight);
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
        <div className="logo">NEURAL.AI</div>
        <div className="phase-nav">
          {[1, 2, 3, 4, 5, 6, 7].map(phase => (
            <div
              key={phase}
              className={`phase-indicator ${currentPhase === phase ? 'active' : ''}`}
              onClick={() => handlePhaseClick(phase)}
            >
              <div className="phase-dot"></div>
              <div className="phase-label">
                {['Start', 'About', 'Work', 'Projects', 'Tech', 'Education', 'Contact'][phase - 1]}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Canvas */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <NeuralScene currentPhase={currentPhase} />
        </Canvas>
      </div>

      {/* Phase 1: Data Nucleus - Name & Designation */}
      <div className={`phase-info ${currentPhase === 1 ? 'active' : ''}`}>
        <div className="phase-number">01</div>
        <div className="phase-title-large">NISHANTH AYYALASOMAYAJULA</div>
        <div className="phase-subtitle-large">AI/GenAI Engineer</div>
        <div className="phase-description">Building Intelligent Systems • Architecting the Future</div>
      </div>

      {/* Phase 2: Overview */}
      <div className={`phase-info ${currentPhase === 2 ? 'active' : ''}`}>
        <div className="phase-number">02</div>
        <div className="phase-title">NEURAL ARCHITECT</div>
        <div className="phase-subtitle">"Expanding networks of intelligence"</div>
        <div className="phase-description">
          Specializing in building autonomous agentic AI systems using LangGraph, AWS Bedrock, and cutting-edge LLMs.
          Expert in RAG architectures, multi-agent orchestration, and deploying production-grade AI solutions
          that transform business operations. Currently pursuing M.S. in Information Technology at Florida State University,
          focusing on Machine Learning, NLP, and Large Language Model applications.
        </div>
      </div>

      {/* Phase 3: Work Experience */}
      <div className={`phase-info ${currentPhase === 3 ? 'active' : ''}`}>
        <div className="phase-number">03</div>
        <div className="phase-title">WORK EXPERIENCE</div>
        <div className="phase-subtitle">"Professional journey"</div>
        <div className="phase-description">
          Hover over neurons to explore work experiences. Each connection represents skills
          and technologies learned along the way.
        </div>
      </div>

      {/* Phase 4: Projects */}
      <div className={`phase-info ${currentPhase === 4 ? 'active' : ''}`}>
        <div className="phase-number">04</div>
        <div className="phase-title">PROJECTS</div>
        <div className="phase-subtitle">"Innovations in action"</div>
        <div className="project-grid">
          {projects.map((proj, i) => (
            <div key={i} className="project-card-mini">
              <h3>{proj.name}</h3>
              <p>{proj.description}</p>
              <div className="tech-tags">
                {proj.tags.map(tag => (
                  <span key={tag.name} className="tech-tag">{tag.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase 5: Tech Stack */}
      <div className={`phase-info ${currentPhase === 5 ? 'active' : ''}`}>
        <div className="phase-number">05</div>
        <div className="phase-title">TECH STACK</div>
        <div className="phase-subtitle">"Tools of creation"</div>
        <div className="tech-grid">
          {technologies.map((tech, i) => (
            <div key={i} className="tech-item">
              <div className="tech-name">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase 6: Education */}
      <div className={`phase-info ${currentPhase === 6 ? 'active' : ''}`}>
        <div className="phase-number">06</div>
        <div className="phase-title">EDUCATION</div>
        <div className="phase-subtitle">"Foundation of knowledge"</div>
        <div className="education-list">
          {educations.map((edu, i) => (
            <div key={i} className="education-card">
              <h3>{edu.title}</h3>
              <p className="edu-institution">{edu.company_name}</p>
              <p className="edu-date">{edu.date}</p>
              <ul>
                {edu.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Phase 7: Contact */}
      <div className={`contact-overlay ${currentPhase === 7 ? 'active' : ''}`}>
        <h1>LET'S CONNECT</h1>
        <div className="tagline">Ready to build something amazing?</div>
        <div className="contact-grid">
          <a href="mailto:nayyalasomayaj@fsu.edu" className="contact-btn">
            <span>📧</span> Email
          </a>
          <a href="https://linkedin.com/in/nishanth-ayyalasomayajula" className="contact-btn" target="_blank" rel="noopener noreferrer">
            <span>💼</span> LinkedIn
          </a>
          <a href="https://github.com/nishanth1104" className="contact-btn" target="_blank" rel="noopener noreferrer">
            <span>💻</span> GitHub
          </a>
          <a href="#" className="contact-btn">
            <span>📄</span> Resume
          </a>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="scroll-hint" id="scroll-hint">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-arrow"></div>
      </div>

      {/* Detail Card for Neurons */}
      {hoveredNeuron && (
        <div className="neuron-detail visible">
          <div className="close-detail" onClick={() => setHoveredNeuron(null)}>×</div>
          <h2>{hoveredNeuron.title}</h2>
          <p>{hoveredNeuron.description}</p>
        </div>
      )}
    </>
  );
}

export default App;
