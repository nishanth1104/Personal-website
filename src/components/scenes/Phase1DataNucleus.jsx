import { useRef } from 'react';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import DataParticles from '../3d/DataParticles';
import { COLORS } from '../../config/colorPalette';
import { ANIMATION_CONFIG, getResponsiveConfig } from '../../config/animationConfig';

export default function Phase1DataNucleus({ visible, progress }) {
  const sphereRef = useRef();

  // Get responsive particle count
  const responsiveConfig = getResponsiveConfig(window.innerWidth);
  const particleCount = responsiveConfig.particleCount;

  // Sphere appears after particles converge (progress > 0.7)
  const sphereOpacity = Math.max(0, (progress - 0.7) / 0.3);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // Gentle pulsing animation
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.05 + 1;
      sphereRef.current.scale.set(pulse, pulse, pulse);

      // Slow rotation
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <group>
      {/* Particle System */}
      <DataParticles progress={progress} count={particleCount} />

      {/* Central Sphere (appears after convergence) */}
      <Sphere
        ref={sphereRef}
        args={[3, 64, 64]}
        visible={sphereOpacity > 0.01}
      >
        <meshPhysicalMaterial
          color={COLORS.electricCyan}
          emissive={COLORS.electricCyan}
          emissiveIntensity={0.5 * sphereOpacity}
          metalness={0.3}
          roughness={0.2}
          transmission={0.3}
          thickness={2}
          transparent
          opacity={sphereOpacity * 0.7}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>

      {/* Point light at center for glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2 * progress}
        distance={15}
        color={COLORS.electricCyan}
      />
    </group>
  );
}
