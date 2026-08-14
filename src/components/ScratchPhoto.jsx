import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const REVEAL_AT = 0.55
const BRUSH = 26

/**
 * Exhibit A as a scratch card: the photo hides under a rose-gradient foil
 * she scratches away with a finger (canvas, destination-out). At ~55%
 * scratched the foil auto-clears with a soft shimmer and the caption fades
 * in. Tap-and-hold reveals instantly (the reduced-motion/desktop fallback).
 * Scratching never scroll-hijacks: touch-action is disabled on the canvas
 * only.
 */
export default function ScratchPhoto({ photo }) {
  const reduced = useReducedMotion()
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const drawing = useRef(false)
  const strokes = useRef(0)
  const holdTimer = useRef(null)
  const [ready, setReady] = useState(false)
  const [revealed, setRevealed] = useState(false)

  if (!photo?.src) return null

  // paint the foil once the image has given the wrapper its size
  const paintFoil = () => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap || wrap.clientWidth === 0) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = wrap.clientWidth * dpr
    canvas.height = wrap.clientHeight * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    const w = wrap.clientWidth
    const h = wrap.clientHeight
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#E896AC')
    grad.addColorStop(0.45, '#D96C8A')
    grad.addColorStop(0.75, '#C9709B')
    grad.addColorStop(1, '#B14F6C')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
    // faint diagonal sheen lines so it reads as foil
    ctx.strokeStyle = 'rgba(255,255,255,0.14)'
    ctx.lineWidth = 10
    for (let x = -h; x < w + h; x += 34) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + h, h)
      ctx.stroke()
    }
    setReady(true)
  }

  const fractionCleared = () => {
    const canvas = canvasRef.current
    if (!canvas) return 0
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const data = ctx.getImageData(0, 0, width, height).data
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 8) {
      total++
      if (data[i] === 0) clear++
    }
    return total ? clear / total : 0
  }

  const scratchAt = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    const dpr = canvas.width / rect.width
    ctx.save()
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(e.clientX - rect.left, e.clientY - rect.top, BRUSH, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    strokes.current++
    if (strokes.current % 6 === 0 && fractionCleared() >= REVEAL_AT) setRevealed(true)
  }

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
  }

  const onPointerDown = (e) => {
    if (revealed) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    // tap-and-hold fallback: 600ms without letting go reveals everything
    holdTimer.current = setTimeout(() => setRevealed(true), 600)
    if (!reduced) {
      drawing.current = true
      scratchAt(e)
    }
  }
  const onPointerMove = (e) => {
    if (!drawing.current || revealed) return
    clearHold() // she's scratching, not holding
    scratchAt(e)
  }
  const onPointerUp = () => {
    drawing.current = false
    clearHold()
    if (!revealed && !reduced && fractionCleared() >= REVEAL_AT) setRevealed(true)
  }

  useEffect(() => () => clearHold(), [])

  return (
    <motion.figure
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, rotate: -4 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate: -1.5 }}
      transition={reduced ? { duration: 0.25 } : { type: 'spring', stiffness: 200, damping: 20, delay: 0.25 }}
      className="mx-auto my-5 w-60"
    >
      <div className="bg-white/85 rounded-2xl p-2 pb-3">
        <div ref={wrapRef} className="relative rounded-xl overflow-hidden">
          <img
            src={photo.src}
            alt=""
            className="block w-full h-auto max-w-full"
            onLoad={paintFoil}
            draggable={false}
          />
          {/* foil */}
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ touchAction: 'none', opacity: ready ? undefined : 1 }}
            initial={false}
            animate={{ opacity: revealed ? 0 : 1 }}
            transition={{ duration: 0.5, delay: revealed ? 0.15 : 0 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
          {/* soft shimmer sweep as the foil clears */}
          {revealed && !reduced && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.75) 50%, transparent 70%)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
          {/* foil label */}
          {!revealed && (
            <span className="label glass-pill absolute inset-x-4 top-1/2 -translate-y-1/2 px-3 py-2 text-[10px] text-wine text-center pointer-events-none">
              {photo.scratchLabel}
            </span>
          )}
        </div>
        <motion.figcaption
          initial={false}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 6 }}
          transition={{ duration: 0.35, delay: revealed ? 0.4 : 0 }}
          className="label text-[9px] text-ink/60 mt-2 normal-case tracking-[0.06em] leading-relaxed"
        >
          {photo.caption}
        </motion.figcaption>
      </div>
    </motion.figure>
  )
}
