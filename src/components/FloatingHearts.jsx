/**
 * Ambient celebration for the judgment screen: 7 hearts of varied size,
 * speed, and opacity rising from offscreen-bottom for the rest of the
 * session. Pure CSS animation; hidden under reduced motion.
 */

const HEARTS = [
  { left: '8%', size: 14, dur: 11, delay: 0, o: 0.5, sway: 24 },
  { left: '22%', size: 20, dur: 14, delay: 2.2, o: 0.35, sway: -18 },
  { left: '38%', size: 11, dur: 9.5, delay: 4.4, o: 0.55, sway: 14 },
  { left: '54%', size: 17, dur: 13, delay: 1.1, o: 0.4, sway: -26 },
  { left: '68%', size: 12, dur: 10, delay: 3.6, o: 0.5, sway: 20 },
  { left: '82%', size: 22, dur: 16, delay: 0.6, o: 0.3, sway: -14 },
  { left: '92%', size: 13, dur: 12, delay: 5.2, o: 0.45, sway: 16 },
]

export default function FloatingHearts() {
  return (
    <div aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="heart-rise"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            '--o': h.o,
            '--sway': `${h.sway}px`,
          }}
        >
          ❤︎
        </span>
      ))}
    </div>
  )
}
