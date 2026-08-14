import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import Chip from '../components/Chip'
import Accent from '../components/Accents'

/**
 * Screen 5 — The Motion. Heading fades up, then the FILED chip scales in
 * from 1.4 with blur-to-sharp and lands rotated -3°: the hero beat.
 */
export default function Screen5Motion({ onNext }) {
  const { motion: motionCopy } = config
  return (
    <PageShell>
      <Accent icon="scales" className="bottom-24 left-4" slow />

      <div className="flex justify-end">
        <Chip tone="wine" entrance="stamp" rotate={-3} delay={0.7}>
          {motionCopy.stamp}
        </Chip>
      </div>

      <Item>
        <h2 className="font-sans font-bold text-[30px] leading-[1.12] tracking-[-0.02em] text-center mt-5 mb-7">
          {motionCopy.title}
        </h2>
      </Item>

      <Item className="text-[16px] leading-[1.6] text-ink/85 space-y-5">
        {motionCopy.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Item>

      <Item>
        <div className="glass-pill !rounded-2xl border-l-4 !border-l-gold px-4 py-4 my-5">
          <p className="text-[16px] leading-[1.6] font-medium text-ink">{motionCopy.order}</p>
        </div>
      </Item>

      <Item>
        <p className="text-[16px] leading-[1.6] text-ink/85">{motionCopy.closing}</p>
      </Item>

      <Item>
        <p className="text-center italic text-ink/60 mt-7">{motionCopy.directionNote}</p>
      </Item>

      <Item className="pt-7">
        <PrimaryButton onClick={onNext}>{motionCopy.nextButton}</PrimaryButton>
      </Item>
    </PageShell>
  )
}
