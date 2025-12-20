import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig({ scrollPercent }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    // Define camera positions for each phase
    let camPos, lookAt;

    if (scrollPercent < 15) {
      // Phase 1: Complete system - orbiting view
      camPos = new THREE.Vector3(0, 3, 12);
      lookAt = new THREE.Vector3(0, 0, 0);
    } else if (scrollPercent < 35) {
      // Phase 2: Disassembly - pull back
      const progress = (scrollPercent - 15) / 20;
      camPos = new THREE.Vector3(
        THREE.MathUtils.lerp(0, 0, progress),
        THREE.MathUtils.lerp(3, 5, progress),
        THREE.MathUtils.lerp(12, 18, progress)
      );
      lookAt = new THREE.Vector3(0, 0, 0);
    } else if (scrollPercent < 55) {
      // Phase 3: Showcase - top-down view
      const progress = (scrollPercent - 35) / 20;
      camPos = new THREE.Vector3(
        THREE.MathUtils.lerp(0, 0, progress),
        THREE.MathUtils.lerp(5, 12, progress),
        THREE.MathUtils.lerp(18, 12, progress)
      );
      lookAt = new THREE.Vector3(0, 0, 0);
    } else if (scrollPercent < 70) {
      // Phase 4: Reassembly - side angle
      const progress = (scrollPercent - 55) / 15;
      camPos = new THREE.Vector3(
        THREE.MathUtils.lerp(0, -8, progress),
        THREE.MathUtils.lerp(12, 6, progress),
        THREE.MathUtils.lerp(12, 12, progress)
      );
      lookAt = new THREE.Vector3(0, 2, 0);
    } else if (scrollPercent < 85) {
      // Phase 5: Building - circling view
      const progress = (scrollPercent - 70) / 15;
      const angle = progress * Math.PI * 0.5;
      camPos = new THREE.Vector3(
        Math.sin(angle) * 12,
        6,
        Math.cos(angle) * 12
      );
      lookAt = new THREE.Vector3(0, 2, 0);
    } else {
      // Phase 6: Final - front view
      const progress = (scrollPercent - 85) / 15;
      camPos = new THREE.Vector3(
        THREE.MathUtils.lerp(Math.sin((85 - 70) / 15 * Math.PI * 0.5) * 12, 0, progress),
        THREE.MathUtils.lerp(6, 4, progress),
        THREE.MathUtils.lerp(Math.cos((85 - 70) / 15 * Math.PI * 0.5) * 12, 15, progress)
      );
      lookAt = new THREE.Vector3(0, 1, 0);
    }

    // Smooth interpolation
    targetPosition.current.copy(camPos);
    targetLookAt.current.copy(lookAt);

    camera.position.lerp(targetPosition.current, 0.1);

    // Look at target with smooth transition
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);

    currentLookAt.lerp(targetLookAt.current, 0.1);
    camera.lookAt(currentLookAt);
  });

  return null;
}
