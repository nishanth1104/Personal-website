import { useRef } from 'react';
import { Box, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { COLORS } from '../../config/colorPalette';
import { projects, technologies, educations } from '../../constants/constants';

export default function Phase6MetricsDashboard({ visible, progress }) {
  const groupRef = useRef();

  // Metrics data
  const metrics = [
    { label: 'Projects', value: projects.length, color: COLORS.neuralPurple },
    { label: 'Technologies', value: technologies.length, color: COLORS.electricCyan },
    { label: 'Years Exp', value: 2, color: COLORS.quantumGreen },
    { label: 'Accuracy', value: '98.5%', color: COLORS.accentGold },
  ];

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {/* Metric cards in a grid */}
      {metrics.map((metric, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const x = (col - 0.5) * 5;
        const y = (0.5 - row) * 3;

        const cardProgress = Math.max(0, Math.min(1, (progress - i * 0.15) / 0.85));

        return (
          <group key={metric.label} position={[x, y, 0]}>
            {/* Card background */}
            <Box
              args={[4, 2.5, 0.1]}
              scale={cardProgress}
            >
              <meshPhysicalMaterial
                color={metric.color}
                emissive={metric.color}
                emissiveIntensity={0.2 * cardProgress}
                transmission={0.1}
                thickness={0.5}
                roughness={0.2}
                metalness={0.8}
              />
            </Box>

            {/* Metric value */}
            <Text
              position={[0, 0.4, 0.1]}
              fontSize={0.8}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor={metric.color}
            >
              {typeof metric.value === 'number' ? metric.value.toString() : metric.value}
            </Text>

            {/* Metric label */}
            <Text
              position={[0, -0.6, 0.1]}
              fontSize={0.25}
              color="#9CA3AF"
              anchorX="center"
              anchorY="middle"
            >
              {metric.label}
            </Text>

            {/* Card glow */}
            <pointLight
              position={[0, 0, 0.5]}
              intensity={0.8 * cardProgress}
              distance={4}
              color={metric.color}
            />
          </group>
        );
      })}

      {/* Background ambient glow */}
      <pointLight position={[0, 0, -5]} intensity={1.5 * progress} distance={30} color="#A855F7" />
    </group>
  );
}
