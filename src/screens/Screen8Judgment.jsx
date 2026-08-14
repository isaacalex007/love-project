import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import confetti from 'canvas-confetti'
import config from '../config'
import PageShell from '../components/PageShell'
import WaxSeal from '../components/WaxSeal'

const CONFETTI_COLORS = ['#D96C8A', '#C9A227', '#F3D9DC']

function buildWaLink(number, text) {
  const digits = String(number).replace(/\D/g, '')
  const base = `https://wa.me/${digits}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/**
 * Screen 8 — Judgment & Celebration. One orchestrated confetti burst,
 * the seal re-forms to stamp the ruling, and WhatsApp delivers it.
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
    // One orchestrated celebration: hearts if supported, petals otherwise.
    // shapeFromText bakes the glyph color in — tint one heart per palette color.
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
    <PageShell>
      <div className="flex justify-center">
        <WaxSeal mode="stamp" size={104} />
      </div>

      <h2 className="stamp-text text-sm text-wine text-center mt-4">{judgment.title}</h2>
      <p className="font-display font-extrabold text-4xl text-center text-rose mt-2 mb-6">
        {judgment.granted}
      </p>

      <div className="bg-blush/60 border border-rose/25 rounded-lg px-4 py-4">
        <h3 className="stamp-text text-xs text-wine mb-3">{judgment.orderTitle}</h3>
        <ul className="font-body text-[15px] leading-relaxed space-y-2">
          <li>📍 {dateType?.orderText}</li>
          <li>📅 {weekend?.ownDate ? weekend.orderText : weekend?.label}</li>
          <li>{judgment.travelLine}</li>
        </ul>
      </div>

      <p className="font-body text-[15px] mt-6">{judgment.offRecordIntro}</p>
      <p className="font-display italic font-semibold text-2xl text-wine text-center my-4 [text-wrap:balance]">
        {judgment.offRecordLine}
      </p>
      <p className="font-body font-semibold text-center">{judgment.adjourned}</p>

      <div className="mt-auto pt-8 space-y-4">
        <a
          href={deliverLink}
          target="_blank"
          rel="noopener noreferrer"
          className="stamp-text block text-center w-full min-h-[48px] px-5 py-3.5 rounded border-2 border-wine bg-wine text-paper text-sm active:bg-wine/90"
        >
          {judgment.deliverButton}
        </a>
        <a
          href={remarksLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body italic block text-center text-sm text-ink/60 underline underline-offset-4 min-h-[44px] py-3"
        >
          {judgment.remarksLink}
        </a>
      </div>
    </PageShell>
  )
}
