import React, { useEffect, useRef } from 'react'
import './Entry.css'

function BriefcaseIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="12" width="28" height="20" rx="3" stroke="#60a5fa" strokeWidth="2" fill="none"/>
      <path d="M12 12V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4" y1="22" x2="32" y2="22" stroke="#60a5fa" strokeWidth="2"/>
      <line x1="16" y1="22" x2="20" y2="22" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 4 L19.8 14.2 L30 16 L19.8 17.8 L18 28 L16.2 17.8 L6 16 L16.2 14.2 Z" fill="#a78bfa" opacity="0.9"/>
      <path d="M28 6 L28.9 10.1 L33 11 L28.9 11.9 L28 16 L27.1 11.9 L23 11 L27.1 10.1 Z" fill="#c4b5fd" opacity="0.7"/>
    </svg>
  )
}

function handleCardTilt(e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  card.style.setProperty('--tilt-x', `${(-py * 10).toFixed(2)}deg`)
  card.style.setProperty('--tilt-y', `${(px * 10).toFixed(2)}deg`)
  card.style.setProperty('--glow-x', `${(px * 0.5 + 0.5) * 100}%`)
  card.style.setProperty('--glow-y', `${(py * 0.5 + 0.5) * 100}%`)
}

function resetCardTilt(e) {
  const card = e.currentTarget
  card.style.setProperty('--tilt-x', '0deg')
  card.style.setProperty('--tilt-y', '0deg')
}

export default function Entry({ onChoose }) {
  const rootRef = useRef()
  const bgRef = useRef()

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('entry-visible'))
  }, [])

  function handleBgParallax(e) {
    const bg = bgRef.current
    if (!bg) return
    const px = e.clientX / window.innerWidth - 0.5
    const py = e.clientY / window.innerHeight - 0.5
    bg.style.transform = `scale(1.08) translate(${(-px * 22).toFixed(1)}px, ${(-py * 22).toFixed(1)}px)`
  }

  return (
    <main ref={rootRef} className="entry-root" onMouseMove={handleBgParallax}>
      <div className="entry-bg-wrap" aria-hidden="true">
        <img ref={bgRef} className="entry-bg-img" src="/images/entry-bg.jpg" alt="" />
        <div className="entry-bg-scrim" />
      </div>

      <div className="entry-glow entry-glow-left" />
      <div className="entry-glow entry-glow-right" />

      <div className="entry-content">
        <h1 className="entry-title entry-el entry-el-1">Welcome!</h1>
        <p className="entry-subtitle entry-el entry-el-2">Who would you like to explore?</p>

        <div className="entry-grid">

          <button
            className="entry-card recruiter entry-el entry-el-3"
            onClick={() => onChoose('recruiter')}
            onMouseMove={handleCardTilt}
            onMouseLeave={resetCardTilt}
            aria-label="Enter recruiter experience"
          >
            <div className="entry-card-icon recruiter-icon">
              <BriefcaseIcon />
            </div>
            <h2 className="entry-card-title">I'm a Recruiter</h2>
            <p className="entry-card-desc">
              View my professional experience, skills, projects and more.
            </p>
            <span className="entry-card-btn recruiter-btn">Enter Professional Site</span>
          </button>

          <button
            className="entry-card visitor entry-el entry-el-4"
            onClick={() => onChoose('visitor')}
            onMouseMove={handleCardTilt}
            onMouseLeave={resetCardTilt}
            aria-label="Enter visitor experience"
          >
            <div className="entry-card-icon visitor-icon">
              <SparkleIcon />
            </div>
            <h2 className="entry-card-title">I'm a Visitor</h2>
            <p className="entry-card-desc">
              Explore my world, interests, fun facts and personal side.
            </p>
            <span className="entry-card-btn visitor-btn">Enter Fun Experience</span>
          </button>

        </div>

        <p className="entry-tip entry-el entry-el-5">
          <span className="tip-fire">🔥</span>
          <strong>Tip:</strong> You can switch between experiences anytime!
        </p>
      </div>
    </main>
  )
}
