import { useRef } from 'react';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { COLORS } from '../../config/colorPalette';

export default function NeuralNode({ position, progress = 1, delay = 0, layer = 0 }) {
  const meshRef = useRef();

  // Adjust progress with delay
  const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));

  // Layer-based colors
  const layerColors = [
    COLORS.electricCyan,
    COLORS.neuralPurple,
    COLORS.neuralPurple,
    COLORS.quantumGreen
  ];
  const nodeColor = layerColors[layer % layerColors.length];

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Pulsing animation
      const pulse = Math.sin(clock.getElapsedTime() * 2 + delay * 10) * 0.2 + 1;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.4, 16, 16]} scale={adjustedProgress}>
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>

      {/* Node glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1 * adjustedProgress}
        distance={3}
        color={nodeColor}
      />
    </group>
  );
}
