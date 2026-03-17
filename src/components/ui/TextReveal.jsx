import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import React from 'react'

export default function TextReveal({ children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Handle: <TextReveal><h2 className={...}>Some Text</h2></TextReveal>
  if (
    React.isValidElement(children) &&
    typeof children.props.children === 'string'
  ) {
    const { type: Tag, props } = children
    const { children: text, ...rest } = props
    const words = text.split(' ')

    return (
      <Tag {...rest} ref={ref}>
        {words.map((word, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    )
  }

  // Fallback: reveal whole block
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
