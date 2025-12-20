import { motion, AnimatePresence } from 'framer-motion';

export default function SkillsOverlay({ visible, progress }) {
  // Fade in as cubes arrange in grid (progress 0.5-1.0)
  const opacity = Math.max(0, Math.min(1, (progress - 0.5) / 0.5));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="overlay-section skills-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="skills-content">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: progress > 0.6 ? 1 : 0, y: progress > 0.6 ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              Tech Stack
            </motion.h2>

            <motion.p
              className="section-description"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: progress > 0.7 ? 1 : 0, y: progress > 0.7 ? 0 : 15 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Breaking down the system into its core technologies
            </motion.p>

            <motion.div
              className="skill-categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 0.8 ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="category">
                <div className="category-dot" style={{ backgroundColor: '#60A5FA' }}></div>
                <span>Frontend Development</span>
              </div>
              <div className="category">
                <div className="category-dot" style={{ backgroundColor: '#34D399' }}></div>
                <span>Backend & APIs</span>
              </div>
              <div className="category">
                <div className="category-dot" style={{ backgroundColor: '#A78BFA' }}></div>
                <span>Databases</span>
              </div>
              <div className="category">
                <div className="category-dot" style={{ backgroundColor: '#F87171' }}></div>
                <span>DevOps & Tools</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
