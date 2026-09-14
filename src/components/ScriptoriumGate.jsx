import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useMotionTemplate, animate } from 'framer-motion'
import './ScriptoriumGate.css'

const DRAG_RANGE = 230
const OPEN_THRESHOLD = 0.55
const SESSION_KEY = 'scriptoriumOpened'

function alreadyOpened() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

// The visitor page's initial reveal: the sheet starts rolled shut and
// the visitor drags the handle rod down to unroll it open, with real
// drag physics (constraints + a rubber-band overshoot + a spring
// settle). Once fully unrolled, this unmounts entirely and the page
// behaves like any normal long page — regular wheel/trackpad/touch
// scrolling takes over for everything below the fold. A full literal
// "drag replaces scrolling for the whole page" model was ruled out
// deliberately: with thousands of px of content below, gating routine
// scrolling behind a drag gesture (with no wheel support) would be a
// real usability and accessibility regression, not a flourish.
export default function ScriptoriumGate({ children }) {
  const [open, setOpen] = useState(alreadyOpened)
  const [dismissing, setDismissing] = useState(false)
  const y = useMotionValue(0)
  const settleTimer = useRef(null)

  useEffect(() => () => clearTimeout(settleTimer.current), [])

  const progress = useTransform(y, [0, DRAG_RANGE], [0, 1])
  const bottomInset = useTransform(progress, (v) => `${(1 - v) * 100}%`)
  const clipPath = useMotionTemplate`inset(0px 0px ${bottomInset} 0px)`
  const handleLabel = useTransform(progress, (v) => (v > 0.5 ? 'Unrolling…' : 'Drag to unroll'))

  function finish() {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // best-effort only
    }
    setDismissing(true)
    settleTimer.current = setTimeout(() => setOpen(true), 320)
  }

  function handleDragEnd() {
    const current = y.get()
    if (current > DRAG_RANGE * OPEN_THRESHOLD) {
      animate(y, DRAG_RANGE, { type: 'spring', stiffness: 210, damping: 26, onComplete: finish })
    } else {
      animate(y, 0, { type: 'spring', stiffness: 320, damping: 30 })
    }
  }

  function skip() {
    animate(y, DRAG_RANGE, { duration: 0.5, ease: [0.25, 1, 0.5, 1], onComplete: finish })
  }

  if (open) return children

  return (
    <div className={`scriptorium-gate${dismissing ? ' scriptorium-gate--dismissing' : ''}`} aria-hidden={dismissing}>
      <div className="scriptorium-window">
        <motion.div className="scriptorium-reveal" style={{ clipPath }}>
          {children}
        </motion.div>
        <div className="scriptorium-rolled-hint" aria-hidden="true" />
      </div>

      <div className="scriptorium-track">
        <motion.button
          type="button"
          className="scriptorium-handle"
          drag="y"
          dragConstraints={{ top: 0, bottom: DRAG_RANGE }}
          dragElastic={0.18}
          dragMomentum={false}
          style={{ y }}
          onDragEnd={handleDragEnd}
          onClick={skip}
          aria-label="Drag down, or press, to unroll the page"
        >
          <span className="scriptorium-handle-bar" />
        </motion.button>
      </div>

      <motion.p className="scriptorium-hint">{handleLabel}</motion.p>
      <button type="button" className="scriptorium-skip" onClick={skip}>
        Skip ▸
      </button>
    </div>
  )
}
