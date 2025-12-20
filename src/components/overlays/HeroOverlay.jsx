import { motion, AnimatePresence } from 'framer-motion';

export default function HeroOverlay({ visible, progress }) {
  // Fade in at start, fade out near end
  const opacity = progress < 0.8 ? progress * 1.25 : (1 - progress) * 5;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="overlay-section hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: Math.min(opacity, 1) }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: progress > 0.2 ? 1 : 0, y: progress > 0.2 ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="hero-first-name">NISHANTH</span>
              <span className="hero-last-name">AYYALASOMAYAJULA</span>
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: progress > 0.4 ? 1 : 0, y: progress > 0.4 ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack Engineer
            </motion.p>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: progress > 0.6 ? 1 : 0, y: progress > 0.6 ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Building elegant solutions with modern technology
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
