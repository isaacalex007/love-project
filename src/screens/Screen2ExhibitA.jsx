import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import ExhibitTab from '../components/ExhibitTab'
import Polaroid from '../components/Polaroid'
import Accent from '../components/Accents'

/**
 * Screen 2 — Exhibit A: Evidence of Interest. The photo settling into
 * place is the moment; the entries follow.
 */
export default function Screen2ExhibitA({ onNext }) {
  const { exhibitA, photos } = config
  return (
    <PageShell>
      <ExhibitTab label={exhibitA.tab} />
      <Accent icon="envelope" className="top-5 right-5" />

      <Item>
        <h2 className="font-sans font-bold text-[19px] tracking-[-0.02em] text-center mt-2 mb-1">
          {exhibitA.title}
        </h2>
        <hr className="divider my-4" />
      </Item>

      <Polaroid photo={photos.firstDate} />

      <Item>
        <p className="text-[15px] text-ink/85 mb-4">{exhibitA.intro}</p>
      </Item>

      <Item className="text-[15px] leading-relaxed text-ink/85 space-y-4">
        <p>
          <span className="label text-[10px] text-rose mr-2">A-2</span>
          {exhibitA.itemA2}
        </p>
        <p>
          <span className="label text-[10px] text-rose mr-2">A-3</span>
          {exhibitA.itemA3}
        </p>
      </Item>

      <Item>
        <p className="text-sm italic text-ink/55 mt-5">{exhibitA.footnote}</p>
      </Item>

      <Item className="pt-7">
        <PrimaryButton onClick={onNext}>{exhibitA.nextButton}</PrimaryButton>
      </Item>
    </PageShell>
  )
}
