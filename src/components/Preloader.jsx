import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Animate counter from 0 to 100
    gsap.to({ value: 0 }, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: function() {
        setCounter(Math.floor(this.targets()[0].value));
      },
      onComplete: () => {
        // Wait a moment then fade out
        setTimeout(() => {
          gsap.to('.preloader', {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
        }, 300);
      }
    });
  }, [onComplete]);

  return (
    <motion.div 
      className="preloader"
      initial={{ opacity: 1 }}
    >
      <div className="preloader-counter">
        {counter}%
      </div>
      <div className="preloader-text">
        INITIALIZING AI SYSTEMS
      </div>
    </motion.div>
  );
};

export default Preloader;
