/**
 * A photo rendered as a slightly-rotated polaroid with a typewriter caption.
 * Renders nothing if no src is configured — the app works with zero photos.
 */
export default function Polaroid({ photo, rotate = -2, framed = false }) {
  if (!photo?.src) return null
  return (
    <figure
      className={`mx-auto my-5 w-56 bg-white p-2 pb-3 shadow-lg ${framed ? 'ring-4 ring-gold' : ''}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <img src={photo.src} alt="" className="w-full h-auto max-w-full" />
      <figcaption className="stamp-text text-[10px] text-ink/70 mt-2 normal-case tracking-normal">
        {photo.caption}
      </figcaption>
    </figure>
  )
}
