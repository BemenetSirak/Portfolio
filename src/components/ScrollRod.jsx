import './ScrollRod.css'

// The wooden roller the parchment sheet is spooled around, at the top
// (where it carries the masthead) and the bottom of the page. The wood
// and its turned end-caps come from the scroll-master artwork, 3-sliced
// with border-image so the caps stay at natural size and only the
// dowel's middle stretches to the sheet's width.
export default function ScrollRod({ position = 'top', children }) {
  return (
    <div className={`scroll-roll scroll-roll--${position}`}>
      <div className="scroll-roll-face">{children}</div>
    </div>
  )
}
