import { motion, AnimatePresence } from 'framer-motion';

export default function ContactOverlay({ visible, progress }) {
  // Appears in Phase 6
  const opacity = Math.max(0, Math.min(1, progress));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="overlay-section contact-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-content">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: progress > 0.2 ? 1 : 0, y: progress > 0.2 ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              Impact Metrics
            </motion.h2>

            <motion.p
              className="section-description"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: progress > 0.3 ? 1 : 0, y: progress > 0.3 ? 0 : 15 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Real-world AI deployment performance
            </motion.p>

            <motion.div
              className="contact-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: progress > 0.7 ? 1 : 0, y: progress > 0.7 ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3>Let's Build Something Amazing</h3>
              <p>Ready to deploy AI at scale?</p>

              <div className="contact-links">
                <a
                  href="mailto:nayyalasomayaj@fsu.edu"
                  className="contact-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email
                </a>
                <a
                  href="https://linkedin.com/in/nishanth-ayyalasomayajula"
                  className="contact-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/nishanth1104"
                  className="contact-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
