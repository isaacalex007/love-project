import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Photo card: enters with a settle rotation (-4°→-1.5°), caption fades up
 * 80ms after the photo lands. `framed` wraps it in the gold shimmer border.
 * Renders nothing if no src is configured or the file fails to load.
 */
export default function Polaroid({ photo, framed = false }) {
  const [failed, setFailed] = useState(false)
  const reduced = useReducedMotion()
  if (!photo?.src || failed) return null

  const inner = (
    <div className="bg-white/85 rounded-2xl p-2 pb-3">
      <img
        src={photo.src}
        alt=""
        className="w-full h-auto max-w-full rounded-xl"
        onError={() => setFailed(true)}
      />
      <motion.figcaption
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0.2 : 0.68, duration: 0.35 }}
        className="label text-[9px] text-ink/60 mt-2 normal-case tracking-[0.06em] leading-relaxed"
      >
        {photo.caption}
      </motion.figcaption>
    </div>
  )

  return (
    <motion.figure
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, rotate: -4 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate: -1.5 }}
      transition={reduced ? { duration: 0.25 } : { type: 'spring', stiffness: 200, damping: 20, delay: 0.25 }}
      className="mx-auto my-5 w-60"
    >
      {framed ? <div className="shimmer-frame">{inner}</div> : inner}
    </motion.figure>
  )
}
