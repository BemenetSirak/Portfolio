import { useState, useEffect, useRef } from 'react'
import profile from '../data/profileData'
import './Layout.css'
import ThemeToggle from '../components/ThemeToggle'
import About from '../pages/About'
import Resume from '../pages/Resume'
import Interests from '../pages/Interests'
import VisitorHero from '../components/VisitorHero'
import Gallery from '../components/Gallery'
import FunZone from '../components/FunZone'
import ContactStrip from '../components/ContactStrip'
import ThingsILove from '../components/ThingsILove'
import BrandLogo from '../components/BrandLogo'
import InterestsDropdown from '../components/InterestsDropdown'
import ScrollRod from '../components/ScrollRod'
import ScriptoriumGate from '../components/ScriptoriumGate'
import useUnroll from '../hooks/useUnroll'
import { getTheme, setTheme } from '../utils/theme'
import quillInkwell from '../assets/scroll/quill-inkwell.png'
import waxSeal from '../assets/scroll/wax-seal.png'
import './VisitorLayout.css'
import './VisitorScroll.css'

const INTEREST_ITEMS = [
  { id: 'history',  label: 'History' },
  { id: 'religion', label: 'Religion' },
  { id: 'movies',   label: 'Movies' },
  { id: 'football', label: 'Football' },
  { id: 'hiking',   label: 'Hiking' },
]

// Brass tacks pinning the sheet to the desk, named by their spot on the edge
const TACKS = ['tl', 'tr', 'l1', 'l2', 'r1', 'r2', 'r3', 'bl', 'br']

function VisitorLayout({ onBack }) {
  const [showAbout, setShowAbout]         = useState(false)
  const [showResume, setShowResume]       = useState(false)
  const [showInterests, setShowInterests] = useState(false)
  const [interestsTab, setInterestsTab]   = useState(null)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [interestsExp, setInterestsExp]   = useState(false)
  const [themeKey, setThemeKey]           = useState(getTheme)
  const [smoking, setSmoking]             = useState(false)
  const smokeTimer = useRef(null)
  const unrolled = useUnroll()

  // The background/vignette layers are keyed by theme and force-remounted
  // on change — see the comment in ThemeToggle for why a plain attribute
  // cascade isn't reliable enough for these large full-page layers.
  useEffect(() => {
    function onThemeChange(e) {
      const next = e.detail.theme
      setThemeKey(prev => {
        // Puff of smoke only when the candle is actually blown out just
        // now — not on a cold page load that simply starts in light mode.
        if (prev === 'dark' && next === 'light') {
          setSmoking(true)
          clearTimeout(smokeTimer.current)
          smokeTimer.current = setTimeout(() => setSmoking(false), 5000)
        }
        return next
      })
    }
    window.addEventListener('themechange', onThemeChange)
    return () => {
      window.removeEventListener('themechange', onThemeChange)
      clearTimeout(smokeTimer.current)
    }
  }, [])

  // Reveal-on-scroll for anything tagged .v-reveal.
  useEffect(() => {
    const els = document.querySelectorAll('.v-reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('v-reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [showAbout, showResume, showInterests])

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
      {/* Shared displacement filter that roughens every torn/burnt
          parchment edge on the page (hero scrap, panel cards) into an
          irregular tear instead of a clean geometric cut. */}
      <svg className="scroll-svg-defs" aria-hidden="true" focusable="false">
        <filter id="scroll-torn-edge" x="-6%" y="-8%" width="112%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.05" numOctaves="3" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="desk-backdrop" key={`desk-${themeKey}`} aria-hidden="true" />

      <div className={`desk-candle${themeKey === 'dark' ? ' is-lit' : ' is-out'}${smoking ? ' is-smoking' : ''}`}>
        <span className="candle-glow" aria-hidden="true" />
        <span className="candle-shadow" aria-hidden="true" />
        <span className="candle-body" aria-hidden="true" />
        <span className="candle-wick" aria-hidden="true" />
        {smoking && (
          <span className="candle-smoke" aria-hidden="true">
            <i /><i /><i />
          </span>
        )}
        <button
          type="button"
          className="candle-flame"
          onClick={() => setTheme(themeKey === 'dark' ? 'light' : 'dark')}
          aria-label={themeKey === 'dark' ? 'Blow out the candle and switch to light mode' : 'Light the candle and switch to dark mode'}
          title={themeKey === 'dark' ? 'Blow out the candle' : 'Light the candle'}
        />
      </div>

      <div className={`scroll-sheet scroll-unroll${unrolled ? ' scroll-unroll--in' : ''}`}>
        <div className="scroll-backdrop" key={`backdrop-${themeKey}`} aria-hidden="true" />
        <div className="scroll-vignette" key={`vignette-${themeKey}`} aria-hidden="true" />

        <ScrollRod position="top">
          <p className="scroll-masthead">[Bemenet Mesgune.net - Old Scrolls]</p>
        </ScrollRod>

        <div className="scroll-seal-brand">
          <BrandLogo onBack={onBack} />
        </div>
        <img className="scroll-quill" src={quillInkwell} alt="" aria-hidden="true" />

        <div className="sticky-header">
          <header className="layout-header">
            <div className="header-start">
              <nav className="visitor-nav">
                <button className="link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
                <button className="link" onClick={() => setShowAbout(true)}>About Me</button>
                <InterestsDropdown />
                <button className="link" onClick={() => setShowResume(true)}>Resume</button>
                <button className="link" onClick={onBack}>Switch</button>
              </nav>
              <ThemeToggle />
            </div>
            <div className="header-end">
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
          <ScriptoriumGate>
            <VisitorHero name={profile.name} />

            <div className="v-reveal">
              <ThingsILove />
            </div>

            <div className="scroll-divider scroll-divider--sealed" aria-hidden="true">
              <img className="scroll-seal scroll-seal--divider" src={waxSeal} alt="" />
            </div>
            <div className="facts-gallery-row v-reveal">
              <FunZone />
              <Gallery />
            </div>

            <div className="scroll-divider" aria-hidden="true">
              <svg className="scroll-divider-flourish" viewBox="0 0 46 20" aria-hidden="true">
                <path d="M2 10c6-8 11-8 14 0s8 8 14 0 11-8 14 0" />
                <circle cx="23" cy="10" r="1.6" />
              </svg>
            </div>
            <div id="visitor-contact" className="v-reveal">
              <ContactStrip contact={profile.contact} />
            </div>
          </ScriptoriumGate>
        </main>

        <ScrollRod position="bottom" />

        <img className="scroll-seal scroll-seal--bottom" src={waxSeal} alt="" aria-hidden="true" />
        <img className="scroll-seal scroll-seal--corner" src={waxSeal} alt="" aria-hidden="true" />
        {TACKS.map(t => (
          <span key={t} className={`scroll-tack scroll-tack--${t}`} aria-hidden="true" />
        ))}
      </div>
    </div>
  )
}

export default VisitorLayout
