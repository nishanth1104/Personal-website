import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../constants/constants';

export default function ProjectsOverlay({ visible, progress }) {
  // Fade in as network forms (progress 0.6-1.0)
  const opacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.4));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="overlay-section projects-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="projects-content">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: progress > 0.2 ? 1 : 0, y: progress > 0.2 ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              Projects
            </motion.h2>

            <motion.p
              className="section-description"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: progress > 0.3 ? 1 : 0, y: progress > 0.3 ? 0 : 15 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Assembling technologies into meaningful solutions
            </motion.p>

            <motion.div
              className="project-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 0.4 ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {projects.slice(0, 3).map((project, i) => (
                <motion.div
                  key={project.name}
                  className="project-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: progress > 0.4 + i * 0.1 ? 1 : 0,
                    y: progress > 0.4 + i * 0.1 ? 0 : 20
                  }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3>{project.name}</h3>
                  <p>{project.description.substring(0, 80)}...</p>
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag.name} className="tag">{tag.name}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
