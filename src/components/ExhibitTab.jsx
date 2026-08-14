import Chip from './Chip'

/**
 * Floating exhibit chip at the top-left corner of the document card.
 */
export default function ExhibitTab({ label }) {
  return (
    <div className="absolute -top-3.5 left-5">
      <Chip tone="gold" entrance="drop" delay={0.45} rotate={-2}>
        {label}
      </Chip>
    </div>
  )
}
