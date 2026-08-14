import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import confetti from 'canvas-confetti'
import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import WaxSeal from '../components/WaxSeal'
import FloatingHearts from '../components/FloatingHearts'

const CONFETTI_COLORS = ['#D96C8A', '#C9A227', '#F3D9DC']

function buildWaLink(number, text) {
  const digits = String(number).replace(/\D/g, '')
  const base = `https://wa.me/${digits}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/**
 * Screen 5 — The Verdict, becoming the Judgment on MOTION GRANTED.
 * DENIED spring-dodges (4 max, labels cycling, then fades out disabled)
 * while GRANTED grows 15% per attempt with an intensifying glow. Granting
 * fires the hero: confetti → seal stamp → the serif ruling → hearts.
 */
export default function Screen5Verdict({ selections }) {
  const [phase, setPhase] = useState('verdict')
  return (
    <AnimatePresence mode="wait">
      {phase === 'verdict' ? (
        <Verdict key="verdict" onGranted={() => setPhase('judgment')} />
      ) : (
        <Judgment key="judgment" selections={selections} />
      )}
    </AnimatePresence>
  )
}

function Verdict({ onGranted }) {
  const { verdict } = config
  const reduced = useReducedMotion()

  const areaRef = useRef(null)
  const btnRef = useRef(null)
  const [pos, setPos] = useState(null)
  const [attempts, setAttempts] = useState(0)

  const exhausted = attempts >= verdict.maxDodges
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
        <h2 className="font-sans font-bold text-[26px] leading-snug tracking-[-0.02em] text-center">
          {verdict.title}
        </h2>
        <hr className="divider my-5" />
      </Item>

      <Item className="pt-2">
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

      <div ref={areaRef} className="relative h-52 mt-6 w-full">
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
      </div>
    </PageShell>
  )
}

function Judgment({ selections }) {
  const { judgment, him } = config
  const reduced = useReducedMotion()
  const fired = useRef(false)

  const dateType = selections.dateType
  const weekend = selections.weekend
  const weekendMsg = weekend?.ownDate ? weekend.shortText : weekend?.label

  const message = judgment.whatsappTemplate
    .replace('{dateType}', dateType?.shortText ?? '')
    .replace('{weekend}', weekendMsg ?? '')

  const deliverLink = buildWaLink(him.whatsappNumber, message)
  const remarksLink = buildWaLink(him.whatsappNumber, judgment.remarksPrefill)

  useEffect(() => {
    if (reduced || fired.current) return
    fired.current = true
    let shapes
    try {
      shapes = CONFETTI_COLORS.map((color) =>
        confetti.shapeFromText({ text: '❤︎', scalar: 1.6, color })
      )
    } catch {
      shapes = undefined
    }
    const common = { colors: CONFETTI_COLORS, shapes, scalar: 1.2, ticks: 220, zIndex: 60 }
    confetti({ ...common, particleCount: 70, spread: 75, origin: { x: 0.5, y: 0.55 } })
    const t = setTimeout(() => {
      confetti({ ...common, particleCount: 35, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } })
      confetti({ ...common, particleCount: 35, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } })
    }, 450)
    return () => clearTimeout(t)
  }, [reduced])

  return (
    <>
      <FloatingHearts />
      <PageShell>
        <div className="flex justify-center">
          <WaxSeal mode="stamp" size={96} />
        </div>

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={
            reduced
              ? { duration: 0.3, delay: 0.4 }
              : { type: 'spring', stiffness: 260, damping: 22, delay: 1.05, filter: { duration: 0.4, delay: 1.05 } }
          }
          className="font-accent italic text-[42px] leading-tight text-center text-rose mt-4 mb-5"
        >
          {judgment.granted}
        </motion.p>

        <Item>
          <div className="glass-pill !rounded-2xl px-4 py-4 text-center">
            <p className="text-[15px] leading-relaxed text-ink font-semibold">
              📍 {dateType?.label} — 📅 {weekend?.label}
            </p>
            <p className="text-[15px] leading-relaxed text-ink/85 mt-1.5">{judgment.handleLine}</p>
          </div>
        </Item>

        <Item>
          <p className="font-accent italic text-[21px] leading-snug text-wine text-center mt-6 [text-wrap:balance]">
            {judgment.offRecord}
          </p>
        </Item>
        <Item>
          <p className="font-accent italic text-[36px] leading-tight text-wine text-center my-4">
            {judgment.bigLine}
          </p>
        </Item>

        <Item className="pt-5 space-y-2">
          <a
            href={deliverLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient label block text-center w-full min-h-[50px] px-6 py-4 text-[13px]"
          >
            {judgment.deliverButton}
          </a>
          <a
            href={remarksLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm italic text-ink/60 underline underline-offset-4 min-h-[44px] py-3"
          >
            {judgment.remarksLink}
          </a>
        </Item>
      </PageShell>
    </>
  )
}
