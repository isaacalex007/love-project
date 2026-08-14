/**
 * Gold exhibit tab clinging to the left edge of the document.
 */
export default function ExhibitTab({ label }) {
  return (
    <div
      className="absolute left-0 top-8 -translate-x-1 bg-gold text-paper stamp-text text-[10px] py-2 px-1.5 rounded-r-md shadow-md"
      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      aria-hidden="true"
    >
      {label}
    </div>
  )
}
