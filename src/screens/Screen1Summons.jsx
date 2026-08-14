import { motion, useReducedMotion } from 'framer-motion'
import config from '../config'
import WaxSeal from '../components/WaxSeal'
import Chip from '../components/Chip'
import Accent from '../components/Accents'
import PoetryHeart from '../components/PoetrySheet'

/**
 * Screen 1 — The Summons. Every line is sharp from first paint; breaking
 * the seal (the hero) slides the case open.
 */
export default function Screen1Summons({ onNext }) {
  const { summons } = config
  const reduced = useReducedMotion()

  return (
    <motion.section
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, x: -40 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="relative min-h-dvh flex flex-col items-center justify-center px-4 pt-[76px] pb-10"
    >
      <div className="glass-card relative w-full max-w-md px-6 py-10 text-center">
        <PoetryHeart />
        <Accent icon="scales" className="bottom-5 left-5" slow />

        <div className="flex justify-center mb-6">
          <Chip tone="wine" entrance="drop" rotate={-3} delay={0.5}>
            {summons.chip}
          </Chip>
        </div>

        <h1 className="font-sans font-bold text-[20px] leading-snug tracking-[-0.02em]">
          {summons.court}
        </h1>
        <p className="text-[15px] text-ink/70 mt-3">{summons.attention}</p>

        <p className="font-sans font-semibold text-[17px] mt-5">{summons.summoned}</p>

        <div className="mt-7 flex justify-center">
          <WaxSeal onBroken={onNext} ariaLabel="Break the seal and open the case" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="label text-[10px] text-ink/45 mt-4"
        >
          {summons.sealHint}
        </motion.p>
      </div>
    </motion.section>
  )
}
