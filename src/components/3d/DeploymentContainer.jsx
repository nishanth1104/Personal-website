import { useRef } from 'react';
import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../../config/colorPalette';
import { glassMorphVertexShader, glassMorphFragmentShader } from '../../shaders/glassMorphShader';

export default function DeploymentContainer({ progress = 1 }) {
  const containerRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (containerRef.current) {
      // Gentle rotation
      containerRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uOpacity.value = progress * 0.3;
    }
  });

  return (
    <group>
      {/* Main container box */}
      <Box
        ref={containerRef}
        args={[16, 12, 16]}
        scale={progress}
      >
        <shaderMaterial
          ref={materialRef}
          vertexShader={glassMorphVertexShader}
          fragmentShader={glassMorphFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(COLORS.quantumGreen) },
            uOpacity: { value: progress * 0.3 }
          }}
          transparent
          side={THREE.DoubleSide}
        />
      </Box>

      {/* Corner nodes */}
      {[
        [-8, -6, -8], [8, -6, -8], [-8, -6, 8], [8, -6, 8],
        [-8, 6, -8], [8, 6, -8], [-8, 6, 8], [8, 6, 8],
      ].map((pos, i) => (
        <Box
          key={i}
          args={[0.5, 0.5, 0.5]}
          position={pos}
          scale={progress}
        >
          <meshStandardMaterial
            color={COLORS.quantumGreen}
            emissive={COLORS.quantumGreen}
            emissiveIntensity={1}
          />
          <pointLight
            position={[0, 0, 0]}
            intensity={0.5 * progress}
            distance={3}
            color={COLORS.quantumGreen}
          />
        </Box>
      ))}

      {/* Edge glow lights */}
      <pointLight position={[0, 7, 0]} intensity={1 * progress} distance={20} color={COLORS.quantumGreen} />
      <pointLight position={[0, -7, 0]} intensity={1 * progress} distance={20} color={COLORS.quantumGreen} />
    </group>
  );
}
