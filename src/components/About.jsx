import React from 'react'
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../style';
import { services } from '../constants/constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full p-[1px] rounded-[20px] shadow-card bg-gradient-to-b from-neon-blue to-neon-purple'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-black-200 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col hover:shadow-[0_0_30px_rgba(188,19,254,0.3)] transition-shadow duration-300'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-neon-blue`}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I am an <span className="text-neon-purple font-bold">AI Engineer</span> and <span className="text-neon-blue font-bold">Systems Architect</span> specializing in Large Language Models (LLMs) and Agentic AI. 
        Currently pursuing my M.S. in Information Technology at Florida State University, I build scalable, intelligent systems that solve real-world problems. 
        My expertise spans from training transformer models to deploying production-ready AI pipelines.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")