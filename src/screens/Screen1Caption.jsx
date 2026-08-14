import config from '../config'
import PageShell, { Item } from '../components/PageShell'
import PrimaryButton from '../components/PrimaryButton'
import ScalesFlourish from '../components/ScalesFlourish'
import Accent from '../components/Accents'

/**
 * Screen 1 — The Case Caption. "Mo ní Ṣọlá." in the accent serif is the
 * emotional beat; everything else is quiet UI.
 */
export default function Screen1Caption({ onNext }) {
  const { caption, him } = config
  return (
    <PageShell>
      <Accent icon="heart" className="bottom-6 right-5" />

      <Item className="flex justify-center">
        <ScalesFlourish />
      </Item>

      <Item>
        <hr className="divider my-5" />
      </Item>

      <Item className="text-center space-y-1">
        <p className="font-sans font-bold text-2xl tracking-[-0.02em]">{him.firstName}</p>
        <p className="text-sm text-ink/60 italic">{caption.plaintiffNote}</p>
        <p className="font-sans font-medium text-lg text-ink/50 py-1">v.</p>
        <p className="label text-[13px] text-wine">{caption.defendantName}</p>
        <p className="text-sm text-ink/60 italic">{caption.defendantNote}</p>
      </Item>

      <Item>
        <hr className="divider my-5" />
      </Item>

      <Item>
        <h2 className="label text-[11px] text-rose text-center mb-4">{caption.preliminaryTitle}</h2>
      </Item>

      <Item className="text-[15px] leading-relaxed text-ink/85 space-y-3">
        {caption.preliminaryParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Item>

      <Item>
        <p className="font-accent italic text-[38px] leading-tight text-center text-wine my-6 [text-wrap:balance]">
          {caption.bigLine}
        </p>
      </Item>

      <Item>
        <p className="text-[15px] leading-relaxed text-ink/85">{caption.afterBigLine}</p>
      </Item>

      <Item className="pt-7">
        <PrimaryButton onClick={onNext}>{caption.nextButton}</PrimaryButton>
      </Item>
    </PageShell>
  )
}
