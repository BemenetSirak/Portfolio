import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { motion, useMotionValue, useTransform, useReducedMotion, useMotionValueEvent, animate } from 'framer-motion'
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

// The visitor page's initial reveal. At rest the real content's
// container is height:0 (nothing of it visible, no need to unmount
// anything to hide it) with just the rolled-up cylinder sitting over
// it. Dragging the handle grows that container's real height from 0
// up to its full natural content height — the top edge never moves,
// so this genuinely unspools downward like a window shade, rather
// than a fixed-size box getting clip-revealed. The wooden roller rides
// the container's own live height (the two are driven from the exact
// same ref-mutation, one frame apart from nothing), and because
// everything below this in the DOM is in normal flow, the real bottom
// roller and the drag handle simply get pushed down as the container
// grows — no separate position tracking needed for either.
//
// `children` render in the exact same wrapper the whole time regardless
// of open/closed — an earlier version swapped element shapes on open,
// which forced React to unmount and remount the entire subtree
// (destroying every section's IntersectionObserver-driven `.v-reveal`
// state along with it). Keeping one stable wrapper avoids that; height
// alone hides the content while closed, the same way `overflow:hidden`
// on a 0-height box would, without ever tearing the subtree down.
export default function ScriptoriumGate({ children, onOpenChange, onProgressChange }) {
  const [open, setOpen] = useState(alreadyOpened)
  const y = useMotionValue(0)
  const reduceMotion = useReducedMotion()
  const revealRef = useRef(null)
  const rollerRef = useRef(null)
  const naturalHeightRef = useRef(0)

  // Tells the parent when the gate's actually open — including the
  // very first render if this is a repeat visit within the same
  // session (state initializes straight to `true` then, so `finish()`
  // never runs to report it otherwise). Elements outside the gate
  // (the bottom seal) key their own look off this.
  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  // scrollHeight always reports the content's real, unclipped height
  // regardless of the explicit height this same element also carries
  // — so this is measured continuously (content can change size: a
  // Things I Love panel opening, an image finishing its load, a
  // viewport resize) and applied on every drag frame below rather than
  // captured once and gone stale.
  useLayoutEffect(() => {
    if (open) return
    const el = revealRef.current
    if (!el) return
    const measure = () => { naturalHeightRef.current = el.scrollHeight }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  // Height lives here, never in a React style prop. VisitorLayout
  // re-renders often (every candle-drag frame, every theme toggle) —
  // if height came from a style object recomputed each render, one of
  // those unrelated re-renders would reset it to a fixed value and
  // fight with the live drag mutation below it, snapping the sheet
  // shut for a frame in the middle of an otherwise-smooth drag. This
  // only reruns when `open` itself actually flips.
  useLayoutEffect(() => {
    if (!revealRef.current) return
    revealRef.current.style.height = open ? 'auto' : '0px'
    // Content this tall genuinely does need to escape its own box once
    // it's the real page (a dropdown or tooltip meant to overflow it
    // deliberately) — the CSS default stays `hidden` for the closed/
    // dragging states, this only lifts it once actually open.
    revealRef.current.style.overflow = open ? 'visible' : 'hidden'
  }, [open])

  const progress = useTransform(y, [0, DRAG_RANGE], [0, 1])
  const handleLabel = useTransform(progress, (v) => (v > 0.5 ? 'Unrolling…' : 'Drag to unroll'))

  // Both the growing container's real height and the roller's position
  // are set directly on the DOM here, from the same `v`, on every
  // pointer-move frame — bypassing React state so this tracks the drag
  // at full frequency instead of one render behind it (the same
  // direct-mutation approach the desk candle's drag already uses).
  useMotionValueEvent(progress, 'change', (v) => {
    const px = v * naturalHeightRef.current
    if (revealRef.current) revealRef.current.style.height = `${px}px`
    if (rollerRef.current) rollerRef.current.style.top = `${px}px`
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
        <div ref={revealRef} className="scriptorium-reveal">
          {children}
        </div>

        {!open && (
          <div ref={rollerRef} className="closed-scroll-view" aria-hidden="true">
            <div className="closed-scroll-cylinder" />
            <span className="closed-scroll-tie" />
            <img className="closed-scroll-seal" src={waxSeal} alt="" />
          </div>
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
