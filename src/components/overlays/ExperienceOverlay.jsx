import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../constants/constants';

export default function ExperienceOverlay({ visible, progress }) {
  // Fade in as infrastructure appears (progress 0.5-1.0)
  const opacity = Math.max(0, Math.min(1, (progress - 0.5) / 0.5));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="overlay-section experience-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="experience-content">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: progress > 0.2 ? 1 : 0, y: progress > 0.2 ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              Experience
            </motion.h2>

            <motion.p
              className="section-description"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: progress > 0.3 ? 1 : 0, y: progress > 0.3 ? 0 : 15 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Building production-ready systems in the real world
            </motion.p>

            <motion.div
              className="experience-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 0.4 ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company_name}
                  className="experience-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: progress > 0.4 + i * 0.15 ? 1 : 0,
                    x: progress > 0.4 + i * 0.15 ? 0 : -20
                  }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="exp-header">
                    <h3>{exp.title}</h3>
                    <span className="exp-date">{exp.date}</span>
                  </div>
                  <h4>{exp.company_name}</h4>
                  <ul>
                    {exp.points.slice(0, 2).map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
