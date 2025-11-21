import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTour } from './TourGuide';

const MiniBot = () => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const { isTourActive, botTarget, startTour } = useTour();
  const [showChat, setShowChat] = useState(false);

  // Random movement logic
  useEffect(() => {
    if (isTourActive && botTarget) {
      // Move to target
      controls.start({
        x: botTarget.x - window.innerWidth / 2, // Simplified centering logic
        y: botTarget.y - window.scrollY - window.innerHeight / 2,
        transition: { duration: 1.5, ease: "easeInOut" }
      });
    } else if (!isTourActive) {
      // Random float
      const moveBot = async () => {
        while (true) {
          if (isTourActive) break;
          await controls.start({
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            transition: { duration: 3 + Math.random() * 2, ease: "easeInOut" }
          });
        }
      };
      moveBot();
    }
  }, [controls, isTourActive, botTarget]);

  return (
    <div className="fixed bottom-10 left-10 z-50 flex items-end gap-4">
       {/* Chat Bubble */}
       {showChat && !isTourActive && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white text-black p-4 rounded-t-2xl rounded-br-2xl mb-4 w-64 shadow-lg border-2 border-neon-blue"
        >
          <p className="text-sm font-medium">Hi! I'm Nishanth's AI Assistant. I know everything about his work.</p>
          <button 
            onClick={() => { setShowChat(false); startTour(); }}
            className="mt-2 bg-neon-purple text-white text-xs px-3 py-1 rounded-full hover:bg-purple-600 transition"
          >
            Take a Tour
          </button>
        </motion.div>
      )}

      <motion.div
        className="cursor-pointer"
        animate={controls}
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowChat(!showChat)}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Lock drag for now to avoid issues
      >
        <div className={`w-20 h-20 rounded-full bg-black-200 border-2 border-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.5)] flex items-center justify-center relative ${isHovered ? 'animate-pulse' : ''}`}>
          {/* Bot Face */}
          <div className="w-12 h-8 bg-black-100 rounded-lg flex justify-around items-center border border-gray-700 overflow-hidden relative">
             <div className="absolute inset-0 bg-neon-blue/10 animate-scan"></div>
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-ping delay-75"></div>
          </div>
          {/* Antenna */}
          <div className="absolute -top-4 w-1 h-4 bg-neon-purple"></div>
          <div className="absolute -top-5 w-3 h-3 bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff] animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default MiniBot;
