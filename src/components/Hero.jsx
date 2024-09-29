import { motion } from "framer-motion";
import { styles } from "../style";
import { Tilt } from 'react-tilt';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto flex flex-col justify-center items-center`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Nishanth Ayyalasomayajula</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            <Typewriter
              options={{
              strings: ['Graduate Student', 'Front-End Developer', 'Data Analyst'],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              delay: 75
              }}
            />
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 w-full flex justify-center mb-8">
  <div className="flex space-x-4">
    <Tilt options={{ scale: 1.05 }}>
      <motion.a href='src\assets\Nishanth Ayyalasomayajula Resume.pdf' target='_blank' rel='noopener noreferrer' whileHover={{ scale: 1.1 }}>
        <button className='bg-tertiary text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300' style={styles.button}>
          View/Download Resume
        </button>
      </motion.a>
    </Tilt>
    {/* LinkedIn Button */}
    <Tilt options={{ scale: 1.05 }}>
      <motion.a href='https://www.linkedin.com/in/nishanth-ayyalasomayajula' target='_blank' rel='noopener noreferrer' whileHover={{ scale: 1.1 }}>
        <button className='bg-tertiary text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300' style={styles.button}>
          LinkedIn Profile
        </button>
      </motion.a>
    </Tilt>
  </div>
</div>
    </section>
  );
};

export default Hero;
