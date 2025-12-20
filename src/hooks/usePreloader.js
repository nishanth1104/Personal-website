import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export const usePreloader = () => {
  const { loaded, total, progress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Smooth progress updates
    const targetProgress = total > 0 ? (loaded / total) * 100 : 0;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.5) return targetProgress;
        return prev + diff * 0.1;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [loaded, total]);

  useEffect(() => {
    if (loadingProgress >= 99.5) {
      // Delay to show 100% briefly
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [loadingProgress]);

  return { isLoading, loadingProgress, progress };
};
