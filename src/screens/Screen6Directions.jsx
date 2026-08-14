import { motion } from 'framer-motion'
import config from '../config'
import PageShell from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'

function OptionCard({ selected, onSelect, children }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full text-left min-h-[48px] rounded-lg border-2 px-4 py-3 transition-colors
        ${
          selected
            ? 'border-rose bg-blush/80 shadow-sm'
            : 'border-ink/15 bg-paper active:bg-blush/40'
        }`}
    >
      {children}
    </motion.button>
  )
}

/**
 * Screen 6 — The Court's Directions. Two questions answered by tapping cards.
 * Options are config-driven arrays of arbitrary length; the UI adapts.
 */
export default function Screen6Directions({ selections, onSelect, onNext }) {
  const { directions } = config
  const ready = selections.dateType && selections.weekend

  return (
    <PageShell>
      <h2 className="stamp-text text-sm text-wine text-center mb-1">The Court’s Directions</h2>
      <div className="letterhead-rule my-3" />

      <p className="font-body italic text-[15px] mb-3">{directions.question1}</p>
      <div className="space-y-2.5">
        {directions.dateOptions.map((opt) => (
          <OptionCard
            key={opt.id}
            selected={selections.dateType?.id === opt.id}
            onSelect={() => onSelect('dateType', opt)}
          >
            <span className="font-body text-[15px] leading-snug block">
              <span className="mr-1.5" aria-hidden="true">
                {opt.emoji}
              </span>
              <span className="font-semibold">{opt.label}</span>
              {opt.description && <span className="text-ink/70"> — {opt.description}</span>}
            </span>
          </OptionCard>
        ))}
      </div>

      <p className="font-body italic text-[15px] mt-6 mb-3">{directions.question2}</p>
      <div className="space-y-2.5">
        {directions.weekendOptions.map((opt) => (
          <OptionCard
            key={opt.id}
            selected={selections.weekend?.id === opt.id}
            onSelect={() => onSelect('weekend', opt)}
          >
            <span className="font-body text-[15px] leading-snug block">
              <span className="font-semibold">{opt.label}</span>
              {opt.sub && <span className="italic text-ink/60"> {opt.sub}</span>}
            </span>
          </OptionCard>
        ))}
      </div>

      <p className="font-body italic text-xs text-ink/60 mt-4">{directions.smallPrint}</p>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onNext} disabled={!ready}>
          {directions.nextButton}
        </PrimaryButton>
      </div>
    </PageShell>
  )
}
