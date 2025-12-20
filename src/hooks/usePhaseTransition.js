import { useState, useEffect, useRef } from 'react';
import { getPhaseFromScroll, getPhaseProgress } from '../config/phaseConfig';

export const usePhaseTransition = (scrollPercent) => {
  const [currentPhase, setCurrentPhase] = useState(null);
  const [previousPhase, setPreviousPhase] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeout = useRef(null);

  useEffect(() => {
    const phase = getPhaseFromScroll(scrollPercent);

    if (phase && (!currentPhase || phase.key !== currentPhase.key)) {
      setPreviousPhase(currentPhase);
      setCurrentPhase(phase);
      setIsTransitioning(true);

      // Clear existing timeout
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }

      // End transition after animation duration
      transitionTimeout.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }

    return () => {
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }
    };
  }, [scrollPercent, currentPhase]);

  const phaseProgress = currentPhase ? getPhaseProgress(scrollPercent, currentPhase) : 0;

  return {
    currentPhase,
    previousPhase,
    isTransitioning,
    phaseProgress,
  };
};
