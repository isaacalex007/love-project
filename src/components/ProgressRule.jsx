import { motion } from 'framer-motion'

/**
 * Thin rose→gold gradient progress bar; a small heart rides its leading edge.
 */
export default function ProgressRule({ step, total }) {
  const pct = (step / total) * 100
  return (
    <div className="fixed top-0 inset-x-0 h-1 bg-white/40 z-40">
      <motion.div
        className="relative h-full"
        style={{ background: 'linear-gradient(90deg, #D96C8A, #C9A227)' }}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 22 }}
      >
        <span
          aria-hidden="true"
          className="absolute -right-1.5 -top-[5px] text-[10px] text-rose leading-none select-none"
        >
          ❤︎
        </span>
      </motion.div>
    </div>
  )
}
