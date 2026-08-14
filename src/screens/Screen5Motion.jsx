import config from '../config'
import PageShell from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import Stamp from '../components/Stamp'

/**
 * Screen 5 — The Motion. The centerpiece: big display type, FILED stamp.
 */
export default function Screen5Motion({ onNext }) {
  const { motion: motionCopy } = config
  return (
    <PageShell>
      <div className="flex justify-end">
        <Stamp rotate={8} delay={0.6}>{motionCopy.stamp}</Stamp>
      </div>

      <h2 className="font-display font-semibold text-3xl leading-tight text-center mt-6 mb-8">
        {motionCopy.title}
      </h2>

      <div className="font-body text-[16px] leading-relaxed space-y-5">
        {motionCopy.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <p className="font-medium bg-blush/60 border-l-4 border-gold pl-4 py-3 pr-3 rounded-r">
          {motionCopy.order}
        </p>

        <p>{motionCopy.closing}</p>
      </div>

      <p className="font-body italic text-center text-ink/70 mt-8">{motionCopy.directionNote}</p>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onNext}>{motionCopy.nextButton}</PrimaryButton>
      </div>
    </PageShell>
  )
}
