import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Service types (AWS, PostgreSQL, Redis, etc.)
const services = [
  { id: 'aws', name: 'AWS', color: '#FF9900' },
  { id: 'postgresql', name: 'PostgreSQL', color: '#336791' },
  { id: 'redis', name: 'Redis', color: '#DC382D' },
  { id: 'docker', name: 'Docker', color: '#2496ED' },
  { id: 'kubernetes', name: 'K8s', color: '#326CE5' },
  { id: 'mongodb', name: 'MongoDB', color: '#47A248' }
];

// Service Pod
const ServicePod = ({ position, service }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.5, 0.5, 0.8, 6]} />
        <meshStandardMaterial
          color={service.color}
          emissive={service.color}
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color={service.color}
        anchorX="center"
        anchorY="top"
      >
        {service.name}
      </Text>
    </group>
  );
};

// Connection Network Lines
const ConnectionNetwork = ({ servicePositions }) => {
  const linesRef = useRef();

  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < servicePositions.length; i++) {
      for (let j = i + 1; j < servicePositions.length; j++) {
        if (Math.random() > 0.5) {
          conns.push({
            start: servicePositions[i],
            end: servicePositions[j]
          });
        }
      }
    }
    return conns;
  }, [servicePositions]);

  return (
    <group>
      {connections.map((conn, idx) => {
        const points = [
          new THREE.Vector3(...conn.start),
          new THREE.Vector3(...conn.end)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={idx} geometry={geometry}>
            <lineBasicMaterial color="#00F5FF" opacity={0.3} transparent />
          </line>
        );
      })}
    </group>
  );
};

// Metrics Dashboard
const MetricsDashboard = () => {
  const metrics = [
    { label: 'Uptime', value: '99.9%', color: '#10B981' },
    { label: 'Latency', value: '45ms', color: '#00F5FF' },
    { label: 'Throughput', value: '10K/s', color: '#A855F7' }
  ];

  return (
    <div className="absolute top-20 right-10 space-y-3 z-20">
      {metrics.map((metric, idx) => (
        <motion.div
          key={metric.label}
          className="glass-card"
          style={{ padding: '12px 18px', minWidth: '150px' }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + idx * 0.2 }}
        >
          <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">
            {metric.label}
          </div>
          <div className="text-xl font-bold" style={{ color: metric.color }}>
            {metric.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Phase4EcosystemIntegration = () => {
  // Position services in a hexagonal pattern
  const servicePositions = useMemo(() => {
    return services.map((_, idx) => {
      const angle = (idx / services.length) * Math.PI * 2;
      const radius = 3.5;
      return [
        Math.cos(angle) * radius,
        Math.sin(idx * 0.8) * 1,
        Math.sin(angle) * radius
      ];
    });
  }, []);

  return (
    <section id="phase4" className="phase-section">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />

          {/* Service Pods */}
          {services.map((service, idx) => (
            <ServicePod
              key={service.id}
              position={servicePositions[idx]}
              service={service}
            />
          ))}

          {/* Connection Network */}
          <ConnectionNetwork servicePositions={servicePositions} />
        </Canvas>
      </div>

      {/* Metrics Dashboard */}
      <MetricsDashboard />

      {/* Text Overlay */}
      <div className="phase-content relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="phase-subtitle">CONNECTED SYSTEMS</p>
          <h2 className="phase-title">Ecosystem Integration</h2>
          <p className="body-text mt-4 max-w-2xl mx-auto">
            Seamless integration across cloud services, databases, and infrastructure
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Phase4EcosystemIntegration;
