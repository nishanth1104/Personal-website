import { useRef } from 'react';
import { RoundedBox, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function MLComponentCube({
  position,
  scale = 1,
  rotation,
  label,
  color,
  progress = 1
}) {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle hover animation
      const hoverOffset = Math.sin(clock.getElapsedTime() + position[0]) * 0.1;
      meshRef.current.position.y = position[1] + hoverOffset * progress;
    }

    // Keep text facing camera
    if (textRef.current) {
      textRef.current.lookAt(0, 0, 10);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <RoundedBox
        ref={meshRef}
        args={[1, 1, 1]}
        radius={0.05}
        smoothness={4}
        position={position}
        scale={scale}
        rotation={rotation}
      >
        <meshPhysicalMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          transmission={0.1}
          thickness={0.5}
          emissive={color}
          emissiveIntensity={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      <Text
        ref={textRef}
        position={[position[0], position[1], position[2] + 0.6]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.8}
      >
        {label}
      </Text>

      {/* Glow point light */}
      <pointLight
        position={position}
        intensity={0.5 * progress}
        distance={2}
        color={color}
      />
    </group>
  );
}
