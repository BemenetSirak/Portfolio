import { useState } from 'react'
import './VisitorHero.css'
import ExploreOverview from './ExploreOverview'
import waxSeal from '../assets/scroll/wax-seal.png'

const ROLE = 'History Enthusiast'

// Gold badges pinned around the medallion's rim. `angle` is degrees
// clockwise from 3 o'clock; each one jumps to the closest-matching section.
const BADGES = [
  { id: 'shield',    glyph: 'shield',    label: 'Football', angle: -78, tab: 'football' },
  { id: 'handshake', glyph: 'handshake', label: 'History',  angle: 204, tab: 'history' },
  { id: 'book',      glyph: 'book',      label: 'Movies',   angle: -10, tab: 'movies' },
  { id: 'mail',      glyph: 'mail',      label: 'Contact',  angle: 134, anchor: 'visitor-contact' },
  { id: 'mountain',  glyph: 'mountain',  label: 'Hiking',   angle: 56,  tab: 'hiking' },
]

const BADGE_GLYPHS = {
  shield: (
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
  ),
  handshake: (
    <>
      <path d="M2.5 10 6.5 6h3.5l2.5 2.5L15 6h3.5l3 4" />
      <path d="M5.5 12.5l5 5 1.5-1.5M8 10.5l5 5 1.5-1.5M10.5 8.5l5 5 1.5-1.5" />
      <path d="M2.5 10l3 3.5M21.5 10l-3 3.5" />
    </>
  ),
  book: (
    <path d="M4 5c2-1 5-1 7 0v14c-2-1-5-1-7 0zM20 5c-2-1-5-1-7 0v14c2-1 5-1 7 0z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  mountain: (
    <>
      <path d="M3 18l5.5-9 3.5 5.5 2.5-3.5L21 18z" />
      <path d="M8.5 9l1.5 2.5L11.5 9.5" />
    </>
  ),
}

function jumpTo(badge) {
  if (badge.tab) {
    window.dispatchEvent(new CustomEvent('openInterestTab', { detail: { tab: badge.tab } }))
  }
  const target = badge.tab ? 'things-i-love' : badge.anchor
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function VisitorHero({ name }) {
  const [showOverview, setShowOverview] = useState(false)
  const firstName = name.split(' ')[0]

  return (
    <>
      <section className="visitor-hero">
        {/* Displacement filter that roughens the scorched sheet's cut edge */}
        <svg className="vh-defs" aria-hidden="true" focusable="false">
          <filter id="vh-burnt-edge" x="-6%" y="-8%" width="112%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency="0.026 0.038" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="24" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <div className="vh-body">
          <div className="vh-scorch" aria-hidden="true">
            <div className="vh-scorch-rim">
              <div className="vh-scorch-ember" />
              <div className="vh-scorch-core" />
            </div>
          </div>

          <p className="vh-greeting">Hey there</p>
          <h1 className="vh-name">I'm {firstName}</h1>
          <p className="vh-role"><span className="vh-role-dash">—</span> {ROLE}</p>
          <p className="vh-desc">
            Arsenal fan, history nerd, Ethiopian Orthodox Christian, movie lover. Welcome to my corner of the internet. Stay a While!!!
          </p>
          <button className="vh-explore" onClick={() => setShowOverview(true)}>
            <span className="vh-explore-label">Explore More</span>
            <span className="vh-explore-coin">
              <img src={waxSeal} alt="" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="vh-visual">
          <div className="vh-medallion">
            <div className="vh-photo-well">
              <img className="vh-photo" src="/images/visitor-hero-photo.jpg" alt={`${firstName} smiling`} />
              <span className="vh-photo-vignette" aria-hidden="true" />
            </div>

            {BADGES.map(b => (
              <button
                key={b.id}
                type="button"
                className="vh-badge"
                style={{ '--angle': `${b.angle}deg` }}
                onClick={() => jumpTo(b)}
                aria-label={`Jump to ${b.label}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {BADGE_GLYPHS[b.glyph]}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {showOverview && <ExploreOverview onClose={() => setShowOverview(false)} />}
    </>
  )
}
