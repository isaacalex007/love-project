import { createContext, useContext, useRef, useState } from 'react'
import config from '../config'

/**
 * The audio element and playing state live in the provider at the app root
 * so music survives screen changes; the pill button renders inside each
 * screen's card stack — centered directly above the card — and glides with
 * it between screens. Sound is OFF by default.
 */

const SoundtrackContext = createContext({ available: false, playing: false, toggle: () => {} })

export function SoundtrackProvider({ children }) {
  const { enabled, src } = config.soundtrack
  const available = enabled && Boolean(src)
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

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
    <SoundtrackContext.Provider value={{ available, playing, toggle }}>
      {available && <audio ref={audioRef} src={src} loop preload="none" />}
      {children}
    </SoundtrackContext.Provider>
  )
}

export default function SoundtrackToggle({ className = '' }) {
  const { available, playing, toggle } = useContext(SoundtrackContext)
  const { label, stopLabel } = config.soundtrack
  if (!available) return null

  return (
    <button
      onClick={toggle}
      className={`label glass-pill flex items-center gap-2 text-[10px] text-ink/70 px-4 min-h-[44px] shadow-sm ${className}`}
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
  )
}
