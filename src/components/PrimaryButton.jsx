import { motion } from 'framer-motion'

/**
 * Primary pill: rose→wine gradient with a soft glow; presses to 0.97.
 * While disabled it sits as quiet glass; when it becomes enabled the
 * gradient blooms in over the glass.
 */
export default function PrimaryButton({ children, onClick, disabled = false, className = '' }) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`label relative overflow-hidden w-full min-h-[50px] px-6 py-3.5 text-[13px] rounded-full transition-colors
        ${disabled ? 'glass-pill text-ink/35 cursor-not-allowed' : 'text-paper'} ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className="btn-gradient absolute inset-0"
        initial={false}
        animate={{ opacity: disabled ? 0 : 1, scale: disabled ? 0.94 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />
      <span className="relative">{children}</span>
    </motion.button>
  )
}
