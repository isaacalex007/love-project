import { motion } from 'framer-motion'
import config from '../config'
import PageShell from '../components/PageShell'
import WaxSeal from '../components/WaxSeal'
import Stamp from '../components/Stamp'

/**
 * Screen 0 — The Sealed File.
 * A manila-meets-blush folder with the wax seal; she taps it to break in.
 */
export default function Screen0Seal({ onNext }) {
  const { caseMeta, her } = config
  return (
    <PageShell className="items-center justify-center text-center">
      {/* the folder */}
      <div className="relative w-full max-w-[340px]">
        {/* folder tab */}
        <div className="absolute -top-4 left-6 h-5 w-28 rounded-t-lg bg-[#EFD9C4] border border-b-0 border-ink/10" />
        <div className="relative rounded-lg bg-[#F5E3D0] border border-ink/10 shadow-xl px-6 py-10 overflow-hidden">
          {/* CONFIDENTIAL diagonally across */}
          <div className="absolute inset-x-0 top-6 flex justify-center pointer-events-none">
            <Stamp rotate={-12} delay={0.5}>{caseMeta.confidentialStamp}</Stamp>
          </div>

          <div className="mt-12 space-y-1">
            <h1 className="font-display font-bold text-lg leading-snug">{caseMeta.court}</h1>
            <p className="font-body italic text-sm">{caseMeta.holden}</p>
            <p className="stamp-text text-xs text-ink/70 pt-2">{caseMeta.suitNo}</p>
          </div>

          <div className="mt-5 space-y-0.5">
            <p className="font-body text-sm text-ink/70">For the attention of:</p>
            <p className="font-display font-semibold text-xl">
              Barr. {her.fullFirstName} {her.surname}
            </p>
          </div>

          <div className="mt-7 flex justify-center">
            <WaxSeal onBroken={onNext} ariaLabel="Break the seal and open the case file" />
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="font-body italic text-sm text-ink/70 max-w-[300px] mt-6"
      >
        {caseMeta.sealInstruction}
      </motion.p>
    </PageShell>
  )
}
