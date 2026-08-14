import config from '../config'
import PageShell from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import ScalesFlourish from '../components/ScalesFlourish'

/**
 * Screen 1 — The Case Caption. Letterhead style.
 */
export default function Screen1Caption({ onNext }) {
  const { caption, him } = config
  return (
    <PageShell>
      <div className="flex justify-center">
        <ScalesFlourish />
      </div>

      <div className="letterhead-rule my-4" />

      <div className="text-center space-y-1">
        <p className="font-display font-bold text-2xl">{him.firstName}</p>
        <p className="font-body italic text-sm text-ink/70">{caption.plaintiffNote}</p>
        <p className="font-display text-xl py-1">v.</p>
        <p className="font-display font-bold text-lg tracking-wide">{caption.defendantName}</p>
        <p className="font-body italic text-sm text-ink/70">{caption.defendantNote}</p>
      </div>

      <div className="letterhead-rule my-4" />

      <h2 className="stamp-text text-center text-sm text-wine mb-4">{caption.preliminaryTitle}</h2>

      <div className="font-body text-[15px] leading-relaxed space-y-3">
        {caption.preliminaryParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <p className="font-display italic font-semibold text-3xl text-center text-wine my-6 [text-wrap:balance]">
        {caption.bigLine}
      </p>

      <p className="font-body text-[15px] leading-relaxed">{caption.afterBigLine}</p>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onNext}>{caption.nextButton}</PrimaryButton>
      </div>
    </PageShell>
  )
}
