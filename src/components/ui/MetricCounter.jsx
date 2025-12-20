import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';

export default function MetricCounter({
  label,
  value,
  suffix = '',
  decimals = 0,
  color = '#00F5FF'
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const springValue = useSpring(0, {
    damping: 20,
    stiffness: 50
  });

  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      springValue.set(typeof value === 'number' ? value : parseFloat(value) || 0);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest.toFixed(decimals));
    });

    return unsubscribe;
  }, [springValue, decimals]);

  return (
    <motion.div
      ref={ref}
      className="metric-counter"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="metric-value" style={{ color }}>
        {displayValue}{suffix}
      </div>
      <div className="metric-label">{label}</div>

      <motion.div
        className="metric-glow"
        style={{ backgroundColor: color }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
}
