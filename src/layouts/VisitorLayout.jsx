import React, { useState } from 'react'
import profile from '../data/profileData'
import './Layout.css'
import ThemeToggle from '../components/ThemeToggle'
import About from '../pages/About'
import Resume from '../pages/Resume'
import InteractiveMovies from '../components/InteractiveMovies'
import Interests from '../pages/Interests'
import VisitorHero from '../components/VisitorHero'
import FunCursor from '../components/FunCursor'
import Gallery from '../components/Gallery'
import FunZone from '../components/FunZone'
import ContactStrip from '../components/ContactStrip'
import ThingsILove from '../components/ThingsILove'
import BrandLogo from '../components/BrandLogo'

function VisitorLayout({ onBack }) {
  const [showAbout, setShowAbout] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [showInterests, setShowInterests] = useState(false)
  const [interestsTab, setInterestsTab] = useState(null)
  return (
    <div className="layout-root visitor-layout" style={{background:'var(--bg)'}}>
      <header className="layout-header">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <BrandLogo onBack={onBack} />
          <div>
            <h1>Hi, I'm {profile.name.split(' ')[0]}!</h1>
            <p className="muted">Welcome to my world.</p>
          </div>
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <ThemeToggle />
          <button onClick={() => setShowInterests((s) => !s)} className="link">Interests</button>
          <button onClick={() => setShowAbout((s) => !s)} className="link">About</button>
          <button onClick={() => setShowResume((s) => !s)} className="link">Resume</button>
          <button onClick={onBack} className="link">Switch</button>
        </div>
      </header>
      {showAbout ? (
        <About onClose={() => setShowAbout(false)} />
      ) : showResume ? (
        <Resume onClose={() => setShowResume(false)} />
      ) : showInterests ? (
        <Interests onClose={() => setShowInterests(false)} initialTab={interestsTab} />
      ) : (
        <section className="layout-main">
          <VisitorHero name={profile.name} title={profile.title} onExplore={(tab) => { setInterestsTab(tab); setShowInterests(true) }} />
          <ThingsILove />
          <div className="visitor-widgets" style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:16,marginTop:12}}>
            <div>
              <Gallery images={["/images/ai-animation.svg","/images/ai-animation.svg","/images/ai-animation.svg"]} />
              <FunZone />
            </div>
            <div>
              <ContactStrip contact={profile.contact} />
            </div>
          </div>
          <FunCursor />
        </section>
      )}
    </div>
  )
}

export default VisitorLayout
