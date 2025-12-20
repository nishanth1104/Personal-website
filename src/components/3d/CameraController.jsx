import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHASE_CONFIG } from '../../config/phaseConfig';
import { ANIMATION_CONFIG } from '../../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

export default function CameraController({ scrollPercent }) {
  const { camera } = useThree();

  useEffect(() => {
    // Build camera path from phase config
    const cameraPath = [
      { scroll: 0, ...PHASE_CONFIG.PHASE_1 },
      { scroll: 0.15, ...PHASE_CONFIG.PHASE_2 },
      { scroll: 0.30, ...PHASE_CONFIG.PHASE_3 },
      { scroll: 0.50, ...PHASE_CONFIG.PHASE_4 },
      { scroll: 0.70, ...PHASE_CONFIG.PHASE_5 },
      { scroll: 0.85, ...PHASE_CONFIG.PHASE_6 },
    ];

    // Animate camera position based on scroll
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: ANIMATION_CONFIG.scrollScrub,
      }
    });

    // Add camera position keyframes
    cameraPath.forEach((point, index) => {
      if (index === 0) {
        // Set initial position
        camera.position.set(...point.cameraPosition);
        camera.lookAt(...point.cameraTarget);
      } else {
        // Animate to next position
        timeline.to(camera.position, {
          x: point.cameraPosition[0],
          y: point.cameraPosition[1],
          z: point.cameraPosition[2],
          duration: 1,
          ease: 'power2.inOut'
        }, point.scroll);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera]);

  return null;
}
