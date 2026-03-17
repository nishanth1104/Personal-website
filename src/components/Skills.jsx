import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import ScrollReveal from './ui/ScrollReveal'
import SectionLabel from './ui/SectionLabel'
import TextReveal from './ui/TextReveal'
import FloatingTags from './ui/FloatingTags'
import styles from './styles/skills.module.css'
import { AIASSoC, AIS, mcphf } from '../assets'

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'Redux'],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['Python', 'FastAPI', 'Node.js', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
  {
    id: 'mlai',
    label: 'ML · AI',
    skills: ['PyTorch', 'LangChain', 'Transformers', 'RAG', 'OpenAI API', 'HuggingFace'],
  },
  {
    id: 'devops',
    label: 'DevOps',
    skills: ['Docker', 'Git', 'AWS', 'CI/CD', 'Linux', 'Vercel'],
  },
]

const CERTS = [
  {
    title: 'Salesforce AI Associate',
    issuer: 'Salesforce',
    image: AIASSoC,
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7279911497479200768/',
  },
  {
    title: 'Salesforce AI Specialist',
    issuer: 'Salesforce',
    image: AIS,
    link: 'https://www.linkedin.com/posts/nishanth-ayyalasomayajula_salesforceai-aispecialist-artificialintelligence-activity-7284666524378787840-_Rd0',
  },
  {
    title: 'HuggingFace MCP',
    issuer: 'HuggingFace',
    image: mcphf,
    link: 'https://raw.githubusercontent.com/nishanth1104/Personal-website/refs/heads/master/mcphf.webp',
  },
]

const FLOATING = [
  { label: 'JavaScript',  left: '5%',  top: '15%', delay: 0.3 },
  { label: 'Python',      left: '80%', top: '10%', delay: 0.7 },
  { label: 'REST',        left: '70%', top: '75%', delay: 0.5 },
  { label: 'CI/CD',       left: '8%',  top: '70%', delay: 1.0 },
  { label: 'Transformers',left: '85%', top: '45%', delay: 0.2 },
  { label: 'HuggingFace', left: '15%', top: '88%', delay: 0.8 },
]

function CountBadge({ target, inView, delay }) {
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, {
      duration: 1.2,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [inView, target, delay, count])

  return (
    <div
      style={{
        position: 'absolute',
        top: '0.75rem',
        right: '0.75rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        color: 'var(--color-text-dim)',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        padding: '0.15rem 0.45rem',
        borderRadius: '2px',
        letterSpacing: '0.04em',
      }}
    >
      {display} skills
    </div>
  )
}

function SkillCard({ id, label, skills, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, rotateX: 25, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, rotateX: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <CountBadge target={skills.length} inView={inView} delay={delay + 0.3} />
      <div className={styles.cardAccent} />
      <TextReveal>
        <h3 className={styles.cardTitle}>{label}</h3>
      </TextReveal>
      <ul className={styles.skillList}>
        {skills.map((s) => (
          <li key={s} className={styles.skillItem}>
            <span className={styles.dollar}>$</span> {s}
          </li>
        ))}
      </ul>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{
            width: inView ? '100%' : '0%',
            transition: `width 1.2s ease ${delay + 0.3}s`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      className={styles.section}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <FloatingTags tags={FLOATING} />

      <div className={styles.container}>
        <ScrollReveal>
          <SectionLabel index={1} label="Skills" />
          <TextReveal>
            <h2 className={styles.heading}>What I Build With</h2>
          </TextReveal>
        </ScrollReveal>

        <div className={styles.bentoGrid} style={{ perspective: '900px' }}>
          {CATEGORIES.map(({ id, label, skills }, i) => (
            <SkillCard key={id} id={id} label={label} skills={skills} delay={i * 0.1} />
          ))}
        </div>

        {/* Certifications */}
        <ScrollReveal delay={0.3}>
          <h3 className={styles.certsHeading}>Certifications</h3>
        </ScrollReveal>
        <div className={styles.certsRow}>
          {CERTS.map(({ title, issuer, image, link }, i) => (
            <ScrollReveal key={title} delay={0.1 * i}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certCard}
              >
                <div className={styles.certImgWrap}>
                  <img src={image} alt={title} className={styles.certImg} />
                </div>
                <div className={styles.certInfo}>
                  <p className={styles.certTitle}>{title}</p>
                  <p className={styles.certIssuer}>{issuer}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
