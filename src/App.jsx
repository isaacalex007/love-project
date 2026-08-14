import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import ProgressRule from './components/ProgressRule'
import SoundtrackToggle from './components/SoundtrackToggle'
import Screen0Seal from './screens/Screen0Seal'
import Screen1Caption from './screens/Screen1Caption'
import Screen2ExhibitA from './screens/Screen2ExhibitA'
import Screen3ExhibitB from './screens/Screen3ExhibitB'
import Screen4ExhibitC from './screens/Screen4ExhibitC'
import Screen5Motion from './screens/Screen5Motion'
import Screen6Directions from './screens/Screen6Directions'
import Screen7Verdict from './screens/Screen7Verdict'
import Screen8Judgment from './screens/Screen8Judgment'

const TOTAL_STEPS = 8

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
    <Screen0Seal key={0} onNext={next} />,
    <Screen1Caption key={1} onNext={next} />,
    <Screen2ExhibitA key={2} onNext={next} />,
    <Screen3ExhibitB key={3} onNext={next} />,
    <Screen4ExhibitC key={4} onNext={next} />,
    <Screen5Motion key={5} onNext={next} />,
    <Screen6Directions key={6} selections={selections} onSelect={select} onNext={next} />,
    <Screen7Verdict key={7} onGranted={next} />,
    <Screen8Judgment key={8} selections={selections} />,
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
