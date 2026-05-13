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

const INTEREST_ITEMS = [
  { id: 'history',  label: 'History' },
  { id: 'religion', label: 'Religion' },
  { id: 'movies',   label: 'Movies' },
  { id: 'football', label: 'Football' },
  { id: 'hiking',   label: 'Hiking' },
]

function VisitorLayout({ onBack }) {
  const [showAbout, setShowAbout]         = useState(false)
  const [showResume, setShowResume]       = useState(false)
  const [showInterests, setShowInterests] = useState(false)
  const [interestsTab, setInterestsTab]   = useState(null)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [interestsExp, setInterestsExp]   = useState(false)

  if (showAbout)     return <About    onClose={() => setShowAbout(false)} />
  if (showResume)    return <Resume   onClose={() => setShowResume(false)} />
  if (showInterests) return <Interests onClose={() => setShowInterests(false)} initialTab={interestsTab} />

  function openInterest(tab) {
    setInterestsTab(tab)
    setShowInterests(true)
    setMenuOpen(false)
  }

  return (
    <div className="visitor-layout">
      <div className="sticky-header">
        <header className="layout-header">
          <div className="header-start">
            <BrandLogo onBack={onBack} />
            <nav className="visitor-nav">
              <button className="link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
              <button className="link" onClick={() => setShowAbout(true)}>About Me</button>
              <InterestsDropdown />
              <button className="link" onClick={() => setShowResume(true)}>Resume</button>
              <button className="link" onClick={onBack}>Switch</button>
            </nav>
          </div>
          <div className="header-end">
            <ThemeToggle />
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(s => !s)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </header>

        {menuOpen && (
          <nav className="mobile-drawer" aria-label="Mobile navigation">
            <button
              className="mobile-nav-item"
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}
            >
              Home
            </button>
            <button
              className="mobile-nav-item"
              onClick={() => { setShowAbout(true); setMenuOpen(false) }}
            >
              About Me
            </button>
            <div className="mobile-nav-group">
              <button
                className="mobile-nav-item"
                onClick={() => setInterestsExp(s => !s)}
                aria-expanded={interestsExp}
              >
                Interests
                <svg
                  width="14" height="14" viewBox="0 0 12 12" fill="none"
                  style={{ transition: 'transform 0.2s', transform: interestsExp ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {interestsExp && (
                <div className="mobile-nav-sub">
                  {INTEREST_ITEMS.map(item => (
                    <button
                      key={item.id}
                      className="mobile-nav-subitem"
                      onClick={() => openInterest(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="mobile-nav-item"
              onClick={() => { setShowResume(true); setMenuOpen(false) }}
            >
              Resume
            </button>
            <button
              className="mobile-nav-item"
              onClick={() => { onBack(); setMenuOpen(false) }}
            >
              ← Switch
            </button>
          </nav>
        )}
      </div>

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
