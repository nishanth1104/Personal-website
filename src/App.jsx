import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, technologies, educations, experiences } from './constants';

gsap.registerPlugin(ScrollTrigger);

// ========================================
// MINECRAFT WATERFALL - Falling Blue Blocks
// ========================================
function Waterfall() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        id: i,
        x: (Math.random() - 0.5) * 4,
        y: Math.random() * 25,
        z: -10 + (Math.random() - 0.5) * 3,
        speed: 0.05 + Math.random() * 0.05
      });
    }
    setBlocks(temp);
  }, []);

  useFrame(() => {
    setBlocks(prev => prev.map(block => ({
      ...block,
      y: block.y - block.speed < -5 ? 25 : block.y - block.speed
    })));
  });

  return (
    <group position={[0, 30, -10]}>
      {/* Source pool - Minecraft style blocks */}
      {[...Array(20)].map((_, i) => (
        <Box key={`pool-${i}`} args={[2, 2, 2]} position={[
          (i % 4 - 1.5) * 2,
          10,
          (Math.floor(i / 4) - 1.5) * 2
        ]}>
          <meshStandardMaterial color="#1E90FF" emissive="#1E90FF" emissiveIntensity={0.5} />
        </Box>
      ))}

      {/* Falling water blocks */}
      {blocks.map(block => (
        <Box key={block.id} args={[1.5, 1.5, 1.5]} position={[block.x, block.y, block.z]}>
          <meshStandardMaterial
            color="#00BFFF"
            emissive="#00BFFF"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </Box>
      ))}

      <pointLight position={[0, 5, 0]} intensity={3} color="#00BFFF" distance={30} />
    </group>
  );
}

// ========================================
// MINECRAFT RIVER - Blocky Blue Path
// ========================================
function River() {
  return (
    <group>
      {/* River made of water blocks flowing down the landscape */}
      {[...Array(30)].map((_, i) => {
        const y = -i * 6;
        return (
          <group key={i}>
            {/* Main river channel - 3 blocks wide */}
            {[-2, 0, 2].map((x, j) => (
              <Box key={`river-${i}-${j}`} args={[2, 1, 3]} position={[x, y, i * 3 - 20]}>
                <meshStandardMaterial
                  color="#1E90FF"
                  emissive="#1E90FF"
                  emissiveIntensity={0.4}
                  transparent
                  opacity={0.7}
                />
              </Box>
            ))}
            {/* Flowing blocks on river */}
            <Box args={[1, 1, 1]} position={[(i % 3 - 1) * 2, y + 1, i * 3 - 20]}>
              <meshStandardMaterial
                color="#00BFFF"
                emissive="#00BFFF"
                emissiveIntensity={0.5}
              />
            </Box>
          </group>
        );
      })}
    </group>
  );
}

