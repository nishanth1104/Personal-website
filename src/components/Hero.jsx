import { styles } from "../style";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      <div className={`container-custom w-full text-center relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="section-subtitle">AI ENGINEER & ML ARCHITECT</p>
          <h1 className="hero-text mt-6">
            NISHANTH
            <br />
            AYYALASOMAYAJULA
          </h1>
          <p className="body-large mt-12 max-w-4xl mx-auto">
            Building intelligent systems with neural networks, agentic AI, and cutting-edge machine learning
          </p>
        </motion.div>

        <motion.div
          className="flex gap-6 justify-center mt-16 flex-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <a
            href="https://github.com/nishanth1104/Personal-website/blob/master/src/assets/Nishanth_Ayyalasomayajula_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-primary">View Resume</button>
          </a>
          <a
            href="https://www.linkedin.com/in/a-nishanth"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-secondary">LinkedIn</button>
          </a>
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 float-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
