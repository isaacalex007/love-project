import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
 * Screen 8 — Judgment (hero): confetti burst → seal stamps down with a
 * particle ring → "Motion granted. ❤︎" scales in blur-to-sharp → order
 * details stagger onto a glass card → hearts rise for the rest of the
 * session.
 */
export default function Screen8Judgment({ selections }) {
  const { judgment, him } = config
  const reduced = useReducedMotion()
  const fired = useRef(false)

  const dateType = selections.dateType
  const weekend = selections.weekend
  const weekendText = weekend?.ownDate ? weekend.shortText : weekend?.label

  const message = judgment.whatsappTemplate
    .replace('{dateType}', dateType?.shortText ?? '')
    .replace('{weekend}', weekendText ?? '')

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
          <WaxSeal mode="stamp" size={100} />
        </div>

        <Item>
          <h2 className="label text-[11px] text-wine text-center mt-4">{judgment.title}</h2>
        </Item>

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={
            reduced
              ? { duration: 0.3, delay: 0.4 }
              : { type: 'spring', stiffness: 260, damping: 22, delay: 1.05, filter: { duration: 0.4, delay: 1.05 } }
          }
          className="font-accent italic text-[42px] leading-tight text-center text-rose mt-2 mb-6"
        >
          {judgment.granted}
        </motion.p>

        <Item>
          <div className="glass-pill !rounded-2xl px-4 py-4">
            <h3 className="label text-[10px] text-wine mb-3">{judgment.orderTitle}</h3>
            <ul className="text-[15px] leading-relaxed text-ink/85 space-y-2">
              <li>📍 {dateType?.orderText}</li>
              <li>📅 {weekend?.ownDate ? weekend.orderText : weekend?.label}</li>
              <li>{judgment.travelLine}</li>
            </ul>
          </div>
        </Item>

        <Item>
          <p className="text-[15px] text-ink/85 mt-6">{judgment.offRecordIntro}</p>
        </Item>
        <Item>
          <p className="font-accent italic text-[30px] leading-snug text-wine text-center my-4 [text-wrap:balance]">
            {judgment.offRecordLine}
          </p>
        </Item>
        <Item>
          <p className="font-sans font-semibold text-center text-ink">{judgment.adjourned}</p>
        </Item>

        <Item className="pt-7 space-y-3">
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
