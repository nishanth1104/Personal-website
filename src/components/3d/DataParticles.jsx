import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../../config/colorPalette';
import { particleVertexShader, particleFragmentShader } from '../../shaders/particleShader';

export default function DataParticles({ progress = 0, count = 3000 }) {
  const pointsRef = useRef();
  const materialRef = useRef();

  const { positions, targetPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Initial: random distribution in large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 5 + Math.random() * 10;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Target: sphere surface (radius 3)
      const targetRadius = 3;
      targetPositions[i * 3] = targetRadius * Math.sin(phi) * Math.cos(theta);
      targetPositions[i * 3 + 1] = targetRadius * Math.sin(phi) * Math.sin(theta);
      targetPositions[i * 3 + 2] = targetRadius * Math.cos(phi);
    }

    return { positions, targetPositions };
  }, [count]);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('aTargetPosition', new THREE.Float32BufferAttribute(targetPositions, 3));
    geometry.setAttribute('aInitialPosition', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [positions, targetPositions]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uProgress.value = progress;
    }
  });

  return (
    <points ref={pointsRef} geometry={particleGeometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: progress },
          uColor: { value: new THREE.Color(COLORS.electricCyan) }
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
