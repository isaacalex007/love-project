import { motion, useReducedMotion } from 'framer-motion'

/**
 * One qualification row: slides in, then its checkbox draws its tick
 * (SVG stroke, 220ms) with a small pop. Rows are sequenced 350ms apart
 * by the caller via `index`.
 */
export default function CheckRow({ children, index, baseDelay = 0.4 }) {
  const reduced = useReducedMotion()
  const delay = baseDelay + index * 0.35
  const tickDelay = delay + 0.18

  return (
    <motion.li
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: -18 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={
        reduced
          ? { duration: 0.25, delay: 0.2 + index * 0.08 }
          : { type: 'spring', stiffness: 260, damping: 24, delay }
      }
      className="flex gap-3"
    >
      <motion.span
        className="shrink-0 mt-0.5"
        animate={reduced ? {} : { scale: [1, 1, 1.15, 1] }}
        transition={{ duration: 0.4, delay: tickDelay, times: [0, 0.4, 0.7, 1] }}
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="1" y="1" width="18" height="18" rx="6" fill="#D96C8A" fillOpacity="0.14" stroke="#D96C8A" strokeOpacity="0.5" />
          <motion.path
            d="M5.5 10.5 8.8 13.8 14.5 6.8"
            stroke="#7A2E42"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.22, delay: tickDelay, ease: 'easeOut' }}
          />
        </svg>
      </motion.span>
      <span className="text-[15px] leading-relaxed text-ink/85">{children}</span>
    </motion.li>
  )
}
