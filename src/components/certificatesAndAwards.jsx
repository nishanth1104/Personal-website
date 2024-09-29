import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../style';
import { certificatesAndAwards } from '../constants/constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const CertificateCard = ({ index, title, icon, link, description }) => {
  const handleClick = () => {
    window.open(link, '_blank'); 
  };

  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const CertificatesAndAwards = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Certificates and Awards</p>
        <h2 className={styles.sectionHeadText}>Recognition and Achievements</h2>
      </motion.div>
      <motion.div variants={fadeIn("", "", 0.1, 1)} className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
        <p>
          Here you can find some of the certificates and awards I've received throughout my career. Each one represents a milestone and a testament to my dedication and expertise.
        </p>
      </motion.div>
      <div className='mt-20 flex flex-wrap gap-10'>
        {certificatesAndAwards.map((certificate, index) => (
          <CertificateCard key={certificate.title} index={index} {...certificate} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(CertificatesAndAwards, "certificatesAndAwards");
