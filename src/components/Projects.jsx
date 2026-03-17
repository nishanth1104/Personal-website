import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import ScrollReveal from './ui/ScrollReveal'
import SectionLabel from './ui/SectionLabel'
import TextReveal from './ui/TextReveal'
import CardTilt from './ui/CardTilt'
import FloatingTags from './ui/FloatingTags'
import styles from './styles/projects.module.css'
import { projects } from '../constants/constants'
import { github } from '../assets'

const EXTRA_PROJECTS = [
  {
    name: 'anthem-nation-portal',
    description:
      'Full-stack Video Content Management Platform with advanced media processing, user authentication, and real-time content delivery.',
    tags: [{ name: 'typescript' }, { name: 'react' }, { name: 'node.js' }],
    image: null,
    source_code_link: 'https://github.com/nishanth1104/anthem-nation-portal',
  },
  {
    name: 'RECAP',
    description:
      'Q&A agent using recursive decomposition for explainable AI — breaks complex questions into sub-queries and synthesizes traceable answers.',
    tags: [{ name: 'python' }, { name: 'langchain' }, { name: 'RAG' }],
    image: null,
    source_code_link: 'https://github.com/nishanth1104/RECAP',
  },
]

const ALL_PROJECTS = [...projects, ...EXTRA_PROJECTS]

const FLOATING = [
  { label: 'Open Source', left: '4%',  top: '20%', delay: 0.4 },
  { label: 'GitHub',      left: '78%', top: '8%',  delay: 0.6 },
  { label: 'Full Stack',  left: '82%', top: '65%', delay: 0.2 },
  { label: 'ML',          left: '6%',  top: '75%', delay: 0.9 },
  { label: 'RAG',         left: '88%', top: '38%', delay: 0.5 },
  { label: 'API',         left: '55%', top: '90%', delay: 1.1 },
]

function ProjectSlide({ project, i, expanded, onEnter, onLeave }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const num      = String(i + 1).padStart(2, '0')
  const isExpanded = expanded === i
  const hasImage = Boolean(project.image)
  const xInitial = i % 2 === 0 ? 80 : -80

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xInitial }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <CardTilt
        className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <span className={styles.ghostNum} aria-hidden="true">{num}</span>

        <div className={styles.cardHeader}>
          {hasImage ? (
            <img src={project.image} alt={project.name} className={styles.projectImg} />
          ) : (
            <div className={styles.gradientPlaceholder}>
              <span className={styles.placeholderLabel}>{project.name}</span>
            </div>
          )}
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.projectName}>{project.name}</h3>

          <div className={styles.tags}>
            {project.tags.map((tag, ti) => (
              <span
                key={tag.name}
                className={`${styles.tag} ${ti === 0 ? styles.tagPrimary : ''}`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={styles.descWrapper}
              >
                <p className={styles.desc}>{project.description}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.cardFooter}>
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={github} alt="GitHub" className={styles.githubIcon} />
              <span>View Source</span>
            </a>
          </div>
        </div>
      </CardTilt>
    </motion.div>
  )
}

export default function Projects() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section
      id="projects"
      className={styles.section}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <FloatingTags tags={FLOATING} />

      <div className={styles.container}>
        <ScrollReveal>
          <SectionLabel index={2} label="Projects" />
          <TextReveal>
            <h2 className={styles.heading}>Selected Work</h2>
          </TextReveal>
        </ScrollReveal>

        <div className={styles.grid}>
          {ALL_PROJECTS.map((project, i) => (
            <ProjectSlide
              key={project.name}
              project={project}
              i={i}
              expanded={expanded}
              onEnter={() => setExpanded(i)}
              onLeave={() => setExpanded(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
