import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

export default function LoadingScreen({ onComplete }) {
  const { loaded, total } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Fallback timeout - complete after 3 seconds even if no assets
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      setDisplayProgress(100);
    }, 3000);

    return () => clearTimeout(fallbackTimeout);
  }, []);

  useEffect(() => {
    // Smooth progress animation
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        // If no assets, animate to 100 over time
        const target = total > 0 ? (loaded / total) * 100 : Math.min(prev + 2, 100);
        const diff = target - prev;
        if (Math.abs(diff) < 0.1) return target;
        return prev + diff * 0.1;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [loaded, total]);

  useEffect(() => {
    if (displayProgress >= 99.9) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => onComplete?.(), 800);
      }, 500);
    }
  }, [displayProgress, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="loading-content">
            <motion.div
              className="loading-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Loading Portfolio
            </motion.div>

            <div className="loading-progress-container">
              <motion.div
                className="loading-progress-bar"
                style={{ width: `${displayProgress}%` }}
              />
            </div>

            <motion.div
              className="loading-percentage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Math.floor(displayProgress)}%
            </motion.div>

            <motion.div
              className="loading-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {displayProgress < 30 && 'Loading components...'}
              {displayProgress >= 30 && displayProgress < 60 && 'Preparing experience...'}
              {displayProgress >= 60 && displayProgress < 90 && 'Almost ready...'}
              {displayProgress >= 90 && 'Welcome'}
            </motion.div>
          </div>

          {/* Particle background effect */}
          <div className="loading-particles">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="loading-particle"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0.8, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
