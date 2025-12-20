import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../../config/colorPalette';
import { technologies } from '../../constants/constants';

export default function EngineeringSystem({ scrollPercent }) {
  const groupRef = useRef();

  // Scroll phases
  // 0-15%: Complete laptop/system
  // 15-35%: Disassembly - parts explode
  // 35-55%: Parts showcase - rotate and label
  // 55-70%: Reassembly - form architecture
  // 70-85%: Add layers (projects/experience)
  // 85-100%: Final reveal + metrics

  const phase = useMemo(() => {
    if (scrollPercent < 15) return 'complete';
    if (scrollPercent < 35) return 'disassembly';
    if (scrollPercent < 55) return 'showcase';
    if (scrollPercent < 70) return 'reassembly';
    if (scrollPercent < 85) return 'building';
    return 'final';
  }, [scrollPercent]);

  // Calculate progress within each phase
  const phaseProgress = useMemo(() => {
    if (scrollPercent < 15) return scrollPercent / 15;
    if (scrollPercent < 35) return (scrollPercent - 15) / 20;
    if (scrollPercent < 55) return (scrollPercent - 35) / 20;
    if (scrollPercent < 70) return (scrollPercent - 55) / 15;
    if (scrollPercent < 85) return (scrollPercent - 70) / 15;
    return (scrollPercent - 85) / 15;
  }, [scrollPercent]);

  // Create technology cubes based on constants
  const techCubes = useMemo(() => {
    return technologies.map((tech, i) => ({
      name: tech.name,
      color: tech.color || COLORS.oceanBlue,
      index: i,
      total: technologies.length
    }));
  }, []);

  // Animate
  useFrame(() => {
    if (groupRef.current && phase === 'complete') {
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {phase === 'complete' && <CompleteLaptop progress={phaseProgress} />}

      {(phase === 'disassembly' || phase === 'showcase') && (
        <DisassembledParts
          progress={phaseProgress}
          cubes={techCubes}
          phase={phase}
        />
      )}

      {(phase === 'reassembly' || phase === 'building' || phase === 'final') && (
        <ReassembledArchitecture
          progress={phaseProgress}
          cubes={techCubes}
          phase={phase}
        />
      )}
    </group>
  );
}

// Phase 1: Complete laptop/system (0-15%)
function CompleteLaptop({ progress }) {
  const laptopRef = useRef();

  useFrame(() => {
    if (laptopRef.current) {
      // Gentle rotation animation
      laptopRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={laptopRef} position={[0, 0, 0]}>
      {/* Laptop base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[5, 0.3, 3.5]} />
        <meshStandardMaterial
          color={COLORS.textPrimary}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Laptop screen */}
      <mesh position={[0, 2, -1.7]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[5, 3.2, 0.2]} />
        <meshStandardMaterial
          color={COLORS.textSecondary}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Screen display */}
      <mesh position={[0, 2, -1.6]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[4.6, 2.8]} />
        <meshStandardMaterial
          color={COLORS.oceanBlue}
          emissive={COLORS.skyBlue}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Keyboard indicator */}
      <mesh position={[0, 0.16, 0.3]}>
        <boxGeometry args={[3.5, 0.05, 2]} />
        <meshStandardMaterial
          color={COLORS.textMuted}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

// Phase 2 & 3: Disassembled parts (15-55%)
function DisassembledParts({ progress, cubes, phase }) {
  const isShowcase = phase === 'showcase';

  return (
    <group>
      {cubes.map((cube, i) => {
        // Arrange in a grid when disassembled
        const cols = 4;
        const row = Math.floor(i / cols);
        const col = i % cols;

        // Target position in grid
        const targetX = (col - cols / 2 + 0.5) * 3;
        const targetY = -(row - Math.floor(cubes.length / cols) / 2) * 3;
        const targetZ = 0;

        // Interpolate from center to grid position
        const x = THREE.MathUtils.lerp(0, targetX, progress);
        const y = THREE.MathUtils.lerp(0, targetY, progress);
        const z = THREE.MathUtils.lerp(0, targetZ, progress);

        return (
          <TechCube
            key={cube.name}
            position={[x, y, z]}
            color={cube.color}
            name={cube.name}
            showLabel={isShowcase}
            delay={i * 0.05}
          />
        );
      })}
    </group>
  );
}

// Phase 4-6: Reassembled architecture (55-100%)
function ReassembledArchitecture({ progress, cubes, phase }) {
  const isFinal = phase === 'final';

  return (
    <group>
      {cubes.map((cube, i) => {
        // Arrange in architectural layers/rings
        const layers = 3;
        const layer = Math.floor(i / (cubes.length / layers));
        const posInLayer = i % Math.ceil(cubes.length / layers);
        const totalInLayer = Math.ceil(cubes.length / layers);

        const angle = (posInLayer / totalInLayer) * Math.PI * 2;
        const radius = 3 + layer * 1.5;

        const targetX = Math.cos(angle) * radius;
        const targetY = layer * 2 - 2;
        const targetZ = Math.sin(angle) * radius;

        // Start from previous showcase positions
        const cols = 4;
        const row = Math.floor(i / cols);
        const col = i % cols;
        const startX = (col - cols / 2 + 0.5) * 3;
        const startY = -(row - Math.floor(cubes.length / cols) / 2) * 3;

        const x = THREE.MathUtils.lerp(startX, targetX, progress);
        const y = THREE.MathUtils.lerp(startY, targetY, progress);
        const z = THREE.MathUtils.lerp(0, targetZ, progress);

        return (
          <TechCube
            key={cube.name}
            position={[x, y, z]}
            color={cube.color}
            name={cube.name}
            showLabel={false}
            delay={i * 0.03}
            scale={isFinal ? 0.8 : 1}
          />
        );
      })}

      {/* Central core in final phase */}
      {isFinal && (
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color={COLORS.oceanBlue}
            metalness={0.8}
            roughness={0.2}
            emissive={COLORS.skyBlue}
            emissiveIntensity={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

// Individual technology cube component
function TechCube({ position, color, name, showLabel, delay = 0, scale = 1 }) {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1;

      // Rotate when showcasing
      if (showLabel) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      }
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow scale={scale}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Edge wireframe for tech look */}
      <lineSegments position={[position[0], position[1], position[2]]}>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1.2, 1.2, 1.2)]} />
        <lineBasicMaterial attach="material" color={color} opacity={0.3} transparent />
      </lineSegments>
    </group>
  );
}
