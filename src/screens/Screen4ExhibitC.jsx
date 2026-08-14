import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import ExhibitTab from '../components/ExhibitTab'
import Polaroid from '../components/Polaroid'
import Accent from '../components/Accents'

/**
 * Screen 4 — Exhibit C: The Subject. Fact cards stagger-float in; the
 * portrait sits in a slow gold shimmer frame.
 */
export default function Screen4ExhibitC({ onNext }) {
  const { exhibitC, photos } = config

  return (
    <PageShell>
      <ExhibitTab label={exhibitC.tab} />
      <Accent icon="plane" className="top-5 right-5" />
      <Accent icon="book" className="bottom-24 left-4" slow />

      <Item>
        <h2 className="font-sans font-bold text-[19px] tracking-[-0.02em] text-center mt-2 mb-1">
          {exhibitC.title}
        </h2>
        <hr className="divider my-4" />
      </Item>

      <Polaroid photo={photos.herPortrait} framed />

      <div className="space-y-3 mt-2">
        {exhibitC.facts.map((fact, i) => (
          <Item key={i}>
            <div className="glass-pill !rounded-2xl flex items-start gap-3 px-4 py-3">
              <span className="text-xl leading-none pt-0.5" aria-hidden="true">
                {fact.emoji}
              </span>
              <p className="text-[15px] leading-snug text-ink/85">
                <span className="font-semibold text-ink">{fact.label}</span> — {fact.text}
              </p>
            </div>
          </Item>
        ))}
      </div>

      <Item>
        <p className="text-[15px] leading-relaxed text-ink/85 mt-5">{exhibitC.outro}</p>
      </Item>

      <Item className="pt-7">
        <PrimaryButton onClick={onNext}>{exhibitC.nextButton}</PrimaryButton>
      </Item>
    </PageShell>
  )
}
