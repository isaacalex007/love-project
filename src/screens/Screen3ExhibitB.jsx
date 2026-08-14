import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import ExhibitTab from '../components/ExhibitTab'
import CheckRow from '../components/CheckRow'
import Accent from '../components/Accents'

/**
 * Screen 3 — Exhibit B. The hero: qualifications tick in one at a time,
 * each checkbox drawing its stroke with a small pop. The screen she'll
 * rewatch.
 */
export default function Screen3ExhibitB({ onNext }) {
  const { exhibitB } = config
  return (
    <PageShell>
      <ExhibitTab label={exhibitB.tab} />
      <Accent icon="heart" className="top-5 right-5" slow />

      <Item>
        <h2 className="font-sans font-bold text-[19px] tracking-[-0.02em] text-center mt-2 mb-1">
          {exhibitB.confessionTitle}
        </h2>
        <hr className="divider my-4" />
      </Item>

      <Item>
        <p className="text-[15px] text-ink/85 mb-3">{exhibitB.confessionIntro}</p>
      </Item>
      <Item className="text-[15px] leading-relaxed text-ink/85 space-y-3">
        {exhibitB.confessionParagraphs.map((p, i) => (
          <p key={i} className={i === exhibitB.confessionParagraphs.length - 1 ? 'font-medium text-ink' : ''}>
            {p}
          </p>
        ))}
      </Item>

      <Item>
        <hr className="divider my-5" />
        <h3 className="label text-[11px] text-wine text-center">{exhibitB.qualificationsTitle}</h3>
        <p className="text-sm italic text-ink/55 text-center mt-1 mb-5">
          {exhibitB.qualificationsNote}
        </p>
      </Item>

      <ul className="space-y-3">
        {exhibitB.perks.map((perk, i) => (
          <CheckRow key={i} index={i} baseDelay={0.5}>
            {perk}
          </CheckRow>
        ))}
      </ul>

      <Item className="pt-7">
        <PrimaryButton onClick={onNext}>{exhibitB.nextButton}</PrimaryButton>
      </Item>
    </PageShell>
  )
}
