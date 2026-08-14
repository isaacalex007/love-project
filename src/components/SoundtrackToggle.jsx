import { useRef, useState } from 'react'
import config from '../config'

/**
 * Optional "🎵 play soundtrack" toggle. Renders only when enabled in config
 * and a clip is provided. Sound is OFF by default.
 */
export default function SoundtrackToggle() {
  const { enabled, src, label, stopLabel } = config.soundtrack
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  if (!enabled || !src) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <div className="fixed bottom-3 right-3 z-40 pointer-events-none">
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        onClick={toggle}
        className="stamp-text pointer-events-auto text-[11px] bg-paper/90 border border-gold text-ink/70 rounded-full px-4 min-h-[44px] shadow"
      >
        {playing ? stopLabel : label}
      </button>
    </div>
  )
}
