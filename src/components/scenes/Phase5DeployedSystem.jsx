import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import DeploymentContainer from '../3d/DeploymentContainer';
import Phase4Infrastructure from './Phase4Infrastructure';

export default function Phase5DeployedSystem({ visible, progress }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow rotation to showcase the system
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  if (!visible) return null;

  // Animation phases:
  // 0.0-0.4: Infrastructure remains visible
  // 0.4-0.7: Container forms around it
  // 0.7-1.0: System stabilizes

  const infrastructureProgress = Math.min(1, progress * 1.2); // Slight overlap
  const containerProgress = Math.max(0, Math.min(1, (progress - 0.4) / 0.3));

  return (
    <group ref={groupRef}>
      {/* Infrastructure inside container */}
      <Phase4Infrastructure
        visible={true}
        progress={infrastructureProgress}
      />

      {/* Deployment container */}
      {containerProgress > 0 && (
        <DeploymentContainer progress={containerProgress} />
      )}

      {/* Production environment lighting */}
      <ambientLight intensity={0.3 * progress} />
      <pointLight position={[0, 20, 20]} intensity={2 * progress} distance={50} color="#10B981" />
    </group>
  );
}
