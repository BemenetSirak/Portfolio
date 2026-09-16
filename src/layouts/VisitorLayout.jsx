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

// The flame's resting position, in screen pixels, derived from the
// candle's own CSS (desk-candle left:0/top:96, flame left:23/top:52,
// flame itself 24x64) — this is what the dynamic light gradient
// tracks, not the candle wrapper's own top-left corner.
const BASE_FLAME_X = 35
const BASE_FLAME_Y = 180

const INTEREST_ITEMS = [
  { id: 'history',  label: 'History' },
  { id: 'religion', label: 'Religion' },
  { id: 'movies',   label: 'Movies' },
  { id: 'football', label: 'Football' },
  { id: 'hiking',   label: 'Hiking' },
]

// Brass tacks pinning the sheet to the desk, named by their spot on the edge
const TACKS = ['tl', 'tr', 'l1', 'l2', 'l3', 'l4', 'r1', 'r2', 'r3', 'r4', 'r5', 'bl', 'br']

// Shared by the desktop nav and the mobile drawer so the two link lists
// can't drift apart. 'interests' is rendered specially in each place
// (a hover dropdown on desktop, an expandable sub-list on mobile) since
// the two use genuinely different UI patterns, not just different markup.
function buildNavLinks({ setShowAbout, setShowResume }) {
  return [
    { id: 'home',      label: 'Home',     onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'about',     label: 'About Me', onClick: () => setShowAbout(true) },
    { id: 'interests', label: 'Interests' },
    { id: 'resume',    label: 'Resume',   onClick: () => setShowResume(true) },
  ]
}

