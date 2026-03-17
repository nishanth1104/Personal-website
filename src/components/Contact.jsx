import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import SectionLabel from './ui/SectionLabel'
import FloatingTags from './ui/FloatingTags'
import styles from './styles/contact.module.css'
import resumePdf from '../assets/Nishanth_Ayyalasomayajula_Resume.pdf'

const FLOATING = [
  { label: 'email',       left: '4%',  top: '22%', delay: 0.3 },
  { label: 'connect',     left: '82%', top: '15%', delay: 0.6 },
  { label: 'collaborate', left: '78%', top: '75%', delay: 0.4 },
  { label: 'hire',        left: '6%',  top: '78%', delay: 0.8 },
  { label: 'build',       left: '88%', top: '45%', delay: 0.2 },
]

const fieldVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fieldItem = {
  hidden: { opacity: 0, x: 60 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const btnItem = {
  hidden: { opacity: 0, scale: 0.9 },
  show:   { opacity: 1, scale: [0.9, 1.05, 1], transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, reply_to: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => setStatus('sent'))
      .catch(() => setStatus('error'))
  }

  return (
    <section
      id="contact"
      className={styles.section}
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <FloatingTags tags={FLOATING} />

      <div className={styles.container}>
        <SectionLabel index={5} label="Contact" />
        <h2 className={styles.heading}>Let's Build Together</h2>

        {/* Terminal window */}
        <div className={styles.terminal}>
          <div className={styles.chrome}>
            <span className={styles.dot} style={{ background: '#FF5F57' }} />
            <span className={styles.dot} style={{ background: '#FFBD2E' }} />
            <span className={styles.dot} style={{ background: '#28CA41' }} />
            <span className={styles.chromeLabel}>terminal — contact</span>
          </div>

          <div className={styles.body}>
            {status === 'sent' ? (
              <div className={styles.statusMsg}>
                <span className={styles.statusOk}>{'> mail sent. 200 OK ✓'}</span>
              </div>
            ) : status === 'error' ? (
              <div className={styles.statusMsg}>
                <span className={styles.statusErr}>{'> error: failed to send. try again'}</span>
                <button className={styles.retryBtn} onClick={() => setStatus('idle')}>
                  {'$ retry'}
                </button>
              </div>
            ) : (
              <motion.form
                className={styles.form}
                onSubmit={handleSubmit}
                variants={fieldVariants}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
              >
                <motion.div className={styles.fieldRow} variants={fieldItem}>
                  <label className={styles.fieldLabel} htmlFor="cf-name">$ name:</label>
                  <input
                    id="cf-name"
                    name="name"
                    className={styles.fieldInput}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="your name"
                    autoComplete="name"
                    required
                  />
                </motion.div>

                <motion.div className={styles.fieldRow} variants={fieldItem}>
                  <label className={styles.fieldLabel} htmlFor="cf-email">$ email:</label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className={styles.fieldInput}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </motion.div>

                <motion.div className={styles.fieldRow} variants={fieldItem}>
                  <label className={styles.fieldLabel} htmlFor="cf-message">$ message:</label>
                  <input
                    id="cf-message"
                    name="message"
                    className={styles.fieldInput}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="let's build something..."
                    required
                  />
                </motion.div>

                <motion.div className={styles.fieldRow} variants={btnItem}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? '> sending...' : '> send --now'}
                  </button>
                </motion.div>
              </motion.form>
            )}

            <div className={styles.ctaGroup}>
              <a
                href="https://www.linkedin.com/in/a-nishanth"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaLink}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/nishanth1104"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaLink}
              >
                GitHub ↗
              </a>
              <a href={resumePdf} download className={styles.ctaLinkSecondary}>
                Download Resume ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
