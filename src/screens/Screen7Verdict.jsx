import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import config from '../config'
import PageShell, { Item } from '../components/PageShell'

const MAX_DODGES = 6

/**
 * Screen 7 — The Verdict. GRANTED idles with a slow gradient drift and a
 * breathing glow that intensifies (and grows 15%) per denial attempt;
 * DENIED spring-dodges within bounds, cycling its labels, then fades out
 * disabled. Reduced motion: labels cycle in place.
 */
export default function Screen7Verdict({ onGranted }) {
  const { verdict } = config
  const reduced = useReducedMotion()

  const areaRef = useRef(null)
  const btnRef = useRef(null)
  const [pos, setPos] = useState(null)
  const [attempts, setAttempts] = useState(0)

  const exhausted = attempts >= MAX_DODGES
  const label = verdict.deniedLabels[Math.min(attempts, verdict.deniedLabels.length - 1)]
  const grantScale = Math.min(1 + attempts * 0.15, 1.9)

  useLayoutEffect(() => {
    const area = areaRef.current
    const btn = btnRef.current
    if (!area || !btn) return
    const pad = 8
    const maxX = Math.max(pad, area.clientWidth - btn.offsetWidth - pad)
    const maxY = Math.max(pad, area.clientHeight - btn.offsetHeight - pad)
    setPos((p) =>
      p
        ? { x: Math.min(p.x, maxX), y: Math.min(p.y, maxY) }
        : {
            x: (area.clientWidth - btn.offsetWidth) / 2,
            y: (area.clientHeight - btn.offsetHeight) / 2,
          }
    )
  }, [attempts])

  const dodge = (e) => {
    if (exhausted) return
    e.preventDefault()
    setAttempts((a) => a + 1)
    if (reduced) return
    const area = areaRef.current
    const btn = btnRef.current
    if (!area || !btn) return
    // leave headroom for the widest upcoming label
    const pad = 8
    const maxX = Math.max(pad, area.clientWidth - btn.offsetWidth - 40 - pad)
    const maxY = Math.max(pad, area.clientHeight - btn.offsetHeight - pad)
    setPos({
      x: pad + Math.random() * (maxX - pad),
      y: pad + Math.random() * (maxY - pad),
    })
  }

  return (
    <PageShell>
      <Item>
        <h2 className="font-sans font-bold text-[34px] tracking-[-0.02em] text-center">
          {verdict.title}
        </h2>
        <hr className="divider my-4" />
      </Item>
      <Item>
        <p className="text-[16px] leading-[1.6] text-ink/85 text-center mb-8">{verdict.intro}</p>
      </Item>

      <Item>
        <motion.button
          animate={{ scale: grantScale }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          whileTap={{ scale: grantScale * 0.95 }}
          onClick={onGranted}
          className="btn-granted label mx-auto block min-h-[52px] px-7 py-3.5 text-[13px] origin-center"
          style={{ maxWidth: '80%', '--glow': attempts }}
        >
          {verdict.grantLabel}
        </motion.button>
      </Item>

      {/* play area for the dodging button */}
      <div ref={areaRef} className="relative h-56 mt-6 w-full">
        <motion.button
          ref={btnRef}
          onPointerDown={dodge}
          onPointerEnter={
            // hover-dodge is a mouse thing; on touch, pointerenter fires with
            // pointerdown and would double-count the attempt
            reduced ? undefined : (e) => e.pointerType === 'mouse' && dodge(e)
          }
          disabled={exhausted}
          animate={{
            x: pos?.x ?? 0,
            y: pos?.y ?? 0,
            opacity: pos ? (exhausted ? 0.2 : 1) : 0,
          }}
          transition={
            reduced ? { duration: 0.01 } : { type: 'spring', stiffness: 420, damping: 22 }
          }
          className="label glass-pill absolute left-0 top-0 min-h-[44px] px-4 py-2.5 text-[11px] text-ink/70 border !border-rose/30 whitespace-nowrap"
        >
          ✗ {label}
        </motion.button>

        {exhausted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="label absolute inset-x-0 bottom-0 text-center text-[10px] text-ink/45"
          >
            {verdict.deniedDisabledCaption}
          </motion.p>
        )}
      </div>
    </PageShell>
  )
}
