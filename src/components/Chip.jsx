import { motion, useReducedMotion } from 'framer-motion'
import { SPRING } from './PageShell'

const TONES = {
  wine: 'text-wine bg-wine/[0.08]',
  gold: 'text-gold bg-gold/10',
  neutral: 'text-ink/60 bg-white/40',
}

/**
 * Glass label pill — the modern descendant of the ink stamp.
 * entrance="drop"  → drops in with a slight overshoot rotation (CONFIDENTIAL)
 * entrance="stamp" → scales in from 1.4, blur-to-sharp, lands rotated (FILED)
 */
export default function Chip({
  children,
  tone = 'neutral',
  rotate = 0,
  entrance,
  delay = 0.3,
  className = '',
}) {
  const reduced = useReducedMotion()

  const variants =
    entrance === 'drop'
      ? {
          initial: reduced ? { opacity: 0 } : { opacity: 0, y: -18, rotate: rotate - 6 },
          animate: { opacity: 1, y: 0, rotate },
          transition: reduced ? { duration: 0.25, delay } : { ...SPRING, stiffness: 320, delay },
        }
      : entrance === 'stamp'
        ? {
            initial: reduced ? { opacity: 0 } : { opacity: 0, scale: 1.4, rotate },
            animate: { opacity: 1, scale: 1, rotate },
            transition: reduced
              ? { duration: 0.25, delay }
              : { type: 'spring', stiffness: 400, damping: 19, delay },
          }
        : {
            initial: { opacity: 0 },
            animate: { opacity: 1, rotate },
            transition: { duration: 0.3, delay },
          }

  return (
    <motion.span
      {...variants}
      className={`label glass-pill inline-block px-3.5 py-1.5 text-[11px] ${TONES[tone]} ${className}`}
      aria-hidden="true"
    >
      {children}
    </motion.span>
  )
}
