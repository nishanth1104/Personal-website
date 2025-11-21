import { motion } from "framer-motion";
import { styles } from "../style";
import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto flex flex-col justify-center items-center overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div
        className={`relative z-10 max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-neon-purple shadow-[0_0_20px_#bc13fe]' />
          <div className='w-1 sm:h-80 h-40 bg-gradient-to-b from-neon-purple to-transparent' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue animate-text neon-glow'>Nishanth</span>
          </h1>
          <div className={`${styles.heroSubText} mt-2 text-white-100 font-mono`}>
            <span className="text-neon-blue">{'>'}</span> 
            <Typewriter
              options={{
                strings: ['AI Engineer', 'ML Systems Architect', 'Full-Stack Builder'],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 75,
                wrapperClassName: "text-white-100 ml-2",
                cursorClassName: "text-neon-purple"
              }}
            />
          </div>
          <p className="mt-4 text-secondary max-w-lg text-[16px] lg:text-[18px] leading-[30px]">
            Building the future with <span className="text-neon-blue">Neural Networks</span> and <span className="text-neon-purple">Agentic Systems</span>.
          </p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-32 w-full flex justify-center gap-6 z-20"
      >
        <a href='https://github.com/nishanth1104/Personal-website/blob/master/src/assets/Nishanth_Ayyalasomayajula_Resume.pdf' target='_blank' rel='noopener noreferrer'>
          <button className='glass-panel text-white px-8 py-4 rounded-xl hover:bg-neon-purple/20 hover:shadow-[0_0_30px_rgba(188,19,254,0.6)] transition-all duration-300 font-bold tracking-wider border border-neon-purple/50 neon-glow'>
            RESUME
          </button>
        </a>
        <a href='https://www.linkedin.com/in/nishanth-ayyalasomayajula' target='_blank' rel='noopener noreferrer'>
          <button className='glass-panel text-white px-8 py-4 rounded-xl hover:bg-neon-blue/20 hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all duration-300 font-bold tracking-wider border border-neon-blue/50 neon-glow'>
            LINKEDIN
          </button>
        </a>
      </motion.div>

      <div className='absolute bottom-10 w-full flex justify-center items-center z-20'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
