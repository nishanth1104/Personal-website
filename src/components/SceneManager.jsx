import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ========================================
// PHASE 1: DATA NUCLEUS
// ========================================
const DataNucleus = ({ active }) => {
  const sphereRef = useRef();
  const particlesRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.002;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      sphereRef.current.scale.set(scale, scale, scale);
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Move towards center
        positions[i3] *= 0.99;
        positions[i3 + 1] *= 0.99;
        positions[i3 + 2] *= 0.99;

        // Reset if too close
        const distance = Math.sqrt(
          positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2
        );

        if (distance < 2.5) {
          const radius = 10 + Math.random() * 5;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = radius * Math.cos(phi);
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef} visible={active}>
      {/* Central Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
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

      {/* Labels */}
      <Text position={[0, 3, 0]} fontSize={0.3} color="#A855F7">
        TRAINING DATA
      </Text>
      <Text position={[3, 0, 0]} fontSize={0.3} color="#A855F7">
        REAL-TIME STREAMS
      </Text>
      <Text position={[-3, 0, 0]} fontSize={0.3} color="#A855F7">
        KNOWLEDGE GRAPHS
      </Text>
    </group>
  );
};

// ========================================
// PHASE 2: NEURAL NETWORK
// ========================================
const NeuralNetwork = ({ active }) => {
  const groupRef = useRef();
  const neuronsRef = useRef([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const neurons = useMemo(() => {
    const neuronArray = [];
    const layers = 5;
    const neuronsPerLayer = 8;

    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < neuronsPerLayer; i++) {
        const angle = (i / neuronsPerLayer) * Math.PI * 2;
        const radius = 2 + layer * 0.5;
        neuronArray.push({
          position: [
            Math.cos(angle) * radius,
            (layer - layers / 2) * 0.8,
            Math.sin(angle) * radius
          ],
          color: Math.random() > 0.5 ? '#00F5FF' : '#A855F7'
        });
      }
    }
    return neuronArray;
  }, []);

  return (
    <group ref={groupRef} visible={active}>
      {neurons.map((neuron, idx) => (
        <mesh key={idx} position={neuron.position}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={neuron.color}
            emissive={neuron.color}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* Connections between neurons */}
      {neurons.map((neuron, idx) => {
        if (idx % 5 === 0 && idx < neurons.length - 1) {
          const start = new THREE.Vector3(...neuron.position);
          const end = new THREE.Vector3(...neurons[idx + 1].position);
          const points = [start, end];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <line key={`line-${idx}`} geometry={geometry}>
              <lineBasicMaterial color="#00F5FF" opacity={0.2} transparent />
            </line>
          );
        }
        return null;
      })}
    </group>
  );
};

// ========================================
// PHASE 3: AGENT SYSTEM
// ========================================
const AgentSystem = ({ active }) => {
  const groupRef = useRef();
  const hubRef = useRef();

  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y += 0.005;
      const scale = 1.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      hubRef.current.scale.set(scale, scale, scale);
    }
  });

  const agents = useMemo(() => {
    return [
      { name: 'Router', color: '#00F5FF', angle: 0 },
      { name: 'Retrieval', color: '#A855F7', angle: Math.PI / 3 },
      { name: 'SQL', color: '#10B981', angle: (Math.PI / 3) * 2 },
      { name: 'Code', color: '#F59E0B', angle: Math.PI },
      { name: 'Analysis', color: '#EF4444', angle: (Math.PI / 3) * 4 },
      { name: 'Reasoning', color: '#8B5CF6', angle: (Math.PI / 3) * 5 }
    ];
  }, []);

  return (
    <group ref={groupRef} visible={active}>
      {/* Central Hub */}
      <mesh ref={hubRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Agent Modules */}
      {agents.map((agent, idx) => {
        const radius = 4;
        const x = Math.cos(agent.angle) * radius;
        const z = Math.sin(agent.angle) * radius;

        return (
          <group key={agent.name} position={[x, 0, z]}>
            <mesh>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshStandardMaterial
                color={agent.color}
                emissive={agent.color}
                emissiveIntensity={0.4}
              />
            </mesh>
            <Text position={[0, -0.6, 0]} fontSize={0.15} color={agent.color}>
              {agent.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

// ========================================
// PHASE 4: ECOSYSTEM
// ========================================
const Ecosystem = ({ active }) => {
  const groupRef = useRef();

  const services = useMemo(() => [
    { name: 'AWS', color: '#FF9900', angle: 0 },
    { name: 'PostgreSQL', color: '#336791', angle: Math.PI / 3 },
    { name: 'Redis', color: '#DC382D', angle: (Math.PI / 3) * 2 },
    { name: 'Docker', color: '#2496ED', angle: Math.PI },
    { name: 'K8s', color: '#326CE5', angle: (Math.PI / 3) * 4 },
    { name: 'MongoDB', color: '#47A248', angle: (Math.PI / 3) * 5 }
  ], []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef} visible={active}>
      {services.map((service) => {
        const radius = 3.5;
        const x = Math.cos(service.angle) * radius;
        const z = Math.sin(service.angle) * radius;

        return (
          <group key={service.name} position={[x, 0, z]}>
            <mesh>
              <cylinderGeometry args={[0.5, 0.5, 0.8, 6]} />
              <meshStandardMaterial
                color={service.color}
                emissive={service.color}
                emissiveIntensity={0.4}
              />
            </mesh>
            <Text position={[0, -0.8, 0]} fontSize={0.2} color={service.color}>
              {service.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

// ========================================
// PHASE 5: MULTIVERSE
// ========================================
const Multiverse = ({ active }) => {
  const groupRef = useRef();

  const industries = useMemo(() => [
    { name: 'Healthcare', color: '#10B981', position: [-4, 2, 0] },
    { name: 'Finance', color: '#00F5FF', position: [0, 2, -4] },
    { name: 'E-commerce', color: '#A855F7', position: [4, 2, 0] },
    { name: 'Education', color: '#F59E0B', position: [0, 2, 4] }
  ], []);

  useFrame((state) => {
    industries.forEach((industry, idx) => {
      const mesh = groupRef.current?.children[idx];
      if (mesh) {
        mesh.rotation.y += 0.005;
        const scale = 1 + Math.sin(state.clock.elapsedTime + idx) * 0.1;
        mesh.scale.set(scale, scale, scale);
      }
    });
  });

  return (
    <group ref={groupRef} visible={active}>
      {industries.map((industry) => (
        <group key={industry.name} position={industry.position}>
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
              color={industry.color}
              emissive={industry.color}
              emissiveIntensity={0.5}
              wireframe
            />
          </mesh>
          <Text position={[0, -1.2, 0]} fontSize={0.25} color={industry.color}>
            {industry.name}
          </Text>
        </group>
      ))}
    </group>
  );
};

// ========================================
// CAMERA CONTROLLER
// ========================================
const CameraController = ({ currentPhase }) => {
  const { camera } = useThree();

  useEffect(() => {
    const positions = {
      1: { x: 0, y: 0, z: 8 },
      2: { x: 0, y: 0, z: 12 },
      3: { x: 0, y: 2, z: 10 },
      4: { x: 0, y: 2, z: 8 },
      5: { x: 0, y: 0, z: 10 }
    };

    const targetPos = positions[currentPhase] || positions[1];

    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.5,
      ease: 'power2.inOut'
    });
  }, [currentPhase, camera]);

  return null;
};

// ========================================
// MAIN SCENE MANAGER
// ========================================
const Scene = ({ currentPhase }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />

      <CameraController currentPhase={currentPhase} />

      <DataNucleus active={currentPhase === 1} />
      <NeuralNetwork active={currentPhase === 2} />
      <AgentSystem active={currentPhase === 3} />
      <Ecosystem active={currentPhase === 4} />
      <Multiverse active={currentPhase === 5} />
    </>
  );
};

const SceneManager = ({ currentPhase }) => {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Scene currentPhase={currentPhase} />
      </Canvas>
    </div>
  );
};

export default SceneManager;
