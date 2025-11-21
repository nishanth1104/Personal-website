import { useEffect, useState } from 'react';

const useScrollPhase = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate overall scroll progress
      const totalScrollable = documentHeight - windowHeight;
      const progress = (scrollPosition / totalScrollable) * 100;
      setScrollProgress(progress);

      // Determine current phase based on scroll position
      // Each phase takes up 20% of the total scroll (5 phases)
      const phaseNumber = Math.min(Math.floor((progress / 100) * 5) + 1, 5);
      setCurrentPhase(phaseNumber);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { currentPhase, scrollProgress };
};

export default useScrollPhase;
