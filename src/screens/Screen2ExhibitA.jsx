import config from '../config'
import PageShell from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import ExhibitTab from '../components/ExhibitTab'
import Polaroid from '../components/Polaroid'

/**
 * Screen 2 — Exhibit A: Evidence of Interest.
 */
export default function Screen2ExhibitA({ onNext }) {
  const { exhibitA, photos } = config
  return (
    <PageShell>
      <ExhibitTab label={exhibitA.tab} />

      <h2 className="font-display font-bold text-xl text-center mb-1">{exhibitA.title}</h2>
      <div className="letterhead-rule my-3" />

      <Polaroid photo={photos.firstDate} rotate={-2.5} />

      <p className="font-body text-[15px] mb-4">{exhibitA.intro}</p>

      <div className="font-body text-[15px] leading-relaxed space-y-4">
        <p>
          <span className="stamp-text text-xs text-wine mr-1.5">A-2.</span>
          {exhibitA.itemA2}
        </p>
        <p>
          <span className="stamp-text text-xs text-wine mr-1.5">A-3.</span>
          {exhibitA.itemA3}
        </p>
      </div>

      <p className="font-body italic text-sm text-ink/60 mt-5">{exhibitA.footnote}</p>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onNext}>{exhibitA.nextButton}</PrimaryButton>
      </div>
    </PageShell>
  )
}
