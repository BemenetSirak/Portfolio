import React, { useState, useEffect, useRef } from 'react'
import './VisitorHero.css'
import ExploreOverview from './ExploreOverview'
import ornateFrame from '../assets/scroll/ornate-frame.png'
import quillInkwell from '../assets/scroll/quill-inkwell.png'
import waxSeal from '../assets/scroll/wax-seal.png'

const ROLES = [
  'Data Analyst',
  'React Developer',
  'Arsenal Supporter',
  'History Enthusiast',
  'Orthodox Christian',
]

// Decorative gold action badges ringing the medallion — not literal
// interest icons, so each still jumps to the closest-matching section.
const ORBIT_ICONS = [
  { id: 'football', glyph: 'shield',    label: 'Football', delay: '0s'     },
  { id: 'history',  glyph: 'book',      label: 'History',  delay: '-2.8s'  },
  { id: 'movies',   glyph: 'crest',     label: 'Movies',   delay: '-5.6s'  },
  { id: 'religion', glyph: 'mail',      label: 'Religion', delay: '-8.4s'  },
  { id: 'hiking',   glyph: 'handshake', label: 'Hiking',   delay: '-11.2s' },
]

const BADGE_GLYPHS = {
  handshake: (
    <path d="M2 12l4-4 4 3 3-3 3 3 3-3 4 4-4 4-1-1-4 4-4-4-4 4-1-1z" />
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
  shield: (
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
  ),
  crest: (
    <path d="M12 2l2.2 3.4L18 4l-.6 3.9L21 10l-3.4 2.2L18 16l-3.9-.6L12 19l-2.1-3.6L6 16l.6-3.8L3 10l3.4-2.1L6 4l3.8 1.4z" />
  ),
}

function goToThingsILove(tab) {
  window.dispatchEvent(new CustomEvent('openInterestTab', { detail: { tab } }))
  document.getElementById('things-i-love')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Stable pseudo-random particles (deterministic so no hydration mismatch)
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x:     ((i * 137.5) % 96).toFixed(1),
  y:     ((i * 97.3 + 12) % 88).toFixed(1),
  size:  (2 + (i % 4)),
  delay: ((i * 0.41) % 3.2).toFixed(2),
  dur:   (3.2 + (i % 3)).toFixed(1),
}))

export default function VisitorHero({ name, onExplore }) {
  const [showOverview, setShowOverview] = useState(false)
  const [roleIdx, setRoleIdx]     = useState(0)
  const [roleFading, setRoleFading] = useState(false)
  const heroRef = useRef()

  // Trigger entrance animations
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('vh-visible'))
  }, [])

  // Cycle through roles
  useEffect(() => {
    const id = setInterval(() => {
      setRoleFading(true)
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length)
        setRoleFading(false)
      }, 370)
    }, 2700)
    return () => clearInterval(id)
  }, [])

  const firstName = name.split(' ')[0]

  return (
    <>
      <div className="vh-frame">
      <section ref={heroRef} className="visitor-hero">

        {/* Aurora background blobs */}
        <div className="vh-aurora vh-aurora-a" aria-hidden="true" />
        <div className="vh-aurora vh-aurora-b" aria-hidden="true" />

        {/* Particle field */}
        <div className="vh-particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="vh-particle"
              style={{
                left:              `${p.x}%`,
                top:               `${p.y}%`,
                width:             `${p.size}px`,
                height:            `${p.size}px`,
                animationDelay:    `${p.delay}s`,
                animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>

        {/* ── Left: Text ── */}
        <div className="vh-body">
          <p className="vh-greeting vh-el vh-el-1">Hey there 👋</p>

          <h1 className="vh-name vh-el vh-el-2">
            I'm <span className="vh-name-shimmer">{firstName}</span>
          </h1>

          <div className="vh-role-row vh-el vh-el-3">
            <span className="vh-role-dash">—</span>
            <span className={`vh-role${roleFading ? ' vh-role-out' : ''}`}>
              {ROLES[roleIdx]}
            </span>
            <span className="vh-cursor" aria-hidden="true">|</span>
          </div>

          <p className="vh-desc vh-el vh-el-4">
            Arsenal fan, history nerd, Ethiopian Orthodox Christian, movie lover. Welcome to my corner of the internet. Stay a While!!!
          </p>

          <div className="vh-actions vh-el vh-el-5">
            <button className="vh-btn" onClick={() => setShowOverview(true)}>
              Explore More
              <img className="vh-btn-seal" src={waxSeal} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Right: Orbital visual ── */}
        <div className="vh-visual vh-el vh-el-6">
          <div className="vh-orbit-ring" aria-hidden="true" />

          {/* Central glowing orb */}
          <div className="vh-orb" aria-hidden="true">
            <div className="vh-orb-glow" />
            <div className="vh-orb-face">
              <img className="vh-orb-photo" src="/images/visitor-hero-photo.jpg" alt="" />
            </div>
            <img className="vh-frame-ring" src={ornateFrame} alt="" />
          </div>

          {/* Orbiting interest icons */}
          {ORBIT_ICONS.map((icon, i) => (
            <div key={i} className="vh-orbit-dot" style={{ animationDelay: icon.delay }}>
              <button
                type="button"
                className="vh-orbit-icon"
                style={{ animationDelay: icon.delay }}
                onClick={() => goToThingsILove(icon.id)}
                aria-label={`Jump to ${icon.label} in Things I Love`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {BADGE_GLYPHS[icon.glyph]}
                </svg>
              </button>
            </div>
          ))}
        </div>

      </section>

      <img className="vh-quill" src={quillInkwell} alt="" aria-hidden="true" />
      <img className="vh-corner-seal" src={waxSeal} alt="" aria-hidden="true" />
      </div>

      {showOverview && <ExploreOverview onClose={() => setShowOverview(false)} />}
    </>
  )
}
