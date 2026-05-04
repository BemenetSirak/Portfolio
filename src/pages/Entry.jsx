import React from 'react'
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

export default function Entry({ onChoose }) {
  return (
    <main className="entry-root">
      <div className="entry-glow entry-glow-left" />
      <div className="entry-glow entry-glow-right" />

      <div className="entry-content">
        <h1 className="entry-title">Welcome!</h1>
        <p className="entry-subtitle">Who would you like to explore?</p>

        <div className="entry-grid">

          <button
            className="entry-card recruiter"
            onClick={() => onChoose('recruiter')}
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
            className="entry-card visitor"
            onClick={() => onChoose('visitor')}
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

        <p className="entry-tip">
          <span className="tip-fire">🔥</span>
          <strong>Tip:</strong> You can switch between experiences anytime!
        </p>
      </div>
    </main>
  )
}
