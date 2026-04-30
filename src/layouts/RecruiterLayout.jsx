import React, { useState } from 'react'
import profile from '../data/profileData'
import './Layout.css'
import ThemeToggle from '../components/ThemeToggle'
import BrandLogo from '../components/BrandLogo'
import About from '../pages/About'
import Resume from '../pages/Resume'
import RecruiterHero from '../components/RecruiterHero'

function RecruiterLayout({ onBack }) {
  const [showAbout, setShowAbout] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  return (
    <div className="layout-root recruiter-layout">
      <header className="layout-header">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div>
            <h1>{profile.name}</h1>
            <p className="muted">{profile.title}</p>
          </div>
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <button onClick={() => setShowAbout((s) => !s)} className="link">About</button>
          <button onClick={() => setShowResume((s) => !s)} className="link">Resume</button>
          <button onClick={onBack} className="link">Switch</button>
          <BrandLogo onBack={onBack} />
        </div>
      </header>
      {showAbout ? (
        <About onClose={() => setShowAbout(false)} />
      ) : showResume ? (
        <Resume onClose={() => setShowResume(false)} />
      ) : showProjects ? (
        <section className="layout-main">
          <div className="right-col">
            <section>
              <h2>Projects</h2>
              <ul>
                {profile.projects.map((p, i) => (
                  <li key={i}>
                    <a href={p.url}>{p.title}</a> — {p.description}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      ) : (
        <section className="layout-main">
          <RecruiterHero name={profile.name} title={profile.title} onAction={(action) => {
            if (action === 'resume') setShowResume(true)
            if (action === 'projects') setShowProjects(true)
            if (action === 'contact') setShowAbout(true)
          }} />
        </section>
      )}
    </div>
  )
}

export default RecruiterLayout