function VisitorLayout({ onBack }) {
  const [showAbout, setShowAbout]         = useState(false)
  const [showResume, setShowResume]       = useState(false)
  const [showInterests, setShowInterests] = useState(false)
  const [interestsTab, setInterestsTab]   = useState(null)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [interestsExp, setInterestsExp]   = useState(false)
  const [themeKey, setThemeKey]           = useState(getTheme)
  const [smoking, setSmoking]             = useState(false)
  const [gateOpen, setGateOpen]           = useState(false)
  const [candleOffset, setCandleOffset]   = useState({ dx: 0, dy: 0 })
  const smokeTimer = useRef(null)
  const unrolled = useUnroll()
  const candleRef = useRef(null)
  const lightRef = useRef(null)
  const dragRef = useRef(null)

  // Picking up the candle body (not the flame — that still just toggles
  // the theme on click) and dragging it moves the whole candle group,
  // and the radial light overlay's centre follows along in real time.
  // Position updates during the drag itself go straight through refs
  // instead of setState, so the light can track every pointermove at
  // full frame rate; the offset is only committed to React state once,
  // on release, so it survives whatever re-renders VisitorLayout after.
  function clampOffset(dx, dy) {
    const margin = 24
    const minDx = margin - BASE_FLAME_X
    const maxDx = window.innerWidth - margin - BASE_FLAME_X
    const minDy = 40 - BASE_FLAME_Y
    const maxDy = window.innerHeight - margin - BASE_FLAME_Y
    return {
      dx: Math.min(Math.max(dx, minDx), maxDx),
      dy: Math.min(Math.max(dy, minDy), maxDy),
    }
  }

  function applyCandlePosition(dx, dy) {
    if (candleRef.current) {
      candleRef.current.style.transform = `translate(${dx}px, ${dy}px)`
    }
    if (lightRef.current) {
      lightRef.current.style.setProperty('--candle-x', `${BASE_FLAME_X + dx}px`)
      lightRef.current.style.setProperty('--candle-y', `${BASE_FLAME_Y + dy}px`)
    }
  }

  function handleCandlePointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origDx: candleOffset.dx,
      origDy: candleOffset.dy,
    }
    candleRef.current?.classList.add('is-dragging')
  }

  function handleCandlePointerMove(e) {
    const drag = dragRef.current
    if (!drag || e.pointerId !== drag.pointerId) return
    const { dx, dy } = clampOffset(
      drag.origDx + (e.clientX - drag.startX),
      drag.origDy + (e.clientY - drag.startY)
    )
    applyCandlePosition(dx, dy)
  }

  function handleCandlePointerUp(e) {
    const drag = dragRef.current
    if (!drag || e.pointerId !== drag.pointerId) return
    const { dx, dy } = clampOffset(
      drag.origDx + (e.clientX - drag.startX),
      drag.origDy + (e.clientY - drag.startY)
    )
    dragRef.current = null
    candleRef.current?.classList.remove('is-dragging')
    setCandleOffset({ dx, dy })
  }

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

  const navLinks = buildNavLinks({ setShowAbout, setShowResume })

  return (
    <div className="visitor-layout">
      {/* Shared displacement filter that roughens every torn/burnt
          parchment edge on the page (hero scrap, panel cards) into an
          irregular tear instead of a clean geometric cut. */}
      <svg className="scroll-svg-defs" aria-hidden="true" focusable="false">
        <filter id="scroll-torn-edge" x="-8%" y="-10%" width="116%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025 0.045" numOctaves="4" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="desk-backdrop" key={`desk-${themeKey}`} aria-hidden="true" />

      {/* The candle's own light, as a literal moving source rather than
          a fixed ambient glow — its centre tracks wherever the candle
          has been dragged to. Sits above the rollers/seals (25/32) so
          it washes over the whole desk, but pointer-events:none keeps
          it from blocking anything underneath. */}
      <div
        ref={lightRef}
        className="candle-light-overlay"
        style={{ '--candle-x': `${BASE_FLAME_X}px`, '--candle-y': `${BASE_FLAME_Y}px` }}
        aria-hidden="true"
      />

      <div
        ref={candleRef}
        className={`desk-candle${themeKey === 'dark' ? ' is-lit' : ' is-out'}${smoking ? ' is-smoking' : ''}`}
        style={{ transform: `translate(${candleOffset.dx}px, ${candleOffset.dy}px)` }}
      >
        <span className="candle-glow" aria-hidden="true" />
        <span className="candle-shadow" aria-hidden="true" />
        {/* The chamberstick the candle actually stands in — a saucer
            base with a raised socket collar and a ring handle, same
            drag handle as the wax body itself. */}
        <span
          className="chamber-saucer"
          aria-hidden="true"
          onPointerDown={handleCandlePointerDown}
          onPointerMove={handleCandlePointerMove}
          onPointerUp={handleCandlePointerUp}
          onPointerCancel={handleCandlePointerUp}
        />
        <span className="chamber-handle" aria-hidden="true" />
        <span className="chamber-socket" aria-hidden="true" />
        <span
          className="candle-body"
          aria-hidden="true"
          onPointerDown={handleCandlePointerDown}
          onPointerMove={handleCandlePointerMove}
          onPointerUp={handleCandlePointerUp}
          onPointerCancel={handleCandlePointerUp}
        />
        <span className="candle-drip" aria-hidden="true" />
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

        <ScrollRod position="top" />

        <div className="scroll-seal-brand">
          <BrandLogo onBack={onBack} />
        </div>
        <img className="scroll-quill" src={quillInkwell} alt="" aria-hidden="true" />
        {/* The name written on the parchment itself, not on the wooden
            roller above it — ink doesn't sit on a turned dowel. */}
        <p className="scroll-title">Bemenet Mesgune</p>

        <div className="sticky-header">
          <header className="layout-header">
            <div className="header-start">
              <nav className="visitor-nav">
                {navLinks.map(item => item.id === 'interests'
                  ? <InterestsDropdown key={item.id} />
                  : <button key={item.id} className="link" onClick={item.onClick}>{item.label}</button>
                )}
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
              {navLinks.map(item => item.id === 'interests' ? (
                <div className="mobile-nav-group" key={item.id}>
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
                      {INTEREST_ITEMS.map(sub => (
                        <button
                          key={sub.id}
                          className="mobile-nav-subitem"
                          onClick={() => openInterest(sub.id)}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.id}
                  className="mobile-nav-item"
                  onClick={() => { item.onClick(); setMenuOpen(false) }}
                >
                  {item.label}
                </button>
              ))}
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
          <ScriptoriumGate onOpenChange={setGateOpen}>
            <VisitorHero name={profile.name} />

            <div className="v-reveal">
              <ThingsILove />
            </div>

            <div className="scroll-divider" aria-hidden="true">
              <svg className="scroll-divider-flourish" viewBox="0 0 46 20" aria-hidden="true">
                <path d="M2 10c6-8 11-8 14 0s8 8 14 0 11-8 14 0" />
                <circle cx="23" cy="10" r="1.6" />
              </svg>
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

        {/* Wrapped shut, the binding seal is still intact — it only
            shows cracked apart, as two halves turned away from each
            other, once the visitor has actually unrolled the scroll. */}
        {gateOpen ? (
          <div className="scroll-seal-broken" aria-hidden="true">
            <img className="scroll-seal-broken-half scroll-seal-broken-half--left" src={waxSeal} alt="" />
            <img className="scroll-seal-broken-half scroll-seal-broken-half--right" src={waxSeal} alt="" />
          </div>
        ) : (
          <img className="scroll-seal scroll-seal--bottom" src={waxSeal} alt="" aria-hidden="true" />
        )}
        {TACKS.map(t => (
          <span key={t} className={`scroll-tack scroll-tack--${t}`} aria-hidden="true" />
        ))}
      </div>
    </div>
  )
}

export default VisitorLayout
