import { forwardRef } from 'react'
import './ScrollRod.css'

// The wooden roller the parchment sheet is spooled around, at the top
// (where it carries the masthead) and the bottom of the page. The wood
// and its turned end-caps come from the scroll-master artwork, 3-sliced
// with border-image so the caps stay at natural size and only the
// dowel's middle stretches to the sheet's width.
//
// Forwarded so the bottom roller can be driven directly from outside
// (ScriptoriumGate's live drag progress) via the --roll-progress custom
// property, without routing every frame of a drag through React state.
const ScrollRod = forwardRef(function ScrollRod({ position = 'top', children }, ref) {
  return (
    <div ref={ref} className={`scroll-roll scroll-roll--${position}`}>
      <div className="scroll-roll-face">{children}</div>
    </div>
  )
})

export default ScrollRod