// ========================================
// MINECRAFT MOUNTAINS - Stacked Stone Blocks
// ========================================
function Mountains() {
  return (
    <group>
      {/* Left side mountains */}
      {[0, 1, 2].map((mIdx) => {
        const baseY = -20 - mIdx * 25;
        const baseX = -15 - mIdx * 3;
        const baseZ = -15 + mIdx * 10;
        const height = 8 + mIdx * 2;

        return (
          <group key={`left-mountain-${mIdx}`}>
            {/* Stack blocks to form pyramid mountain */}
            {[...Array(height)].map((_, layer) => {
              const size = height - layer;
              return [...Array(size)].map((_, x) =>
                [...Array(size)].map((_, z) => (
                  <Box
                    key={`${mIdx}-${layer}-${x}-${z}`}
                    args={[2, 2, 2]}
                    position={[
                      baseX + (x - size / 2) * 2,
                      baseY + layer * 2,
                      baseZ + (z - size / 2) * 2
                    ]}
                  >
                    <meshStandardMaterial
                      color={layer % 2 === 0 ? "#556B2F" : "#6B8E23"}
                      emissive="#2F4F2F"
                      emissiveIntensity={0.2}
                    />
                  </Box>
                ))
              );
            })}
          </group>
        );
      })}

      {/* Right side mountains */}
      {[0, 1, 2].map((mIdx) => {
        const baseY = -30 - mIdx * 25;
        const baseX = 15 + mIdx * 3;
        const baseZ = -10 + mIdx * 10;
        const height = 7 + mIdx * 2;

        return (
          <group key={`right-mountain-${mIdx}`}>
            {[...Array(height)].map((_, layer) => {
              const size = height - layer;
              return [...Array(size)].map((_, x) =>
                [...Array(size)].map((_, z) => (
                  <Box
                    key={`${mIdx}-${layer}-${x}-${z}`}
                    args={[2, 2, 2]}
                    position={[
                      baseX + (x - size / 2) * 2,
                      baseY + layer * 2,
                      baseZ + (z - size / 2) * 2
                    ]}
                  >
                    <meshStandardMaterial
                      color={layer % 2 === 0 ? "#8B4513" : "#A0522D"}
                      emissive="#654321"
                      emissiveIntensity={0.2}
                    />
                  </Box>
                ))
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

// ========================================
// MINECRAFT TERRAIN - Grass Blocks
// ========================================
function Terrain() {
  return (
    <group>
      {/* Grass block terrain at different levels */}
      {[...Array(25)].map((_, section) => {
        const baseY = -section * 6 - 2;
        const baseZ = section * 4 - 25;

        return (
          <group key={section}>
            {/* Create patches of grass blocks */}
            {[...Array(10)].map((_, x) =>
              [...Array(8)].map((_, z) => (
                <Box
                  key={`terrain-${section}-${x}-${z}`}
                  args={[2, 2, 2]}
                  position={[
                    (x - 5) * 2,
                    baseY - (Math.random() > 0.7 ? 2 : 0),
                    baseZ + z * 2
                  ]}
                >
                  <meshStandardMaterial
                    color="#228B22"
                    emissive="#006400"
                    emissiveIntensity={0.1}
                  />
                </Box>
              ))
            )}
          </group>
        );
      })}
    </group>
  );
}

// ========================================
// MINECRAFT TREES - Trunk + Leaf Blocks
// ========================================
function Trees() {
  return (
    <group>
      {[...Array(20)].map((_, i) => {
        const y = -i * 8 - 5;
        const x = (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 3);
        const z = i * 5 - 20;

        return (
          <group key={i} position={[x, y, z]}>
            {/* Tree trunk - brown blocks */}
            {[...Array(5)].map((_, h) => (
              <Box key={`trunk-${h}`} args={[1, 2, 1]} position={[0, h * 2, 0]}>
                <meshStandardMaterial
                  color="#8B4513"
                  emissive="#654321"
                  emissiveIntensity={0.1}
                />
              </Box>
            ))}

            {/* Leaves - green blocks */}
            {[...Array(3)].map((_, lx) =>
              [...Array(3)].map((_, ly) =>
                [...Array(3)].map((_, lz) => (
                  <Box
                    key={`leaf-${lx}-${ly}-${lz}`}
                    args={[1.5, 1.5, 1.5]}
                    position={[(lx - 1) * 1.5, 9 + ly * 1.5, (lz - 1) * 1.5]}
                  >
                    <meshStandardMaterial
                      color="#32CD32"
                      emissive="#228B22"
                      emissiveIntensity={0.2}
                    />
                  </Box>
                ))
              )
            )}
          </group>
        );
      })}
    </group>
  );
}

// ========================================
// MINECRAFT BIRDS - Flying Cubes
// ========================================
function Birds() {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 15; i++) {
      temp.push({
        id: i,
        x: (Math.random() - 0.5) * 40,
        y: 20 - i * 10 + Math.random() * 5,
        z: (Math.random() - 0.5) * 40,
        speed: 0.02 + Math.random() * 0.03,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }
    setBirds(temp);
  }, []);

  useFrame(() => {
    setBirds(prev => prev.map(bird => {
      const newX = bird.x + bird.speed * bird.direction;
      return {
        ...bird,
        x: newX > 30 || newX < -30 ? bird.x - bird.speed * bird.direction : newX
      };
    }));
  });

  return (
    <group>
      {birds.map(bird => (
        <group key={bird.id} position={[bird.x, bird.y, bird.z]}>
          {/* Body */}
          <Box args={[1, 0.5, 1.5]}>
            <meshStandardMaterial color="#4169E1" emissive="#1E3A8A" emissiveIntensity={0.3} />
          </Box>
          {/* Wings */}
          <Box args={[2, 0.2, 0.5]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#6495ED" emissive="#2563EB" emissiveIntensity={0.2} />
          </Box>
        </group>
      ))}
    </group>
  );
}

// ========================================
// CAMERA PATH - Follows the river down
// ========================================
function CameraPath() {
  const { camera } = useThree();

  useEffect(() => {
    gsap.to(camera.position, {
      y: -150,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    gsap.to(camera.position, {
      z: 20,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Slight side-to-side movement
    gsap.to(camera.position, {
      x: -5,
      scrollTrigger: {
        trigger: '.about',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });

    gsap.to(camera.position, {
      x: 5,
      scrollTrigger: {
        trigger: '.projects',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });

    gsap.to(camera.position, {
      x: 0,
      scrollTrigger: {
        trigger: '.contact',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });

  }, [camera]);

  return null;
}

// ========================================
// GRASS PATCHES - Scattered Decoration
// ========================================
function GrassPatches() {
  return (
    <group>
      {[...Array(50)].map((_, i) => (
        <Box
          key={i}
          args={[0.3, 1, 0.3]}
          position={[
            (Math.random() - 0.5) * 30,
            -i * 3,
            (Math.random() - 0.5) * 30
          ]}
        >
          <meshStandardMaterial
            color="#90EE90"
            emissive="#00FF00"
            emissiveIntensity={0.3}
          />
        </Box>
      ))}
    </group>
  );
}

// ========================================
// MAIN SCENE
// ========================================
function Scene() {
  return (
    <>
      {/* Much brighter lighting to make everything visible */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[20, 40, 20]} intensity={2} color="#FFE4B5" />
      <directionalLight position={[-20, 30, -20]} intensity={1.5} color="#87CEEB" />

      {/* Colored point lights throughout the journey */}
      <pointLight position={[0, 30, 0]} intensity={3} color="#FFD700" distance={40} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00BFFF" distance={35} />
      <pointLight position={[0, -50, 0]} intensity={2.5} color="#32CD32" distance={40} />
      <pointLight position={[0, -100, 0]} intensity={2} color="#FF69B4" distance={35} />
      <pointLight position={[0, -150, 0]} intensity={2} color="#9370DB" distance={40} />

      {/* Lighter fog for better visibility */}
      <fog attach="fog" args={['#1a1a2e', 50, 200]} />

      {/* Minecraft World Components */}
      <Waterfall />
      <River />
      <Mountains />
      <Terrain />
      <Trees />
      <Birds />
      <GrassPatches />
      <CameraPath />
    </>
  );
}

// ========================================
// MAIN APP
// ========================================
export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Animations
    gsap.utils.toArray('.fade-in').forEach((elem) => {
      gsap.fromTo(elem,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    gsap.utils.toArray('.stagger-container').forEach((container) => {
      gsap.fromTo(container.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    gsap.to('.progress-bar', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="app">
      {/* 3D Canvas - Continuous Landscape */}
      <div className="canvas-bg">
        <Canvas camera={{ position: [0, 35, 15], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <main className="content">
        {/* HERO - At the waterfall */}
        <section className="section hero">
          <div className="container">
            <h1 className="hero-title">
              <div className="fade-in">NISHANTH</div>
              <div className="fade-in">AYYALASOMAYAJULA</div>
            </h1>
            <p className="hero-subtitle fade-in">AI Engineer & Architect</p>
            <p className="hero-desc fade-in">Journey through the landscape of innovation</p>
          </div>
        </section>

        {/* ABOUT - Upper river */}
        <section className="section about">
          <div className="container">
            <h2 className="title fade-in">About Me</h2>
            <div className="text-content stagger-container">
              <p>
                Specializing in building <span className="highlight">autonomous agentic AI systems</span> using
                <span className="highlight"> LangGraph</span>, <span className="highlight">AWS Bedrock</span>, and cutting-edge
                <span className="highlight"> LLMs</span>.
              </p>
              <p>
                Expert in <span className="highlight">RAG architectures</span>, <span className="highlight">multi-agent orchestration</span>,
                and deploying production-grade AI solutions.
              </p>
              <p>
                Currently pursuing M.S. in Information Technology at Florida State University.
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE - Mid river valley */}
        <section className="section experience">
          <div className="container">
            <h2 className="title fade-in">Experience</h2>
            <div className="cards stagger-container">
              {experiences.map((exp, i) => (
                <div key={i} className="card">
                  <div className="card-header">
                    <h3>{exp.title}</h3>
                    <span>{exp.date}</span>
                  </div>
                  <h4>{exp.company_name}</h4>
                  <ul>
                    {exp.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS - Lower plains */}
        <section className="section skills">
          <div className="container">
            <h2 className="title fade-in">Tech Stack</h2>
            <div className="grid stagger-container">
              {technologies.map((tech, i) => (
                <div key={i} className="skill">
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS - Delta/Lake area */}
        <section className="section projects">
          <div className="container">
            <h2 className="title fade-in">Featured Projects</h2>
            <div className="project-grid stagger-container">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className={`project ${i % 3 === 0 ? 'large' : ''}`}
                  onClick={() => setSelectedProject(proj)}
                >
                  <div className="project-image">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.name} />
                    ) : (
                      <div className="image-placeholder">
                        <span>Project Preview</span>
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <h3>{proj.name}</h3>
                    <p>{proj.description}</p>
                    <div className="tags">
                      {proj.tags.map((tag, j) => (
                        <span key={j}>{tag.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION - Peaceful garden */}
        <section className="section education">
          <div className="container">
            <h2 className="title fade-in">Education</h2>
            <div className="edu-list stagger-container">
              {educations.map((edu, i) => (
                <div key={i} className="edu-item">
                  <h3>{edu.title}</h3>
                  <h4>{edu.company_name}</h4>
                  <p className="date">{edu.date}</p>
                  <ul>
                    {edu.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT - Ocean/Horizon */}
        <section className="section contact">
          <div className="container center">
            <h2 className="contact-title fade-in">Let's Connect</h2>
            <p className="contact-sub fade-in">Ready to build something amazing?</p>
            <div className="contact-btns stagger-container">
              <a href="mailto:nayyalasomayaj@fsu.edu" className="btn">Email</a>
              <a href="https://linkedin.com/in/nishanth-ayyalasomayajula" target="_blank" rel="noopener noreferrer" className="btn">LinkedIn</a>
              <a href="https://github.com/nishanth1104" target="_blank" rel="noopener noreferrer" className="btn">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {selectedProject && (
        <div className="modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelectedProject(null)}>×</button>

            {selectedProject.image && (
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.name} />
              </div>
            )}

            <h2>{selectedProject.name}</h2>
            <p>{selectedProject.description}</p>
            <div className="tags">
              {selectedProject.tags.map((tag, i) => (
                <span key={i}>{tag.name}</span>
              ))}
            </div>
            <a href={selectedProject.source_code_link} target="_blank" rel="noopener noreferrer" className="btn">
              View on GitHub
            </a>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="progress">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}
