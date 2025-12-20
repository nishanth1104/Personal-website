import { useMemo } from 'react';
import MLComponentCube from '../3d/MLComponentCube';
import { technologies } from '../../constants/constants';
import { getCategoryColor } from '../../config/colorPalette';

export default function Phase2ComponentGrid({ visible, progress }) {
  // Create grid positions for cubes
  const gridLayout = useMemo(() => {
    const columns = 4;
    const spacing = 2;
    const offsetX = -(columns - 1) * spacing / 2;
    const offsetY = 2;

    return technologies.map((tech, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;

      return {
        ...tech,
        position: [
          offsetX + col * spacing,
          offsetY - row * spacing,
          0
        ],
        color: getCategoryColor(tech.name)
      };
    });
  }, []);

  if (!visible) return null;

  // Animation phases within progress:
  // 0.0 - 0.3: Cubes scale from 0 (explosion)
  // 0.3 - 0.7: Cubes move to grid positions
  // 0.7 - 1.0: Cubes rotate to show labels

  return (
    <group>
      {gridLayout.map((item, index) => {
        // Stagger the appearance
        const staggerDelay = index * 0.02;
        const adjustedProgress = Math.max(0, Math.min(1, (progress - staggerDelay) / (1 - staggerDelay)));

        // Scale animation (0-0.3 progress)
        const scaleProgress = Math.min(1, adjustedProgress / 0.3);
        const scale = scaleProgress;

        // Position animation (0.3-0.7 progress)
        const moveProgress = Math.max(0, Math.min(1, (adjustedProgress - 0.3) / 0.4));

        // Rotation animation (0.7-1.0 progress)
        const rotateProgress = Math.max(0, Math.min(1, (adjustedProgress - 0.7) / 0.3));
        const rotation = [0, rotateProgress * Math.PI * 0.25, 0];

        // Start from center, move to grid position
        const startPosition = [0, 0, 0];
        const currentPosition = [
          startPosition[0] + (item.position[0] - startPosition[0]) * moveProgress,
          startPosition[1] + (item.position[1] - startPosition[1]) * moveProgress,
          startPosition[2] + (item.position[2] - startPosition[2]) * moveProgress,
        ];

        return (
          <MLComponentCube
            key={item.name}
            position={currentPosition}
            scale={scale}
            rotation={rotation}
            label={item.name}
            color={item.color}
            progress={adjustedProgress}
          />
        );
      })}
    </group>
  );
}
