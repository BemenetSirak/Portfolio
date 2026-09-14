import { useState } from 'react'
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
// settle). Once fully unrolled, normal wheel/trackpad/touch scrolling
// takes over for everything below the fold — this only gates the
// opening reveal, never routine scrolling.
//
// `children` stays inside the exact same wrapper element the whole
// time; only classNames/inline styles change between "closed" and
// "open". An earlier version swapped between `<div>…children…</div>`
// and bare `children` depending on state — a different element shape
// at the same tree position, which forces React to unmount and
// remount the entire subtree on open. That silently destroyed and
// recreated every section (Things I Love, Gallery, Contact…), so the
// IntersectionObserver driving `.v-reveal` — set up once, higher up,
// against the *original* DOM nodes — ended up watching detached
// elements. The new nodes never got marked visible until a full page
// reload reran everything from scratch. Keeping one stable wrapper
// avoids the remount entirely.
export default function ScriptoriumGate({ children }) {
  const [open, setOpen] = useState(alreadyOpened)
  const y = useMotionValue(0)

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
    setOpen(true)
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

  return (
    <>
      <div className={`scriptorium-window${open ? ' scriptorium-window--open' : ''}`}>
        <motion.div
          className={`scriptorium-reveal${open ? ' scriptorium-reveal--open' : ''}`}
          style={open ? undefined : { clipPath }}
        >
          {children}
        </motion.div>
        {!open && <div className="scriptorium-rolled-hint" aria-hidden="true" />}
      </div>

      {!open && (
        <>
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
        </>
      )}
    </>
  )
}
