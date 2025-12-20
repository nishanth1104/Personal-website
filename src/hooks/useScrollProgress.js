import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const percent = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;

      setScrollY(currentScrollY);
      setScrollPercent(Math.min(Math.max(percent, 0), 100));
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');

      lastScrollY = currentScrollY;
    };

    // Initial call
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollPercent, scrollDirection };
};
