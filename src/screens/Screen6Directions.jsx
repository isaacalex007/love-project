import { motion, useReducedMotion } from 'framer-motion'
import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'

function OptionCard({ selected, onSelect, emoji, children }) {
  const reduced = useReducedMotion()
  const card = (
    <motion.button
      whileTap={reduced ? undefined : { y: -6, boxShadow: '0 14px 30px -8px rgba(46,31,39,0.18)' }}
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full text-left min-h-[48px] px-4 py-3 transition-colors rounded-[18px]
        ${selected ? 'bg-white/80' : 'glass-pill !rounded-[18px] active:bg-white/70'}`}
    >
      <span className="text-[15px] leading-snug block text-ink/85">
        {emoji && (
          <motion.span
            className="mr-2 inline-block"
            aria-hidden="true"
            animate={selected && !reduced ? { scale: [1, 1.3, 1], rotate: [0, -10, 0] } : {}}
            transition={{ duration: 0.45 }}
          >
            {emoji}
          </motion.span>
        )}
        {children}
      </span>
    </motion.button>
  )

  // selected cards get the animated rose→gold gradient border
  return selected ? <div className="grad-border">{card}</div> : <div className="p-[2px]">{card}</div>
}

/**
 * Screen 6 — The Court's Directions. Cards lift on press; the chosen one
 * earns an animated gradient border and one happy emoji bounce. The
 * continue button stays disabled-glass until both orders exist, then
 * blooms into the gradient pill.
 */
export default function Screen6Directions({ selections, onSelect, onNext }) {
  const { directions } = config
  const ready = selections.dateType && selections.weekend

  return (
    <PageShell>
      <Item>
        <h2 className="label text-[11px] text-wine text-center mt-1">The Court’s Directions</h2>
        <hr className="divider my-4" />
      </Item>

      <Item>
        <p className="text-[15px] italic text-ink/75 mb-3">{directions.question1}</p>
      </Item>
      <div className="space-y-2">
        {directions.dateOptions.map((opt) => (
          <Item key={opt.id}>
            <OptionCard
              selected={selections.dateType?.id === opt.id}
              onSelect={() => onSelect('dateType', opt)}
              emoji={opt.emoji}
            >
              <span className="font-semibold text-ink">{opt.label}</span>
              {opt.description && <span className="text-ink/70"> — {opt.description}</span>}
            </OptionCard>
          </Item>
        ))}
      </div>

      <Item>
        <p className="text-[15px] italic text-ink/75 mt-6 mb-3">{directions.question2}</p>
      </Item>
      <div className="space-y-2">
        {directions.weekendOptions.map((opt) => (
          <Item key={opt.id}>
            <OptionCard
              selected={selections.weekend?.id === opt.id}
              onSelect={() => onSelect('weekend', opt)}
            >
              <span className="font-semibold text-ink">{opt.label}</span>
              {opt.sub && <span className="italic text-ink/55"> {opt.sub}</span>}
            </OptionCard>
          </Item>
        ))}
      </div>

      <Item>
        <p className="text-xs italic text-ink/55 mt-4">{directions.smallPrint}</p>
      </Item>

      <Item className="pt-6">
        <PrimaryButton onClick={onNext} disabled={!ready}>
          {directions.nextButton}
        </PrimaryButton>
      </Item>
    </PageShell>
  )
}
