import { motion } from 'framer-motion'

/**
 * FloatingTags — reusable decorative background tags for sections.
 *
 * Props:
 *   tags: Array<{ label: string, left: string, top: string, delay: number, duration?: number }>
 *
 * Parent section must have `position: relative; overflow: hidden`.
 * Tags are hidden on mobile via the shared `.floating-tag` global class.
 */
export default function FloatingTags({ tags }) {
  return (
    <>
      {tags.map(({ label, left, top, delay, duration = 6 }) => (
        <motion.span
          key={label}
          className="floating-tag"
          style={{
            left,
            top,
            animationDuration: `${duration}s`,
            animationDelay: `${delay * 0.8}s`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + delay }}
          aria-hidden="true"
        >
          {label}
        </motion.span>
      ))}
    </>
  )
}
