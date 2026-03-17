import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from './ui/ScrollReveal'
import SectionLabel from './ui/SectionLabel'
import TextReveal from './ui/TextReveal'
import FloatingTags from './ui/FloatingTags'
import styles from './styles/experience.module.css'
import { experiences } from '../constants/constants'

const FLOATING = [
  { label: 'FSU',        left: '6%',  top: '18%', delay: 0.5 },
  { label: 'CBIT',       left: '80%', top: '12%', delay: 0.3 },
  { label: 'M.S.',       left: '85%', top: '60%', delay: 0.8 },
  { label: 'Research',   left: '5%',  top: '72%', delay: 0.2 },
  { label: 'NLP',        left: '90%', top: '35%', delay: 1.0 },
  { label: 'Agentic AI', left: '20%', top: '90%', delay: 0.6 },
]

const bulletVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const bulletItem = {
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

function ExperienceCard({ exp, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.logoSide}>
        <div className={styles.logoRing}>
          <img src={exp.icon} alt={exp.company_name} className={styles.logo} />
        </div>
      </div>

      <div className={styles.content}>
        <span className={styles.roleBadge}>
          {exp.title.split(' in ')[0].trim()}
        </span>
        <h3 className={styles.degree}>{exp.title}</h3>
        <div className={styles.meta}>
          <span className={styles.institution}>{exp.company_name}</span>
          <span className={styles.sep}>·</span>
          <span className={styles.date}>{exp.date}</span>
        </div>

        <motion.ul
          className={styles.points}
          variants={bulletVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {exp.points.map((pt, i) => (
            <motion.li key={i} className={styles.point} variants={bulletItem}>
              <span className={styles.bullet} aria-hidden="true">▸</span>
              {pt}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const stackRef    = useRef(null)
  const stackInView = useInView(stackRef, { once: true, margin: '-80px' })

  return (
    <section
      id="experience"
      className={styles.section}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <FloatingTags tags={FLOATING} />

      <div className={styles.container}>
        <ScrollReveal>
          <SectionLabel index={3} label="Experience" />
          <TextReveal>
            <h2 className={styles.heading}>Education & Background</h2>
          </TextReveal>
        </ScrollReveal>

        <div className={styles.stackWrap} ref={stackRef}>
          {/* Animated vertical timeline line */}
          <motion.div
            className={styles.timelineLine}
            initial={{ height: 0 }}
            animate={stackInView ? { height: '100%' } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <div className={styles.stack}>
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company_name} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
