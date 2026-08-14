import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * One admissible fact: renders with an EMPTY checkbox; her tap draws the
 * tick (SVG stroke, 220ms) with a small pop and a tiny heart particle.
 * Ticking is one-way — once admitted into evidence, admitted.
 */
export default function CheckRow({ children, index, checked, onCheck }) {
  const reduced = useReducedMotion()

  return (
    <motion.li
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: -18 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={
        reduced
          ? { duration: 0.25, delay: 0.15 + index * 0.06 }
          : { type: 'spring', stiffness: 260, damping: 24, delay: 0.3 + index * 0.1 }
      }
    >
      <button
        onClick={onCheck}
        aria-pressed={checked}
        className="flex gap-3 w-full min-h-[44px] text-left items-start rounded-xl px-1 py-1 active:bg-white/40 transition-colors"
      >
        <motion.span
          className="relative shrink-0 mt-0.5"
          animate={checked && !reduced ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.3, delay: 0.12 }}
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="1"
              y="1"
              width="18"
              height="18"
              rx="6"
              fill="#D96C8A"
              fillOpacity={checked ? 0.14 : 0.06}
              stroke="#D96C8A"
              strokeOpacity="0.5"
            />
            {checked && (
              <motion.path
                d="M5.5 10.5 8.8 13.8 14.5 6.8"
                stroke="#7A2E42"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduced ? 0 : 0.22, ease: 'easeOut' }}
              />
            )}
          </svg>
          {/* tiny heart particle on tick */}
          <AnimatePresence>
            {checked && !reduced && (
              <motion.span
                className="absolute left-1/2 top-0 text-[11px] text-rose pointer-events-none"
                initial={{ opacity: 1, y: 0, x: '-50%', scale: 0.6 }}
                animate={{ opacity: 0, y: -22, scale: 1.15 }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              >
                ❤︎
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
        <span className="text-[15px] leading-relaxed text-ink/85">{children}</span>
      </button>
    </motion.li>
  )
}
