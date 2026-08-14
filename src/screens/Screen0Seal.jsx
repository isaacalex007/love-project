import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import config from '../config'
import WaxSeal from '../components/WaxSeal'
import Chip from '../components/Chip'
import Accent from '../components/Accents'

/**
 * Screen 0 — The Sealed File. The card rises in with the record softly
 * blurred behind the seal; breaking the seal unblurs it (8px→0) as the
 * halves fly apart, then the case opens.
 */
export default function Screen0Seal({ onNext }) {
  const { caseMeta, her } = config
  const reduced = useReducedMotion()
  const [broken, setBroken] = useState(false)

  return (
    <motion.section
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, x: -40, filter: 'blur(4px)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="relative min-h-dvh flex flex-col items-center justify-center px-4 pt-12 pb-24"
    >
      <div className="glass-card relative w-full max-w-md px-6 py-10 text-center">
        <Accent icon="heart" className="top-5 right-5" />
        <Accent icon="scales" className="bottom-5 left-5" slow />

        <div className="flex justify-center mb-6">
          <Chip tone="wine" entrance="drop" rotate={-3} delay={0.5}>
            {caseMeta.confidentialStamp}
          </Chip>
        </div>

        {/* the record, softly blurred until the seal breaks */}
        <motion.div
          initial={reduced ? {} : { filter: 'blur(8px)' }}
          animate={reduced ? {} : { filter: broken ? 'blur(0px)' : 'blur(8px)' }}
          transition={{ duration: 0.5, delay: broken ? 0.1 : 0 }}
        >
          <h1 className="font-sans font-bold text-[19px] leading-snug tracking-[-0.02em]">
            {caseMeta.court}
          </h1>
          <p className="text-sm text-ink/60 mt-1">{caseMeta.holden}</p>
          <p className="label text-[10px] text-ink/50 mt-3">{caseMeta.suitNo}</p>

          <div className="mt-6">
            <p className="text-sm text-ink/60">For the attention of:</p>
            <p className="font-accent italic text-[30px] leading-tight text-wine mt-1">
              Barr. {her.fullFirstName} {her.surname}
            </p>
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <WaxSeal
            onCrackStart={() => setBroken(true)}
            onBroken={onNext}
            ariaLabel="Break the seal and open the case file"
          />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-ink/60 italic max-w-[300px] mt-6 text-center"
      >
        {caseMeta.sealInstruction}
      </motion.p>
    </motion.section>
  )
}
