import config from '../config'
import PageShell from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import ExhibitTab from '../components/ExhibitTab'

/**
 * Screen 3 — Exhibit B: the confession, then the qualifications checklist.
 */
export default function Screen3ExhibitB({ onNext }) {
  const { exhibitB } = config
  return (
    <PageShell>
      <ExhibitTab label={exhibitB.tab} />

      <h2 className="font-display font-bold text-xl text-center mb-1">{exhibitB.confessionTitle}</h2>
      <div className="letterhead-rule my-3" />

      <p className="font-body text-[15px] mb-3">{exhibitB.confessionIntro}</p>
      <div className="font-body text-[15px] leading-relaxed space-y-3">
        {exhibitB.confessionParagraphs.map((p, i) => (
          <p key={i} className={i === exhibitB.confessionParagraphs.length - 1 ? 'font-medium' : ''}>
            {p}
          </p>
        ))}
      </div>

      <div className="letterhead-rule my-5" />

      <h3 className="stamp-text text-sm text-wine text-center">{exhibitB.qualificationsTitle}</h3>
      <p className="font-body italic text-sm text-ink/60 text-center mb-4">
        {exhibitB.qualificationsNote}
      </p>

      <ul className="font-body text-[15px] leading-relaxed space-y-2.5">
        {exhibitB.perks.map((perk, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="text-wine shrink-0" aria-hidden="true">
              ☑︎
            </span>
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onNext}>{exhibitB.nextButton}</PrimaryButton>
      </div>
    </PageShell>
  )
}
