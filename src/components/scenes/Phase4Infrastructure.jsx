import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import InfrastructureLayer from '../3d/InfrastructureLayer';
import Phase3NeuralNetwork from './Phase3NeuralNetwork';

export default function Phase4Infrastructure({ visible, progress }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow rotation of entire infrastructure
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  if (!visible) return null;

  // Animation phases:
  // 0.0-0.3: Network remains visible
  // 0.3-0.6: API rings appear
  // 0.6-1.0: Monitoring panels appear

  const networkProgress = Math.max(0, 1 - progress * 0.5); // Fade network slowly
  const apiRingProgress = Math.max(0, Math.min(1, (progress - 0.3) / 0.3));
  const monitoringProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.4));

  return (
    <group ref={groupRef}>
      {/* Keep neural network visible but fading */}
      <Phase3NeuralNetwork
        visible={true}
        progress={1}
        dataFlowActive={progress > 0.5}
      />

      {/* API Ring (horizontal) */}
      <InfrastructureLayer
        type="api-ring"
        position={[0, 0, 0]}
        progress={apiRingProgress}
      />

      {/* API Ring (vertical) */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <InfrastructureLayer
          type="api-ring"
          position={[0, 0, 0]}
          progress={apiRingProgress}
        />
      </group>

      {/* Monitoring Panels (4 cardinal directions) */}
      {monitoringProgress > 0 && [
        { position: [10, 0, 0], rotation: [0, -Math.PI / 2, 0] },
        { position: [-10, 0, 0], rotation: [0, Math.PI / 2, 0] },
        { position: [0, 0, 10], rotation: [0, 0, 0] },
        { position: [0, 0, -10], rotation: [0, Math.PI, 0] },
      ].map((config, i) => (
        <group key={i} position={config.position} rotation={config.rotation}>
          <InfrastructureLayer
            type="monitoring-panel"
            position={[0, 0, 0]}
            progress={Math.max(0, Math.min(1, (monitoringProgress - i * 0.1) / 0.9))}
          />
        </group>
      ))}

      {/* Ambient infrastructure lighting */}
      <pointLight position={[0, 10, 0]} intensity={2 * progress} distance={30} color="#10B981" />
    </group>
  );
}
