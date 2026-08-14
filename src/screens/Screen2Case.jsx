import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import ScratchPhoto from '../components/ScratchPhoto'
import PoetryHeart from '../components/PoetrySheet'

/**
 * Screen 2 — The Case. The hero: Exhibit A hides under scratch-off foil;
 * she uncovers the evidence herself.
 */
export default function Screen2Case({ onNext }) {
  const { him, theCase, photo } = config
  return (
    <PageShell>
      <PoetryHeart />

      <Item>
        <h2 className="font-sans font-bold text-[24px] leading-snug tracking-[-0.02em] text-center mt-1">
          {him.firstName} <span className="font-medium text-ink/50">v.</span> {theCase.defendant}
        </h2>
        <hr className="divider my-4" />
      </Item>

      <Item>
        <p className="text-[16px] leading-[1.6] text-ink/85 text-center">{theCase.charge}</p>
      </Item>

      <ScratchPhoto photo={photo} />

      <Item className="pt-4">
        <PrimaryButton onClick={onNext}>{theCase.nextButton}</PrimaryButton>
      </Item>
    </PageShell>
  )
}
