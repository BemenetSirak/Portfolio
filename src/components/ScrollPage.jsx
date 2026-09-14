import ScrollRod from './ScrollRod'
import useUnroll from '../hooks/useUnroll'
import './ScrollPage.css'

// The same physical scroll furniture as the homepage — a wooden roller
// unspooling a parchment sheet on the desk — wrapped around Resume and
// About so opening them feels like unrolling another page of the same
// manuscript, rather than swapping to a plain modern panel. The
// clip-path unroll on .scroll-sheet is the same .scroll-unroll/--in
// transition the homepage sheet and every popup already share.
export default function ScrollPage({ title, children }) {
  const unrolled = useUnroll()
  return (
    <div className="visitor-layout scroll-page">
      {/* Resume/About render as a full standalone swap (not nested inside
          VisitorLayout), so the shared torn-edge filter it normally
          provides isn't in the DOM here — redeclare it locally. */}
      <svg className="scroll-svg-defs" aria-hidden="true" focusable="false">
        <filter id="scroll-torn-edge" x="-6%" y="-8%" width="112%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.05" numOctaves="3" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="desk-backdrop" aria-hidden="true" />
      <div className={`scroll-sheet scroll-page-sheet scroll-unroll${unrolled ? ' scroll-unroll--in' : ''}`}>
        <div className="scroll-backdrop" aria-hidden="true" />
        <div className="scroll-vignette" aria-hidden="true" />

        <ScrollRod position="top">
          <p className="scroll-masthead">{title}</p>
        </ScrollRod>

        <div className="visitor-main scroll-page-main">
          {children}
        </div>

        <ScrollRod position="bottom" />
      </div>
    </div>
  )
}
