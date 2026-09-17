import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useMotionTemplate, useReducedMotion, useMotionValueEvent, animate } from 'framer-motion'
import waxSeal from '../assets/scroll/wax-seal.png'
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
export default function ScriptoriumGate({ children, onOpenChange, onProgressChange }) {
  const [open, setOpen] = useState(alreadyOpened)
  const y = useMotionValue(0)
  const reduceMotion = useReducedMotion()

  // Tells the parent when the gate's actually open — including the
  // very first render if this is a repeat visit within the same
  // session (state initializes straight to `true` then, so `finish()`
  // never runs to report it otherwise). Elements outside the gate
  // (the bottom seal) key their own look off this.
  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  const progress = useTransform(y, [0, DRAG_RANGE], [0, 1])
  const bottomInset = useTransform(progress, (v) => `${(1 - v) * 100}%`)
  const clipPath = useMotionTemplate`inset(0px 0px ${bottomInset} 0px)`
  const handleLabel = useTransform(progress, (v) => (v > 0.5 ? 'Unrolling…' : 'Drag to unroll'))
  // The closed-state cylinder is a self-contained cover, not a piece
  // dynamically resized frame-by-frame off the clip-path math — that
  // dynamic-resize approach was what produced the broken-looking
  // diagonal bars earlier. It simply fades/sinks/shrinks away over the
  // drag's first half while the real clip-path reveal underneath does
  // the actual unrolling, and springs right back with `y` on an early
  // release since it's driven by the same underlying progress value.
  const closedScrollOpacity = useTransform(progress, [0, 0.45], [1, 0])
  const closedScrollScale = useTransform(progress, [0, 0.45], [1, 0.86])
  const closedScrollY = useTransform(progress, [0, 0.45], [0, 34])

  // Mirrors live drag progress out to the parent (VisitorLayout), which
  // applies it as a --roll-progress CSS variable straight onto the
  // bottom wooden roller's DOM node — bypassing React state so the
  // roller's rotation/shadow track the drag at full pointer-move
  // frequency instead of one render behind it.
  useMotionValueEvent(progress, 'change', (v) => {
    onProgressChange?.(v)
  })
  useEffect(() => {
    if (open) onProgressChange?.(1)
  }, [open, onProgressChange])

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
    // The drag itself is real, user-driven motion either way, but a
    // visitor who's asked for less motion still doesn't want the
    // springy overshoot/bounce on release — settle directly instead.
    if (current > DRAG_RANGE * OPEN_THRESHOLD) {
      animate(y, DRAG_RANGE, reduceMotion
        ? { duration: 0.15, onComplete: finish }
        : { type: 'spring', stiffness: 210, damping: 26, onComplete: finish })
    } else {
      animate(y, 0, reduceMotion
        ? { duration: 0.15 }
        : { type: 'spring', stiffness: 320, damping: 30 })
    }
  }

  function skip() {
    animate(y, DRAG_RANGE, reduceMotion
      ? { duration: 0.01, onComplete: finish }
      : { duration: 0.5, ease: [0.25, 1, 0.5, 1], onComplete: finish })
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
        {!open && (
          <div className="closed-scroll-view" aria-hidden="true">
            {/* Centering (left: 50%) lives on this static wrapper. Framer
                Motion writes its own `transform` from the style props
                below, which would silently overwrite a translateX(-50%)
                placed on the same element instead of composing with it —
                so the animated scale/sink lives one level down, inside. */}
            <motion.div
              className="closed-scroll-view-inner"
              style={{ opacity: closedScrollOpacity, scale: closedScrollScale, y: closedScrollY }}
            >
              <span className="closed-scroll-groundshadow" />
              <div className="closed-scroll-cylinder" />
              <span className="closed-scroll-tie" />
              <img className="closed-scroll-seal" src={waxSeal} alt="" />
            </motion.div>
          </div>
        )}
      </div>

      {!open && (
        <>
          <div className="scriptorium-track">
            {!reduceMotion && <span className="scriptorium-drag-cue" aria-hidden="true" />}
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
              aria-label="Drag down to unroll the page"
              aria-describedby="scriptorium-instructions"
            >
              <span className="scriptorium-handle-bar" />
            </motion.button>
          </div>

          <motion.p className="scriptorium-hint">{handleLabel}</motion.p>
          <button type="button" className="scriptorium-skip" onClick={skip}>
            Skip ▸
          </button>
          <span id="scriptorium-instructions" className="visually-hidden">
            Drag the handle down, or activate it with Enter or Space, to unroll the page. A Skip button is also available if dragging isn't convenient.
          </span>
        </>
      )}
    </>
  )
}
