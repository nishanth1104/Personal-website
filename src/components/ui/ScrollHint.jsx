import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollHint({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="scroll-hint-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.div>

          <div className="scroll-hint-icon">
            <motion.div
              className="scroll-hint-wheel"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
