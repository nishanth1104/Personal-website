import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, animate, useInView } from 'framer-motion'
import DotGrid from './ui/DotGrid'
import MagneticBtn from './ui/MagneticBtn'
import styles from './styles/hero.module.css'
import resumePdf from '../assets/Nishanth_Ayyalasomayajula_Resume.pdf'

const ROLES = ['AI Engineer', 'LLM Architect', 'Agentic Systems Builder']

const FLOATING_TAGS = [
  { label: 'React',      x: '8%',  y: '18%', delay: 0    },
  { label: 'Python',     x: '82%', y: '12%', delay: 0.4  },
  { label: 'LangChain',  x: '75%', y: '72%', delay: 0.8  },
  { label: 'PyTorch',    x: '5%',  y: '68%', delay: 1.2  },
  { label: 'FastAPI',    x: '88%', y: '42%', delay: 0.6  },
  { label: 'Docker',     x: '14%', y: '82%', delay: 1.0  },
  { label: 'RAG',        x: '60%', y: '88%', delay: 0.2  },
  { label: 'GPT-4',      x: '3%',  y: '44%', delay: 1.4  },
]

const STATS = [
  { label: 'Projects', target: 5 },
  { label: 'Certs',    target: 3 },
]

/* ── Letter-by-letter name animation ── */
const charVariants = {
  hidden: { y: '115%', opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function NameLine({ text, delayStart, dim }) {
  return (
    <motion.div
      className={`${styles.nameLine} ${dim ? styles.nameLineDim : ''}`}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.032, delayChildren: delayStart } } }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span variants={charVariants} style={{ display: 'inline-block' }}>
            {char}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}

/* ── Typing role ── */
function TypingRole() {
  const [roleIdx, setRoleIdx]   = useState(0)
  const [text, setText]         = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let timeout
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text === '') {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
    } else {
      timeout = setTimeout(
        () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
        deleting ? 45 : 90
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIdx])

  return (
    <span className={styles.role}>
      {text}
      <span className={styles.cursor} aria-hidden="true">|</span>
    </span>
  )
}

/* ── Animated counter ── */
function AnimatedCounter({ target }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [inView, target, count])

  return <span ref={ref}>{display}</span>
}

/* ── Fade-up item (used for sub-elements) ── */
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const { scrollY } = useScroll()
  const dotY = useTransform(scrollY, [0, 600], [0, -180])

  // NISHANTH  = 8 chars × 0.032 = 0.256s + start 0.1 = ~0.36s end
  // AYYALASOMAYAJULA = 16 chars × 0.032 = 0.512s + start 0.4 = ~0.91s end

  return (
    <section id="hero" className={styles.hero}>
      {/* Parallax DotGrid */}
      <motion.div
        style={{ y: dotY, position: 'absolute', inset: 0, zIndex: 0 }}
        aria-hidden="true"
      >
        <DotGrid />
      </motion.div>

      {/* Floating skill tags */}
      {FLOATING_TAGS.map(({ label, x, y, delay }) => (
        <motion.div
          key={label}
          className={styles.floatingTag}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 + delay }}
          aria-hidden="true"
        >
          {label}
        </motion.div>
      ))}

      <div className={styles.content}>
        {/* Name — two clean lines, letter-by-letter */}
        <h1 className={styles.name}>
          <NameLine text="NISHANTH" delayStart={0.1} dim={false} />
          <NameLine text="AYYALASOMAYAJULA" delayStart={0.42} dim={true} />
        </h1>

        {/* Role typing line */}
        <motion.div className={styles.roleLine} {...fadeUp(1.0)}>
          <span className={styles.prompt}>$ </span>
          <TypingRole />
        </motion.div>

        {/* CTAs */}
        <motion.div className={styles.ctas} {...fadeUp(1.1)}>
          <MagneticBtn>
            <a
              href="#projects"
              className={styles.ctaPrimary}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View Projects
            </a>
          </MagneticBtn>
          <MagneticBtn>
            <a href={resumePdf} download className={styles.ctaSecondary}>
              Resume ↓
            </a>
          </MagneticBtn>
        </motion.div>

        {/* Stats bar */}
        <motion.div className={styles.statsBar} {...fadeUp(1.25)}>
          {STATS.map(({ label, target }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statNum}><AnimatedCounter target={target} /></span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
          <div className={styles.stat}>
            <span className={styles.statNum}>AI</span>
            <span className={styles.statLabel}>@ FSU</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
        aria-hidden="true"
      >
        <motion.div
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
        />
        <span className={styles.scrollHint}>scroll</span>
      </motion.div>
    </section>
  )
}
