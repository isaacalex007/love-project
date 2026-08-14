import { motion, useReducedMotion } from 'framer-motion'
import config from '../config'

// When the floating soundtrack toggle is present, reserve space below the
// card so the toggle never overlaps a tap target.
const soundtrackOn = config.soundtrack.enabled && Boolean(config.soundtrack.src)

const SPRING = { type: 'spring', stiffness: 260, damping: 24 }

/**
 * Shared step wrapper: a frosted-glass "document" card gliding in from the
 * folder — incoming from +40px with spring, outgoing slides -40px, fades,
 * and blurs. Children stagger in 70ms apart via the exported <Item>.
 */
export default function PageShell({ children, className = '', cardClassName = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.section
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, x: -40, filter: 'blur(4px)' }}
      transition={{ x: SPRING, opacity: { duration: 0.3 }, filter: { duration: 0.3 } }}
      className={`relative min-h-dvh flex flex-col items-center justify-center px-4 pt-12 ${
        soundtrackOn ? 'pb-24' : 'pb-10'
      } ${className}`}
    >
      <motion.div
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
        }}
        initial="hidden"
        animate="show"
        className={`glass-card relative w-full max-w-md px-6 py-8 ${cardClassName}`}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}

/**
 * Stagger unit: fades up 14px with the house spring (fade-only under
 * reduced motion). Use for every direct content block inside PageShell.
 */
export function Item({ children, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 14 },
        show: reduced
          ? { opacity: 1, transition: { duration: 0.25 } }
          : { opacity: 1, y: 0, transition: SPRING },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export { SPRING }
