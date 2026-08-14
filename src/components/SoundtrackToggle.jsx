import { useRef, useState } from 'react'
import config from '../config'

/**
 * Floating soundtrack toggle. While playing, three tiny equalizer bars
 * animate beside the note. Sound is OFF by default.
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
    <div className="fixed top-3 right-4 z-40 pointer-events-none">
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        onClick={toggle}
        className="label pointer-events-auto glass-pill flex items-center gap-2 text-[10px] text-ink/70 px-4 min-h-[44px] shadow-sm"
      >
        {playing && (
          <span className="flex items-end gap-[2px] h-[12px]" aria-hidden="true">
            <span className="eq-bar" style={{ animationDelay: '0s' }} />
            <span className="eq-bar" style={{ animationDelay: '0.25s' }} />
            <span className="eq-bar" style={{ animationDelay: '0.5s' }} />
          </span>
        )}
        {playing ? stopLabel : label}
      </button>
    </div>
  )
}
