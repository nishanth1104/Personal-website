import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import NeuralNode from '../3d/NeuralNode';
import NeuralConnection from '../3d/NeuralConnection';
import { ANIMATION_CONFIG, getResponsiveConfig } from '../../config/animationConfig';

export default function Phase3NeuralNetwork({ visible, progress, dataFlowActive = true }) {
  const groupRef = useRef();

  // Get responsive node count
  const responsiveConfig = getResponsiveConfig(window.innerWidth);
  const layers = responsiveConfig.networkNodes === 12 ? [3, 4, 4, 3] : [4, 6, 6, 4]; // Mobile vs Desktop

  // Define network architecture
  const networkStructure = useMemo(() => {
    const nodes = [];
    const connections = [];

    layers.forEach((count, layerIdx) => {
      const x = (layerIdx - 1.5) * 3; // Spread across X axis
      const ySpacing = 1.5;
      const yOffset = -(count - 1) * ySpacing / 2;

      for (let i = 0; i < count; i++) {
        const nodeId = `${layerIdx}-${i}`;
        nodes.push({
          id: nodeId,
          position: [x, yOffset + i * ySpacing, 0],
          layer: layerIdx,
        });

        // Create connections to previous layer
        if (layerIdx > 0) {
          const prevLayerCount = layers[layerIdx - 1];
          for (let j = 0; j < prevLayerCount; j++) {
            connections.push({
              from: `${layerIdx - 1}-${j}`,
              to: nodeId,
            });
          }
        }
      }
    });

    return { nodes, connections };
  }, [layers]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  if (!visible) return null;

  // Animation phases:
  // 0.0-0.5: Connections form
  // 0.5-1.0: Nodes appear

  return (
    <group ref={groupRef}>
      {/* Render connections first (behind nodes) */}
      {networkStructure.connections.map((conn, i) => {
        const fromNode = networkStructure.nodes.find(n => n.id === conn.from);
        const toNode = networkStructure.nodes.find(n => n.id === conn.to);

        const connectionProgress = Math.max(0, Math.min(1, progress / 0.5));

        return (
          <NeuralConnection
            key={`conn-${i}`}
            start={fromNode.position}
            end={toNode.position}
            progress={connectionProgress}
            dataFlowActive={dataFlowActive}
            delay={i * 0.01}
          />
        );
      })}

      {/* Render nodes */}
      {networkStructure.nodes.map((node, i) => {
        const nodeProgress = Math.max(0, Math.min(1, (progress - 0.5) / 0.5));

        return (
          <NeuralNode
            key={node.id}
            position={node.position}
            progress={nodeProgress}
            delay={i * 0.02}
            layer={node.layer}
          />
        );
      })}
    </group>
  );
}
