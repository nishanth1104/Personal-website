import { useRef } from 'react';
import { Torus, Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../../config/colorPalette';

export default function InfrastructureLayer({ progress = 1, type = 'api-ring', position = [0, 0, 0] }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Rotation based on type
      if (type === 'api-ring') {
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      } else {
        meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
      }
    }
  });

  if (type === 'api-ring') {
    return (
      <group position={position}>
        <Torus
          ref={meshRef}
          args={[8, 0.1, 16, 32]}
          scale={progress}
        >
          <meshStandardMaterial
            color={COLORS.quantumGreen}
            emissive={COLORS.quantumGreen}
            emissiveIntensity={0.5}
            wireframe
          />
        </Torus>

        {/* Nodes on ring */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 8;
          const z = Math.sin(angle) * 8;

          return (
            <Box
              key={i}
              args={[0.3, 0.3, 0.3]}
              position={[x, 0, z]}
              scale={progress}
            >
              <meshStandardMaterial
                color={COLORS.quantumGreen}
                emissive={COLORS.quantumGreen}
                emissiveIntensity={0.8}
              />
            </Box>
          );
        })}
      </group>
    );
  }

  // Monitoring panel
  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[3, 2, 0.1]}
        scale={progress}
      >
        <meshPhysicalMaterial
          color={COLORS.neuralPurple}
          emissive={COLORS.neuralPurple}
          emissiveIntensity={0.3}
          transmission={0.5}
          thickness={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      {/* Panel grid lines */}
      <lineSegments scale={progress}>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(3, 2, 0.1)]} />
        <lineBasicMaterial attach="material" color={COLORS.electricCyan} />
      </lineSegments>
    </group>
  );
}
