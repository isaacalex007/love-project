/**
 * Small scales-of-justice flourish in gold, with a heart at the top —
 * the case-file's recurring emblem.
 */
export default function ScalesFlourish({ size = 44, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* heart at the top of the post */}
      <path
        d="M24 8.5c-1.4-2.4-4.6-2.8-6-.9-1.2 1.6-.7 3.8 1.2 5.4L24 16.4l4.8-3.4c1.9-1.6 2.4-3.8 1.2-5.4-1.4-1.9-4.6-1.5-6 .9Z"
        fill="#D96C8A"
      />
      {/* post */}
      <line x1="24" y1="16" x2="24" y2="38" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
      {/* crossbar */}
      <line x1="8" y1="20" x2="40" y2="20" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
      {/* chains */}
      <line x1="8" y1="20" x2="4" y2="29" stroke="#C9A227" strokeWidth="1.5" />
      <line x1="8" y1="20" x2="12" y2="29" stroke="#C9A227" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="36" y2="29" stroke="#C9A227" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="44" y2="29" stroke="#C9A227" strokeWidth="1.5" />
      {/* pans */}
      <path d="M2 29h12a6 6 0 0 1-12 0Z" fill="#C9A227" opacity="0.85" />
      <path d="M34 29h12a6 6 0 0 1-12 0Z" fill="#C9A227" opacity="0.85" />
      {/* base */}
      <line x1="17" y1="40" x2="31" y2="40" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
