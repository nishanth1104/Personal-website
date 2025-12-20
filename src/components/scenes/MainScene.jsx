import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { COLORS } from '../../config/colorPalette';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import EngineeringSystem from '../3d/EngineeringSystem';
import CameraRig from '../3d/CameraRig';

export default function MainScene() {
  const { scrollPercent } = useScrollProgress();

  return (
    <div className="canvas-container">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={[COLORS.lightGray]} />
        <fog attach="fog" args={[COLORS.softGray, 20, 60]} />

        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={[0, 3, 12]}
            fov={50}
            near={0.1}
            far={100}
          />

          {/* Lighting - Bright & Clean */}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            color="#FFFFFF"
          />
          <directionalLight
            position={[-10, -10, -5]}
            intensity={0.6}
            color="#FFFFFF"
          />
          <pointLight
            position={[0, 5, 5]}
            intensity={0.8}
            color={COLORS.skyBlue}
          />

          {/* Environment */}
          <Environment preset="city" />

          {/* Main scroll-driven engineering system */}
          <EngineeringSystem scrollPercent={scrollPercent} />

          {/* Camera animations following scroll */}
          <CameraRig scrollPercent={scrollPercent} />
        </Suspense>
      </Canvas>
    </div>
  );
}
