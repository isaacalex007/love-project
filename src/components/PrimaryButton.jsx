import { motion } from 'framer-motion'

/**
 * The standard "advance the case" button — wine ink on paper, stamp type.
 */
export default function PrimaryButton({ children, onClick, disabled = false, className = '' }) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.96 }}
      onClick={onClick}
      disabled={disabled}
      className={`stamp-text w-full min-h-[48px] px-5 py-3 rounded border-2 text-sm transition-colors
        ${
          disabled
            ? 'border-ink/20 text-ink/30 cursor-not-allowed'
            : 'border-wine bg-wine text-paper active:bg-wine/90'
        } ${className}`}
    >
      {children}
    </motion.button>
  )
}
