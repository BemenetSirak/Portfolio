import './ScrollRod.css'

// A rolled-up band of the parchment itself, capping the unrolled sheet at
// the top (where it carries the masthead) and at the bottom of the page.
export default function ScrollRod({ position = 'top', children }) {
  return (
    <div className={`scroll-roll scroll-roll--${position}`}>
      <div className="scroll-roll-face">{children}</div>
    </div>
  )
}
