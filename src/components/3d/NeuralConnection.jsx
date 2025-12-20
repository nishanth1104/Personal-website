import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../../config/colorPalette';
import { dataFlowVertexShader, dataFlowFragmentShader } from '../../shaders/dataFlowShader';

export default function NeuralConnection({
  start,
  end,
  progress = 1,
  dataFlowActive = false,
  delay = 0
}) {
  const lineRef = useRef();
  const materialRef = useRef();

  // Adjust progress with delay
  const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));

  const { geometry, startColor, endColor } = useMemo(() => {
    // Create line geometry
    const points = [
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Add UVs for shader
    const uvs = new Float32Array([0, 0, 1, 1]);
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    return {
      geometry,
      startColor: new THREE.Color(COLORS.electricCyan),
      endColor: new THREE.Color(COLORS.neuralPurple)
    };
  }, [start, end]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uProgress.value = adjustedProgress;
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={dataFlowVertexShader}
        fragmentShader={dataFlowFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uStartColor: { value: startColor },
          uEndColor: { value: endColor },
          uProgress: { value: adjustedProgress }
        }}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}
