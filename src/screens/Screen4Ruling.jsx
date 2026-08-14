import { motion, useReducedMotion } from 'framer-motion'
import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'

function OptionCard({ selected, onSelect, emoji, label, compact = false }) {
  const reduced = useReducedMotion()
  const card = (
    <motion.button
      whileTap={reduced ? undefined : { y: -6, boxShadow: '0 14px 30px -8px rgba(46,31,39,0.18)' }}
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full text-left min-h-[48px] px-4 py-3 transition-colors rounded-[18px]
        ${selected ? 'bg-white/80' : 'glass-pill !rounded-[18px] active:bg-white/70'}
        ${compact ? 'text-center' : ''}`}
    >
      <span className="text-[15px] leading-snug block text-ink font-semibold">
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
        {label}
      </span>
    </motion.button>
  )
  return selected ? <div className="grad-border">{card}</div> : <div className="p-[2px]">{card}</div>
}

/**
 * Screen 4 — Your Ruling. Cards lift on press; the chosen one earns the
 * animated gradient border (the hero) and an emoji bounce. The continue
 * button blooms once both orders exist.
 */
export default function Screen4Ruling({ selections, onSelect, onNext }) {
  const { ruling } = config
  const ready = selections.dateType && selections.weekend

  return (
    <PageShell>
      <Item>
        <h2 className="font-sans font-bold text-[24px] tracking-[-0.02em] text-center mt-1">
          {ruling.title}
        </h2>
        <hr className="divider my-4" />
      </Item>

      <Item>
        <p className="text-[15px] italic text-ink/70 mb-2.5">{ruling.question1}</p>
      </Item>
      <div className="space-y-1.5">
        {ruling.dateOptions.map((opt) => (
          <Item key={opt.id}>
            <OptionCard
              selected={selections.dateType?.id === opt.id}
              onSelect={() => onSelect('dateType', opt)}
              emoji={opt.emoji}
              label={opt.label}
            />
          </Item>
        ))}
      </div>

      <Item>
        <p className="text-[15px] italic text-ink/70 mt-5 mb-2.5">{ruling.question2}</p>
      </Item>
      <div className="grid grid-cols-2 gap-1.5">
        {ruling.weekendOptions.map((opt) => (
          <Item key={opt.id} className={opt.ownDate ? 'col-span-2' : ''}>
            <OptionCard
              selected={selections.weekend?.id === opt.id}
              onSelect={() => onSelect('weekend', opt)}
              label={opt.label}
              compact={!opt.ownDate}
            />
          </Item>
        ))}
      </div>

      <Item>
        <p className="text-xs italic text-ink/55 mt-4 text-center">{ruling.binding}</p>
      </Item>

      <Item className="pt-5">
        <PrimaryButton onClick={onNext} disabled={!ready}>
          {ruling.nextButton}
        </PrimaryButton>
      </Item>
    </PageShell>
  )
}
