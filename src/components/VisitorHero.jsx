import React, { useState, useEffect, useRef } from 'react'
import './VisitorHero.css'
import ExploreOverview from './ExploreOverview'

export default function VisitorHero({ name, onExplore }) {
  const ref = useRef()
  const [showOverview, setShowOverview] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('show'))
  }, [])

  return (
    <>
      <section ref={ref} className="visitor-hero flow-playful reveal">
        <div className="hero-body">
          <p className="hero-greeting">Hey there!</p>
          <h1>I'm {name.split(' ')[0]}!</h1>
          <p className="hero-tagline">Welcome to my world</p>
          <p className="hero-desc">
            Arsenal fan, history nerd, Ethiopian Orthodox Christian, movie lover, and occasional hiker.
          </p>
          <div className="hero-actions">
            <button onClick={() => setShowOverview(true)} className="explore-btn">
              Explore More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-blob" aria-hidden="true" />
          <img src="/images/visitor-hero.jpg" alt="hero" className="hero-char" />

          <span className="float-icon fi-gaming" aria-hidden="true">
            <img src="/icons/icon-football.svg" alt="" width="36" height="36" />
          </span>
          <span className="float-icon fi-travel" aria-hidden="true">
            <img src="/icons/icon-history.svg" alt="" width="36" height="36" />
          </span>
          <span className="float-icon fi-photo" aria-hidden="true">
            <img src="/icons/icon-movies.svg" alt="" width="36" height="36" />
          </span>
          <span className="float-icon fi-music" aria-hidden="true">
            <img src="/icons/icon-religion.svg" alt="" width="36" height="36" />
          </span>

          <span className="sparkle sp-1" aria-hidden="true" />
          <span className="sparkle sp-2" aria-hidden="true" />
          <span className="sparkle sp-3" aria-hidden="true" />
        </div>
      </section>

      {showOverview && <ExploreOverview onClose={() => setShowOverview(false)} />}
    </>
  )
}
