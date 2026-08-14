import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import config from '../config'
import PageShell from '../components/PageShell'

const MAX_DODGES = 6

/**
 * Screen 7 — The Verdict. GRANTED grows ~15% per denial attempt; DENIED
 * dodges within safe bounds (spring), cycling its label, and after 6
 * attempts fades out, disabled — "denied on procedural grounds".
 * Reduced motion: the dodge becomes label-cycling in place.
 */
export default function Screen7Verdict({ onGranted }) {
  const { verdict } = config
  const reduced = useReducedMotion()

  const areaRef = useRef(null)
  const btnRef = useRef(null)
  const [pos, setPos] = useState(null) // {x, y} within the play area
  const [attempts, setAttempts] = useState(0)

  const exhausted = attempts >= MAX_DODGES
  const label = verdict.deniedLabels[Math.min(attempts, verdict.deniedLabels.length - 1)]
  const grantScale = Math.min(1 + attempts * 0.15, 1.9)

  // Start the denied button centered, and re-clamp it whenever the label
  // changes size so a longer label never pokes past the play area.
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
    if (reduced) return // label cycles in place instead of moving
    const area = areaRef.current
    const btn = btnRef.current
    if (!area || !btn) return
    // Leave headroom for the widest upcoming label — the button's width
    // changes as labels cycle.
    const pad = 8
    const maxX = Math.max(pad, area.clientWidth - btn.offsetWidth - 40 - pad)
    const maxY = Math.max(pad, area.clientHeight - btn.offsetHeight - pad)
    setPos({
      x: pad + Math.random() * (maxX - pad),
      y: pad + Math.random() * (maxY - pad),
    })
  }

  return (
    <PageShell className="justify-center">
      <h2 className="font-display font-extrabold text-4xl text-center">{verdict.title}</h2>
      <div className="letterhead-rule my-4" />
      <p className="font-body text-[16px] leading-relaxed text-center mb-8">{verdict.intro}</p>

      <motion.button
        animate={{ scale: grantScale }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        whileTap={{ scale: grantScale * 0.95 }}
        onClick={onGranted}
        className="stamp-text mx-auto block min-h-[52px] px-6 py-3.5 rounded bg-rose text-paper text-sm shadow-lg origin-center"
        style={{ maxWidth: '80%' }}
      >
        {verdict.grantLabel}
      </motion.button>

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
            reduced
              ? { duration: 0.01 }
              : { type: 'spring', stiffness: 420, damping: 22 }
          }
          className="stamp-text absolute left-0 top-0 min-h-[44px] px-4 py-2.5 rounded border-2 border-ink/40 text-ink/70 text-xs bg-paper whitespace-nowrap"
        >
          ✗ {label}
        </motion.button>

        {exhausted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="stamp-text absolute inset-x-0 bottom-0 text-center text-[11px] text-ink/50"
          >
            {verdict.deniedDisabledCaption}
          </motion.p>
        )}
      </div>
    </PageShell>
  )
}
