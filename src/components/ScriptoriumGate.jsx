import { useState, useEffect, useLayoutEffect } from 'react'
import { motion, useMotionValue, useTransform, useReducedMotion, useMotionValueEvent, animate } from 'framer-motion'
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

// The visitor page's initial reveal. This component renders none of
// the actual manuscript — no wrapper div, no stand-in cylinder
// graphic, no second copy of anything. It only ever touches the real,
// single `.scroll-sheet` element (passed in as `sheetRef`) that
// VisitorLayout already renders once: while closed, a `--gated` class
// clips it down to just the closed height and a `--gate-progress` CSS
// variable (written straight onto that element on every drag frame)
// grows it back out toward a full viewport as the handle is pulled.
// The top roller is simply the first thing in that same element's own
// flex column, so it never moves on its own; the bottom roller and
// this component's own drag handle live together in one small wrapper
// VisitorLayout pins to the sheet's bottom edge while gated, so they
// ride the growing edge for free, in plain CSS, with no JS position
// tracking of any kind.
export default function ScriptoriumGate({ sheetRef, onOpenChange, onProgressChange }) {
  const [open, setOpen] = useState(alreadyOpened)
  const y = useMotionValue(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  // The `scroll-sheet--gated` class itself is computed by VisitorLayout
  // as part of the sheet's own React-owned className (keyed off the
  // `open` state this component reports up via onOpenChange) — not
  // toggled here with classList, because that element re-renders
  // constantly for reasons that have nothing to do with the gate (a
  // candle drag frame, a theme toggle), and each one would reset any
  // class added out-of-band back to whatever VisitorLayout's JSX says.
  // The `--gate-progress` custom property is safe to own here directly
  // instead: no `style` prop is ever passed to that element, so React
  // never touches or resets its `style` attribute on re-render.
  useLayoutEffect(() => {
    const el = sheetRef.current
    if (!el) return
    if (open) {
      el.style.removeProperty('--gate-progress')
    } else {
      el.style.setProperty('--gate-progress', '0')
    }
  }, [open, sheetRef])

  const progress = useTransform(y, [0, DRAG_RANGE], [0, 1])
  const handleLabel = useTransform(progress, (v) => (v > 0.5 ? 'Unrolling…' : 'Drag to unroll'))

  // Written straight onto the real sheet on every drag frame — this is
  // the one and only thing driving the CSS height calc() in
  // ScriptoriumGate.css, and also mirrored out to VisitorLayout, which
  // applies it as --roll-progress on the bottom roller's own DOM node
  // for its rotation/shadow.
  useMotionValueEvent(progress, 'change', (v) => {
    sheetRef.current?.style.setProperty('--gate-progress', v)
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

  // The reverse of `finish` — rolls the sheet back shut so a visitor
  // can re-watch the reveal without a full page reload. Clearing the
  // session flag alongside `open` means a reload afterwards starts
  // closed again too, matching what "reset" implies.
  function reset() {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // best-effort only
    }
    setOpen(false)
    y.set(0)
  }

  if (open) {
    return (
      <button type="button" className="scriptorium-reroll" onClick={reset}>
        ↺ Roll it back up
      </button>
    )
  }

  return (
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
  )
}
