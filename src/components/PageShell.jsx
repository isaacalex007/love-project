import { motion, useReducedMotion } from 'framer-motion'
import config from '../config'

// When the floating soundtrack toggle is present, reserve space below the
// screen's CTA so the toggle never overlaps a tap target.
const soundtrackOn = config.soundtrack.enabled && Boolean(config.soundtrack.src)

/**
 * Shared full-viewport step wrapper: a document page that slides in like
 * a sheet pulled from a folder (slide + slight rotate).
 */
export default function PageShell({ children, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.section
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 48, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -40, rotate: -1.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-dvh flex flex-col px-6 pt-10 ${soundtrackOn ? 'pb-24' : 'pb-8'} ${className}`}
    >
      {children}
    </motion.section>
  )
}
