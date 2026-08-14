import { useState } from 'react'
import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import CheckRow from '../components/CheckRow'
import PoetryHeart from '../components/PoetrySheet'

/**
 * Screen 3 — The Defense. The hero is hers now: every box starts empty,
 * and she admits each fact into evidence herself. The proceed button
 * stays disabled-glass until all five are ticked, then blooms.
 */
export default function Screen3Defense({ onNext }) {
  const { defense } = config
  const [checked, setChecked] = useState(() => defense.perks.map(() => false))
  const allTicked = checked.every(Boolean)

  const tick = (i) =>
    setChecked((prev) => (prev[i] ? prev : prev.map((c, j) => (j === i ? true : c))))

  return (
    <PageShell>
      <PoetryHeart />

      <Item>
        <h2 className="font-sans font-bold text-[22px] leading-snug tracking-[-0.02em] text-center mt-1">
          {defense.title}
        </h2>
        <hr className="divider my-5" />
      </Item>

      <ul className="space-y-3">
        {defense.perks.map((perk, i) => (
          <CheckRow key={i} index={i} checked={checked[i]} onCheck={() => tick(i)}>
            {perk}
          </CheckRow>
        ))}
      </ul>

      <Item className="pt-7">
        <PrimaryButton onClick={onNext} disabled={!allTicked}>
          {defense.nextButton}
        </PrimaryButton>
      </Item>
    </PageShell>
  )
}
