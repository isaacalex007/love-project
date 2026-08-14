/**
 * Small flat illustrated elements in the palette, floating at card corners
 * with a slow bob. Two bob speeds give slight parallax between layers.
 * Tasteful density: 2–3 per screen, positioned by the caller.
 */

const ICONS = {
  heart: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path
        d="M13 22C7 17.5 3 13.8 3 9.6 3 6.5 5.4 4 8.4 4c1.9 0 3.6 1 4.6 2.6C14 5 15.7 4 17.6 4c3 0 5.4 2.5 5.4 5.6 0 4.2-4 7.9-10 12.4Z"
        fill="#D96C8A"
        opacity="0.85"
      />
    </svg>
  ),
  scales: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <line x1="14" y1="5" x2="14" y2="22" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="5" y1="8" x2="23" y2="8" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2 13h6a3 3 0 0 1-6 0Z" fill="#C9A227" opacity="0.9" />
      <path d="M20 13h6a3 3 0 0 1-6 0Z" fill="#C9A227" opacity="0.9" />
      <line x1="10" y1="23" x2="18" y2="23" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="4" r="2" fill="#D96C8A" />
    </svg>
  ),
  envelope: (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
      <rect x="2" y="4" width="24" height="17" rx="4" fill="#F3D9DC" />
      <path d="M3.5 6.5 14 14 24.5 6.5" stroke="#7A2E42" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M14 1.6c-.8-1.3-2.6-1.5-3.4-.5-.7.9-.4 2.2.7 3.1L14 6.4l2.7-2.2c1.1-.9 1.4-2.2.7-3.1-.8-1-2.6-.8-3.4.5Z"
        fill="#D96C8A"
      />
    </svg>
  ),
  plane: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M25 3 3 12.5l7 2.6L12.5 25l4.2-6.8L25 3Z" fill="#C9A227" opacity="0.85" />
      <path d="M10 15.1 25 3 12.5 18.2" fill="#7A2E42" opacity="0.35" />
    </svg>
  ),
  book: (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
      <path d="M14 4C11 2 6.5 1.6 3 2.4V20c3.5-.8 8-.4 11 1.6V4Z" fill="#7A2E42" opacity="0.75" />
      <path d="M14 4c3-2 7.5-2.4 11-1.6V20c-3.5-.8-8-.4-11 1.6V4Z" fill="#D96C8A" opacity="0.75" />
      <line x1="14" y1="4.5" x2="14" y2="21" stroke="#FBF3EC" strokeWidth="1.2" />
    </svg>
  ),
}

export default function Accent({ icon, className = '', slow = false }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${slow ? 'bob-slow' : 'bob'} ${className}`}
    >
      {ICONS[icon]}
    </span>
  )
}
