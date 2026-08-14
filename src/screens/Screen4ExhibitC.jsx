import { motion, useReducedMotion } from 'framer-motion'
import config from '../config'
import PageShell from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import ExhibitTab from '../components/ExhibitTab'
import Polaroid from '../components/Polaroid'

/**
 * Screen 4 — Exhibit C: The Subject. Her section — floating fact cards.
 */
export default function Screen4ExhibitC({ onNext }) {
  const { exhibitC, photos } = config
  const reduced = useReducedMotion()

  return (
    <PageShell>
      <ExhibitTab label={exhibitC.tab} />

      <h2 className="font-display font-bold text-xl text-center mb-1">{exhibitC.title}</h2>
      <div className="letterhead-rule my-3" />

      <Polaroid photo={photos.herPortrait} rotate={2} framed />

      <div className="space-y-3 mt-2">
        {exhibitC.facts.map((fact, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="bg-blush/70 border border-rose/25 rounded-lg px-4 py-3"
          >
            <motion.div
              animate={reduced ? {} : { y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut', delay: i * 0.5 }}
              className="flex items-start gap-3"
            >
              <span className="text-xl leading-none pt-0.5" aria-hidden="true">
                {fact.emoji}
              </span>
              <p className="font-body text-[15px] leading-snug">
                <span className="font-semibold">{fact.label}</span> — {fact.text}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <p className="font-body text-[15px] leading-relaxed mt-5">{exhibitC.outro}</p>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onNext}>{exhibitC.nextButton}</PrimaryButton>
      </div>
    </PageShell>
  )
}
