import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import CheckRow from '../components/CheckRow'
import Accent from '../components/Accents'

/**
 * Screen 3 — The Defense. The hero: four rows tick in one at a time,
 * each checkbox drawing its stroke with a small pop.
 */
export default function Screen3Defense({ onNext }) {
  const { defense } = config
  return (
    <PageShell>
      <Accent icon="heart" className="top-5 right-5" slow />

      <Item>
        <h2 className="font-sans font-bold text-[24px] tracking-[-0.02em] text-center mt-1">
          {defense.title}
        </h2>
        <hr className="divider my-5" />
      </Item>

      <ul className="space-y-4">
        {defense.perks.map((perk, i) => (
          <CheckRow key={i} index={i} baseDelay={0.45}>
            {perk}
          </CheckRow>
        ))}
      </ul>

      <Item className="pt-8">
        <PrimaryButton onClick={onNext}>{defense.nextButton}</PrimaryButton>
      </Item>
    </PageShell>
  )
}
