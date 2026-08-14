import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * The signature element: a glossy modern emblem — rose gradient disc, inner
 * ring, white heart-over-scales mark, one specular highlight. Reads like an
 * app icon, not clip-art wax.
 *
 * mode="breakable" — idle 3s pulse; on tap: quick 1.06 squeeze, then it
 *   splits into halves that rotate/fly apart with 14 particles on a
 *   physics arc (600ms), then onBroken().
 * mode="stamp" — spring stamp-down with an expanding particle ring.
 */

function SealFace({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id="disc" x1="20%" y1="8%" x2="80%" y2="95%">
          <stop offset="0%" stopColor="#E896AC" />
          <stop offset="55%" stopColor="#D96C8A" />
          <stop offset="100%" stopColor="#B14F6C" />
        </linearGradient>
        <radialGradient id="spec" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="52" fill="url(#disc)" />
      {/* inner ring */}
      <circle cx="60" cy="60" r="41" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />

      {/* heart-over-scales mark, in white */}
      <g stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path
          d="M60 45c-2.8-4.7-9-5.4-11.7-1.7-2.3 3.1-1.4 7.4 2.3 10.5L60 61l9.4-7.2c3.7-3.1 4.6-7.4 2.3-10.5-2.7-3.7-8.9-3-11.7 1.7Z"
          fill="#FFFFFF"
          stroke="none"
        />
        <line x1="60" y1="61" x2="60" y2="85" />
        <line x1="41" y1="67" x2="79" y2="67" />
        <line x1="41" y1="67" x2="37" y2="75" strokeWidth="1.7" />
        <line x1="41" y1="67" x2="45" y2="75" strokeWidth="1.7" />
        <line x1="79" y1="67" x2="75" y2="75" strokeWidth="1.7" />
        <line x1="79" y1="67" x2="83" y2="75" strokeWidth="1.7" />
        <path d="M35 75h12a6 6 0 0 1-12 0Z" fill="#FFFFFF" stroke="none" />
        <path d="M73 75h12a6 6 0 0 1-12 0Z" fill="#FFFFFF" stroke="none" />
        <line x1="53" y1="87" x2="67" y2="87" strokeWidth="3" />
      </g>

      {/* one specular highlight */}
      <ellipse cx="43" cy="34" rx="18" ry="10" fill="url(#spec)" transform="rotate(-28 43 34)" />
    </svg>
  )
}

const shadow = { filter: 'drop-shadow(0 12px 26px rgba(217,108,138,0.45))' }

const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2
  const power = 42 + (i % 3) * 16
  return {
    x: Math.cos(angle) * power,
    up: -18 - (i % 4) * 10,
    down: 44 + (i % 5) * 12,
    s: 4 + (i % 3) * 2,
    gold: i % 3 === 0,
  }
})

export default function WaxSeal({ size = 128, mode = 'breakable', onBroken, onCrackStart, ariaLabel }) {
  const [broken, setBroken] = useState(false)
  const reduced = useReducedMotion()

  if (mode === 'stamp') {
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 380, damping: 20, delay: 0.5 }}
          style={shadow}
          aria-hidden="true"
        >
          <SealFace size={size} />
        </motion.div>
        {/* one particle ring on landing */}
        {!reduced &&
          Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2
            return (
              <motion.span
                key={i}
                className={`absolute rounded-full ${i % 3 === 0 ? 'bg-gold' : 'bg-rose'}`}
                style={{ width: 5, height: 5, left: '50%', top: '50%' }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(a) * size * 0.62,
                  y: Math.sin(a) * size * 0.62,
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 0.55, delay: 0.72, ease: 'easeOut' }}
              />
            )
          })}
      </div>
    )
  }

  const crack = () => {
    if (broken) return
    setBroken(true)
    onCrackStart?.()
    setTimeout(onBroken, reduced ? 250 : 850)
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
          animate={reduced ? {} : { scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          whileTap={reduced ? undefined : { scale: 1.06 }}
          style={shadow}
        >
          <SealFace size={size} />
        </motion.div>
      )}

      <AnimatePresence>
        {broken && (
          <>
            <motion.div
              className="absolute inset-0"
              style={{ ...half('left'), ...shadow }}
              initial={{ x: 0, rotate: 0, opacity: 1, scale: 1.06 }}
              animate={reduced ? { opacity: 0 } : { x: -size * 0.5, y: 8, rotate: -24, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
            >
              <SealFace size={size} />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              style={{ ...half('right'), ...shadow }}
              initial={{ x: 0, rotate: 0, opacity: 1, scale: 1.06 }}
              animate={reduced ? { opacity: 0 } : { x: size * 0.5, y: 8, rotate: 24, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
            >
              <SealFace size={size} />
            </motion.div>
            {/* particles on a physics arc: fling up, fall down, fade */}
            {!reduced &&
              PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  className={`absolute rounded-full ${p.gold ? 'bg-gold' : 'bg-rose'}`}
                  style={{ width: p.s, height: p.s, left: '50%', top: '50%' }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: p.x, y: [0, p.up, p.down], opacity: [1, 1, 0], scale: 0.5 }}
                  transition={{ duration: 0.6, times: [0, 0.38, 1], ease: 'easeOut' }}
                />
              ))}
          </>
        )}
      </AnimatePresence>
    </button>
  )
}
