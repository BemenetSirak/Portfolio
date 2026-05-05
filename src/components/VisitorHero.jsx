import React, { useState, useEffect, useRef } from 'react'
import './VisitorHero.css'
import ExploreOverview from './ExploreOverview'

const ROLES = [
  'Data Analyst',
  'React Developer',
  'Arsenal Supporter',
  'History Enthusiast',
  'Orthodox Christian',
]

const ORBIT_ICONS = [
  { src: '/icons/icon-football.svg',  label: 'Football', delay: '0s'     },
  { src: '/icons/icon-history.svg',   label: 'History',  delay: '-2.8s'  },
  { src: '/icons/icon-movies.svg',    label: 'Movies',   delay: '-5.6s'  },
  { src: '/icons/icon-religion.svg',  label: 'Religion', delay: '-8.4s'  },
  { src: '/icons/icon-hiking.svg',    label: 'Hiking',   delay: '-11.2s' },
]

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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Right: Orbital visual ── */}
        <div className="vh-visual vh-el vh-el-6" aria-hidden="true">
          <div className="vh-orbit-ring" />

          {/* Central glowing orb */}
          <div className="vh-orb">
            <div className="vh-orb-glow" />
            <div className="vh-orb-face">
              <span className="vh-orb-letter">{firstName[0]}</span>
            </div>
          </div>

          {/* Orbiting interest icons */}
          {ORBIT_ICONS.map((icon, i) => (
            <div key={i} className="vh-orbit-dot" style={{ animationDelay: icon.delay }}>
              <div className="vh-orbit-icon" style={{ animationDelay: icon.delay }}>
                <img src={icon.src} alt={icon.label} width="22" height="22" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {showOverview && <ExploreOverview onClose={() => setShowOverview(false)} />}
    </>
  )
}
