import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * The signature set piece: a rose wax seal bearing a heart-over-scales emblem.
 *
 * mode="breakable" — she taps it, it cracks in two with a particle burst,
 *   then calls onBroken().
 * mode="stamp" — it slams down fully formed (used to seal the verdict).
 */

function SealFace({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#E48BA3" />
          <stop offset="55%" stopColor="#D96C8A" />
          <stop offset="100%" stopColor="#B94F6E" />
        </radialGradient>
      </defs>
      {/* irregular wax blob: main disc + bumps around the rim */}
      <g fill="url(#wax)">
        <circle cx="60" cy="60" r="46" />
        <circle cx="60" cy="12" r="7" />
        <circle cx="97" cy="34" r="6" />
        <circle cx="106" cy="66" r="5" />
        <circle cx="92" cy="96" r="7" />
        <circle cx="58" cy="108" r="6" />
        <circle cx="26" cy="98" r="6" />
        <circle cx="13" cy="62" r="6" />
        <circle cx="22" cy="28" r="7" />
      </g>
      {/* embossed rim */}
      <circle cx="60" cy="60" r="38" fill="none" stroke="#B94F6E" strokeWidth="2" opacity="0.8" />
      <circle cx="60" cy="60" r="35" fill="none" stroke="#F3D9DC" strokeWidth="1" opacity="0.5" />
      {/* emblem: heart over scales, embossed */}
      <g stroke="#8E3A54" strokeWidth="2.4" strokeLinecap="round" fill="none">
        {/* heart */}
        <path
          d="M60 46c-2.6-4.4-8.4-5.1-11-1.6-2.2 2.9-1.3 7 2.2 9.9L60 61l8.8-6.7c3.5-2.9 4.4-7 2.2-9.9-2.6-3.5-8.4-2.8-11 1.6Z"
          fill="#8E3A54"
          stroke="none"
        />
        {/* post + crossbar */}
        <line x1="60" y1="61" x2="60" y2="84" />
        <line x1="42" y1="66" x2="78" y2="66" />
        {/* chains */}
        <line x1="42" y1="66" x2="38" y2="74" strokeWidth="1.6" />
        <line x1="42" y1="66" x2="46" y2="74" strokeWidth="1.6" />
        <line x1="78" y1="66" x2="74" y2="74" strokeWidth="1.6" />
        <line x1="78" y1="66" x2="82" y2="74" strokeWidth="1.6" />
        {/* pans */}
        <path d="M36 74h12a6 6 0 0 1-12 0Z" fill="#8E3A54" stroke="none" />
        <path d="M72 74h12a6 6 0 0 1-12 0Z" fill="#8E3A54" stroke="none" />
        {/* base */}
        <line x1="53" y1="86" x2="67" y2="86" strokeWidth="2.8" />
      </g>
      {/* highlight glint */}
      <ellipse cx="46" cy="38" rx="12" ry="7" fill="#FFFFFF" opacity="0.18" transform="rotate(-25 46 38)" />
    </svg>
  )
}

const PARTICLES = [
  { x: -46, y: -34, s: 7 },
  { x: 42, y: -46, s: 5 },
  { x: 58, y: -8, s: 6 },
  { x: 50, y: 38, s: 5 },
  { x: -8, y: 54, s: 7 },
  { x: -54, y: 30, s: 5 },
  { x: -60, y: -6, s: 6 },
  { x: 10, y: -58, s: 5 },
]

export default function WaxSeal({ size = 132, mode = 'breakable', onBroken, ariaLabel }) {
  const [broken, setBroken] = useState(false)
  const reduced = useReducedMotion()

  if (mode === 'stamp') {
    return (
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 2.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 380, damping: 20, delay: 0.5 }}
        aria-hidden="true"
      >
        <SealFace size={size} />
      </motion.div>
    )
  }

  const crack = () => {
    if (broken) return
    setBroken(true)
    // Let the crack play, then advance.
    setTimeout(onBroken, reduced ? 250 : 900)
  }

  const half = (side) => ({
    clipPath: side === 'left' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)',
  })

  return (
    <button
      onClick={crack}
      disabled={broken}
      aria-label={ariaLabel}
      className="relative block focus:outline-none focus-visible:ring-4 focus-visible:ring-rose/40 rounded-full"
      style={{ width: size, height: size }}
    >
      {!broken && (
        <motion.div
          animate={reduced ? {} : { scale: [1, 1.045, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          <SealFace size={size} />
        </motion.div>
      )}

      <AnimatePresence>
        {broken && (
          <>
            {/* the two halves fly apart */}
            <motion.div
              className="absolute inset-0"
              style={half('left')}
              initial={{ x: 0, rotate: 0, opacity: 1 }}
              animate={
                reduced
                  ? { opacity: 0 }
                  : { x: -size * 0.45, rotate: -22, opacity: 0 }
              }
              transition={{ duration: 0.7, ease: [0.32, 0, 0.67, 0] }}
            >
              <SealFace size={size} />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              style={half('right')}
              initial={{ x: 0, rotate: 0, opacity: 1 }}
              animate={
                reduced
                  ? { opacity: 0 }
                  : { x: size * 0.45, rotate: 22, opacity: 0 }
              }
              transition={{ duration: 0.7, ease: [0.32, 0, 0.67, 0] }}
            >
              <SealFace size={size} />
            </motion.div>
            {/* tiny wax particles */}
            {!reduced &&
              PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-rose"
                  style={{
                    width: p.s,
                    height: p.s,
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                />
              ))}
          </>
        )}
      </AnimatePresence>
    </button>
  )
}
