import { motion } from 'framer-motion';
import { PHASE_CONFIG } from '../../config/phaseConfig';

export default function PhaseIndicator({ currentPhase, scrollPercent }) {
  const phases = Object.values(PHASE_CONFIG);

  return (
    <div className="phase-indicator">
      {phases.map((phase, index) => {
        const isActive = scrollPercent >= phase.scrollStart && scrollPercent < phase.scrollEnd;
        const isCompleted = scrollPercent >= phase.scrollEnd;

        return (
          <div key={phase.name} className="phase-dot-container">
            <motion.div
              className={`phase-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              animate={{
                scale: isActive ? 1.5 : 1,
                opacity: isActive ? 1 : isCompleted ? 0.6 : 0.3
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="phase-label"
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -10
              }}
              transition={{ duration: 0.3 }}
            >
              {phase.name}
            </motion.div>

            {index < phases.length - 1 && (
              <div className="phase-connector">
                <motion.div
                  className="phase-connector-fill"
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: isCompleted ? 1 : 0
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
