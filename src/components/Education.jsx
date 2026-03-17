import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from './ui/ScrollReveal'
import SectionLabel from './ui/SectionLabel'
import TextReveal from './ui/TextReveal'
import FloatingTags from './ui/FloatingTags'
import styles from './styles/education.module.css'
import { educations } from '../constants/constants'

const FLOATING = [
  { label: 'GPA',             left: '5%',  top: '20%', delay: 0.4 },
  { label: 'Publications',    left: '78%', top: '10%', delay: 0.7 },
  { label: 'MATLAB',          left: '82%', top: '70%', delay: 0.3 },
  { label: 'EEE',             left: '8%',  top: '80%', delay: 0.9 },
  { label: 'Machine Learning',left: '88%', top: '42%', delay: 0.6 },
]

const RAIL_DURATION = 1.2

export default function Education() {
  const wrapRef    = useRef(null)
  const wrapInView = useInView(wrapRef, { once: true, margin: '-80px' })

  return (
    <section
      id="education"
      className={styles.section}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <FloatingTags tags={FLOATING} />

      <div className={styles.container}>
        <ScrollReveal>
          <SectionLabel index={4} label="Education" />
          <TextReveal>
            <h2 className={styles.heading}>Academic Journey</h2>
          </TextReveal>
        </ScrollReveal>

        {/* Desktop: horizontal rail */}
        <div className={styles.timelineWrap} aria-label="Education timeline" ref={wrapRef}>
          {/* Animated rail */}
          <motion.div
            className={styles.rail}
            initial={{ scaleX: 0 }}
            animate={wrapInView ? { scaleX: 1 } : {}}
            transition={{ duration: RAIL_DURATION, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
            aria-hidden="true"
          />

          <div className={styles.nodesRow}>
            {educations.map((edu, i) => (
              <div
                key={edu.company_name}
                className={`${styles.nodeCol} ${i % 2 === 0 ? styles.top : styles.bottom}`}
              >
                {/* Card */}
                <ScrollReveal delay={RAIL_DURATION + i * 0.15}>
                  <div className={styles.card}>
                    <div className={styles.logoWrap}>
                      <img src={edu.icon} alt={edu.company_name} className={styles.logo} />
                    </div>
                    <p className={styles.date}>{edu.date}</p>
                    <h3 className={styles.degree}>{edu.title}</h3>
                    <p className={styles.school}>{edu.company_name}</p>
                    <ul className={styles.points}>
                      {edu.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Dot — springs in after rail */}
                <motion.div
                  className={styles.dot}
                  initial={{ scale: 0 }}
                  animate={wrapInView ? { scale: 1 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 18,
                    delay: RAIL_DURATION + i * 0.15,
                  }}
                  aria-hidden="true"
                >
                  <div className={styles.dotInner} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className={styles.verticalTimeline}>
          {educations.map((edu, i) => (
            <ScrollReveal key={`m-${edu.company_name}`} delay={i * 0.15}>
              <div className={styles.vertCard}>
                <div className={styles.vertDot} aria-hidden="true" />
                <div className={styles.vertContent}>
                  <div className={styles.logoWrap}>
                    <img src={edu.icon} alt={edu.company_name} className={styles.logo} />
                  </div>
                  <p className={styles.date}>{edu.date}</p>
                  <h3 className={styles.degree}>{edu.title}</h3>
                  <p className={styles.school}>{edu.company_name}</p>
                  <ul className={styles.points}>
                    {edu.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
