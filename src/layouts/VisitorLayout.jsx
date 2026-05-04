import React, { useState } from 'react'
import profile from '../data/profileData'
import './Layout.css'
import ThemeToggle from '../components/ThemeToggle'
import About from '../pages/About'
import Resume from '../pages/Resume'
import Interests from '../pages/Interests'
import VisitorHero from '../components/VisitorHero'
import FunCursor from '../components/FunCursor'
import Gallery from '../components/Gallery'
import FunZone from '../components/FunZone'
import ContactStrip from '../components/ContactStrip'
import ThingsILove from '../components/ThingsILove'
import BrandLogo from '../components/BrandLogo'
import InterestsDropdown from '../components/InterestsDropdown'
import './VisitorLayout.css'

function VisitorLayout({ onBack }) {
  const [showAbout, setShowAbout] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [showInterests, setShowInterests] = useState(false)
  const [interestsTab, setInterestsTab] = useState(null)

  if (showAbout)     return <About    onClose={() => setShowAbout(false)} />
  if (showResume)    return <Resume   onClose={() => setShowResume(false)} />
  if (showInterests) return <Interests onClose={() => setShowInterests(false)} initialTab={interestsTab} />

  return (
    <div className="visitor-layout">
      <header className="layout-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BrandLogo onBack={onBack} />
          <nav className="visitor-nav">
            <button className="link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
            <button className="link" onClick={() => setShowAbout(true)}>About Me</button>
            <InterestsDropdown />
            <button className="link" onClick={() => setShowResume(true)}>Resume</button>
            <button className="link" onClick={onBack}>Switch</button>
          </nav>
        </div>
        <ThemeToggle />
      </header>

      <main className="visitor-main">
        <VisitorHero
          name={profile.name}
          title={profile.title}
          onExplore={(tab) => { setInterestsTab(tab); setShowInterests(true) }}
        />

        <ThingsILove />

        <div className="facts-gallery-row">
          <FunZone />
          <Gallery />
        </div>

        <ContactStrip contact={profile.contact} />
      </main>

      <FunCursor />
    </div>
  )
}

export default VisitorLayout
