import { forwardRef } from 'react'
import './ScrollRod.css'

// The wooden roller the parchment sheet is spooled around, at the top
// (where it carries the masthead) and the bottom of the page. The barrel
// and its two turned ball-knobs are built entirely from CSS gradients —
// an earlier version tried to get the knobs from a border-image slice of
// a decorative "rolled scroll" asset, but that source art has no real
// knob shape in it, which is why no amount of filtering ever gave the
// ends a defined edge.
//
// Forwarded so the bottom roller can be driven directly from outside
// (ScriptoriumGate's live drag progress) via the --roll-progress custom
// property, without routing every frame of a drag through React state.
const ScrollRod = forwardRef(function ScrollRod({ position = 'top', children }, ref) {
  return (
    <div ref={ref} className={`scroll-roll scroll-roll--${position}`}>
      <span className="scroll-roll-knob scroll-roll-knob--left" aria-hidden="true" />
      <div className="scroll-roll-face">{children}</div>
      <span className="scroll-roll-knob scroll-roll-knob--right" aria-hidden="true" />
    </div>
  )
})

export default ScrollRod
