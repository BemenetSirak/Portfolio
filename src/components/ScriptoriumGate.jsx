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

// The visitor page's initial reveal, bounded to the same width as the
// rest of the manuscript (the header above it — masthead, nav, brand
// medallion — is never itself part of this and stays visible the
// whole time, exactly as it always has). At rest this window shows a
// rolled-up cylinder resting on the dark desk; dragging the handle
// unspools it, clipping the real content in from the top while a
// wooden roller rides the exact boundary between revealed and still-
// rolled — one `progress` value drives both, so they can never drift
// out of sync or read as a flat card sliding independently over the
// page.
//
// `children` render in the exact same wrapper the whole time regardless
// of open/closed — an earlier version swapped element shapes on open,
// which forced React to unmount and remount the entire subtree
// (destroying every section's IntersectionObserver-driven `.v-reveal`
// state along with it). Keeping one stable wrapper avoids that.
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
  // The real content reveals from the top down — its own top edge
  // never moves, only how much of it is clipped away at the bottom
  // shrinks as the handle is pulled.
  const bottomInset = useTransform(progress, (v) => `${(1 - v) * 100}%`)
  const clipPath = useMotionTemplate`inset(0px 0px ${bottomInset} 0px)`
  const handleLabel = useTransform(progress, (v) => (v > 0.5 ? 'Unrolling…' : 'Drag to unroll'))
  // The roller cylinder sits at the centre of whatever's still rolled
  // up — the region from the reveal boundary (v*100%) down to the
  // window's own bottom (100%), so its centre is at v*50% + 50%. At
  // rest that's the window's dead centre (a full, unclipped hero shot
  // of the cylinder); as the boundary advances the roller's centre
  // tracks it down and rides off the bottom exactly as the last of the
  // sheet pays out. Never an independent slide/rotate/scale of its
  // own — that's what previously made it read as a flat card being
  // dragged across the page instead of paper actually paying out from
  // behind a solid roller.
  const rollerTopPct = useTransform(progress, (v) => `${(v * 0.5 + 0.5) * 100}%`)

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

  return (
    <>
      <div className={`scriptorium-window${open ? ' scriptorium-window--open' : ''}`}>
        <motion.div
          className={`scriptorium-reveal${open ? ' scriptorium-reveal--open' : ''}`}
          style={open ? undefined : { clipPath }}
        >
          {children}
        </motion.div>

        {!open && (
          <motion.div className="closed-scroll-view" style={{ top: rollerTopPct }} aria-hidden="true">
            <div className="closed-scroll-cylinder" />
            <span className="closed-scroll-tie" />
            <img className="closed-scroll-seal" src={waxSeal} alt="" />
          </motion.div>
        )}
      </div>

      {open && (
        <button type="button" className="scriptorium-reroll" onClick={reset}>
          ↺ Roll it back up
        </button>
      )}

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
