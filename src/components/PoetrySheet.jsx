import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import config from '../config'

// First-open pulse flag — survives across screens within a session.
let poetryFound = false

function HeartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path
        d="M13 22C7 17.5 3 13.8 3 9.6 3 6.5 5.4 4 8.4 4c1.9 0 3.6 1 4.6 2.6C14 5 15.7 4 17.6 4c3 0 5.4 2.5 5.4 5.6 0 4.2-4 7.9-10 12.4Z"
        fill="#D96C8A"
        opacity="0.85"
      />
    </svg>
  )
}

/**
 * The hidden easter egg: the small heart at the top-right of each card is
 * tappable. It opens a compact glass bottom sheet — "Filed under: poetry" —
 * dismissed by tapping outside or swiping down. The heart does one happy
 * pulse the first time it's found.
 */
export default function PoetryHeart() {
  const { poetry } = config
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [pulse, setPulse] = useState(false)

  const openSheet = () => {
    if (!poetryFound) {
      poetryFound = true
      setPulse(true)
    }
    setOpen(true)
  }

  return (
    <>
      <motion.button
        onClick={openSheet}
        aria-label="Filed under: poetry"
        className="absolute top-2 right-2 p-[9px] bob z-10"
        animate={pulse && !reduced ? { scale: [1, 1.35, 0.95, 1.12, 1] } : {}}
        transition={{ duration: 0.7 }}
        onAnimationComplete={() => setPulse(false)}
      >
        <HeartIcon />
      </motion.button>

      {/* portal: framer leaves transforms on ancestors, which would turn
          position:fixed into card-relative positioning */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <>
            <motion.div
              className="fixed inset-0 z-[70] bg-ink/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="glass-card fixed inset-x-3 bottom-3 z-[80] px-6 pt-3 pb-7 !rounded-3xl"
              initial={reduced ? { opacity: 0 } : { y: '110%' }}
              animate={reduced ? { opacity: 1 } : { y: 0 }}
              exit={reduced ? { opacity: 0 } : { y: '110%' }}
              transition={reduced ? { duration: 0.25 } : { type: 'spring', stiffness: 300, damping: 30 }}
              drag={reduced ? false : 'y'}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 500) setOpen(false)
              }}
              role="dialog"
              aria-label={poetry.title}
            >
              <div className="mx-auto w-10 h-1 rounded-full bg-ink/15 mb-4" aria-hidden="true" />
              <h3 className="label text-[11px] text-wine text-center mb-4">{poetry.title}</h3>
              <div className="font-accent italic text-[21px] leading-[1.45] text-ink text-center">
                {poetry.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
                <p className="text-sm italic text-ink/55 text-center mt-4">{poetry.attribution}</p>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
