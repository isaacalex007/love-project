import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import ProgressRule from './components/ProgressRule'
import SoundtrackToggle from './components/SoundtrackToggle'
import Screen1Summons from './screens/Screen1Summons'
import Screen2Case from './screens/Screen2Case'
import Screen3Defense from './screens/Screen3Defense'
import Screen4Ruling from './screens/Screen4Ruling'
import Screen5Verdict from './screens/Screen5Verdict'

const TOTAL_STEPS = 4 // five screens, progress fills over four advances

/**
 * The whole case is a single state machine: a step index plus her selections.
 * All copy lives in src/config.js.
 */
export default function App() {
  const [step, setStep] = useState(0)
  const [selections, setSelections] = useState({ dateType: null, weekend: null })

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const select = (key, option) => setSelections((sel) => ({ ...sel, [key]: option }))

  const screens = [
    <Screen1Summons key={0} onNext={next} />,
    <Screen2Case key={1} onNext={next} />,
    <Screen3Defense key={2} onNext={next} />,
    <Screen4Ruling key={3} selections={selections} onSelect={select} onNext={next} />,
    <Screen5Verdict key={4} selections={selections} />,
  ]

  return (
    <>
      <Background />
      <ProgressRule step={step} total={TOTAL_STEPS} />
      <main className="relative overflow-x-clip">
        <AnimatePresence mode="wait">{screens[step]}</AnimatePresence>
      </main>
      <SoundtrackToggle />
    </>
  )
}
