import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ScrollReveal({ children, delay = 0, className = '', yOffset = 48 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-64px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset, scale: 0.97, filter: 'blur(4px)' }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          : { opacity: 0, y: yOffset, scale: 0.97, filter: 'blur(4px)' }
      }
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
