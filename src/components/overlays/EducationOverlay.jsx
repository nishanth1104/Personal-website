import { motion, AnimatePresence } from 'framer-motion';
import { educations } from '../../constants/constants';

export default function EducationOverlay({ visible, progress }) {
  // Part of Phase 6, fade in gradually
  const opacity = Math.max(0, Math.min(1, progress));

  return (
    <AnimatePresence>
      {visible && progress > 0.3 && (
        <motion.div
          className="overlay-section education-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity * 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'fixed', bottom: '20%', right: '5%', maxWidth: '400px' }}
        >
          <div className="education-content">
            <motion.h3
              className="section-subtitle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: progress > 0.4 ? 1 : 0, x: progress > 0.4 ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              Education
            </motion.h3>

            {educations.map((edu, i) => (
              <motion.div
                key={edu.company_name}
                className="edu-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: progress > 0.5 + i * 0.1 ? 1 : 0,
                  x: progress > 0.5 + i * 0.1 ? 0 : 20
                }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h4>{edu.title}</h4>
                <p className="edu-school">{edu.company_name}</p>
                <p className="edu-date">{edu.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
