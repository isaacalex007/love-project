import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Ambient celebration for the judgment: hearts rising from offscreen-bottom
 * for the rest of the session — and tappable. Tap → pop with a mini sparkle
 * burst, then that heart rejoins the cycle from the bottom. Pure delight,
 * no counter. Hidden under reduced motion (CSS disables the rise).
 */

const HEARTS = [
  { left: '8%', size: 14, dur: 11, delay: 0, o: 0.5, sway: 24 },
  { left: '22%', size: 20, dur: 14, delay: 2.2, o: 0.35, sway: -18 },
  { left: '38%', size: 11, dur: 9.5, delay: 4.4, o: 0.55, sway: 14 },
  { left: '54%', size: 17, dur: 13, delay: 1.1, o: 0.4, sway: -26 },
  { left: '68%', size: 12, dur: 10, delay: 3.6, o: 0.5, sway: 20 },
  { left: '82%', size: 22, dur: 16, delay: 0.6, o: 0.3, sway: -14 },
  { left: '92%', size: 13, dur: 12, delay: 5.2, o: 0.45, sway: 16 },
]

const SPARKS = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2
  return { x: Math.cos(a) * 26, y: Math.sin(a) * 26, gold: i % 2 === 0 }
})

function PoppableHeart({ cfg }) {
  const [gen, setGen] = useState(0) // remounting restarts the rise cycle
  const [burst, setBurst] = useState(null)

  const pop = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setBurst({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, id: gen })
    setGen((g) => g + 1)
    setTimeout(() => setBurst(null), 650)
  }

  return (
    <>
      <button
        key={gen}
        onPointerDown={pop}
        data-decorative="true"
        tabIndex={-1}
        aria-hidden="true"
        className="heart-rise p-1.5"
        style={{
          left: cfg.left,
          fontSize: cfg.size,
          animationDuration: `${cfg.dur}s`,
          animationDelay: `${cfg.delay}s`,
          '--o': cfg.o,
          '--sway': `${cfg.sway}px`,
        }}
      >
        ❤︎
      </button>
      <AnimatePresence>
        {burst && (
          <span
            key={burst.id}
            className="fixed z-[9] pointer-events-none"
            style={{ left: burst.x, top: burst.y }}
            aria-hidden="true"
          >
            {SPARKS.map((s, i) => (
              <motion.span
                key={i}
                className={`absolute rounded-full ${s.gold ? 'bg-gold' : 'bg-rose'}`}
                style={{ width: 4, height: 4 }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: s.x, y: s.y, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            ))}
            <motion.span
              className="absolute text-rose"
              style={{ fontSize: cfg.size + 4, translate: '-50% -50%' }}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 1.7 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              ❤︎
            </motion.span>
          </span>
        )}
      </AnimatePresence>
    </>
  )
}

export default function FloatingHearts() {
  return (
    <div>
      {HEARTS.map((h, i) => (
        <PoppableHeart key={i} cfg={h} />
      ))}
    </div>
  )
}
