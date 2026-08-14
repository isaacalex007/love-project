import { motion, useReducedMotion } from 'framer-motion'

/**
 * An ink-stamp: typewriter font, uppercase, letter-spaced, slightly rotated,
 * that "thunks" down with a scale-bounce when it mounts.
 */
export default function Stamp({ children, rotate = -8, color = 'wine', delay = 0.3, className = '' }) {
  const reduced = useReducedMotion()
  const colorClasses =
    color === 'rose'
      ? 'text-rose border-rose'
      : color === 'gold'
        ? 'text-gold border-gold'
        : 'text-wine border-wine'

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 2.4, rotate }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={
        reduced
          ? { duration: 0.2, delay }
          : { type: 'spring', stiffness: 500, damping: 22, delay }
      }
      className={`stamp-text inline-block border-[3px] rounded px-3 py-1 text-sm select-none ${colorClasses} ${className}`}
      style={{ maskImage: 'none' }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  )
}
