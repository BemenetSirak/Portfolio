import React, { useState, useEffect } from 'react'
import './ThingsILove.css'
import InteractiveMovies from './InteractiveMovies'
import profile from '../data/profileData'

export default function ThingsILove() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const t = params.get('tab')
      if (t) setActive(t)
    } catch (e) {
      // ignore
    }
  }, [])

  function handleTabChange(tab) {
    const newActive = active === tab ? null : tab
    setActive(newActive)
    try {
      const url = new URL(window.location.href)
      if (newActive) url.searchParams.set('tab', newActive)
      else url.searchParams.delete('tab')
      window.history.replaceState({}, '', url)
    } catch (e) {}
  }

  return (
    <div className="things-i-love panel">
      <h3>Things I Love</h3>
      <div className="love-buttons" role="tablist" aria-label="Things I love">
        <button role="tab" aria-pressed={active==='movies'} onClick={() => handleTabChange('movies')} className={`icon-card ${active==='movies' ? 'active':''}`} style={{animationDelay:'0ms'}}>
          <img src="/icons/icon-movies.svg" alt="Movies" className="icon" />
          <span className="label">Movies</span>
        </button>

        <button role="tab" aria-pressed={active==='history'} onClick={() => handleTabChange('history')} className={`icon-card ${active==='history' ? 'active':''}`} style={{animationDelay:'80ms'}}>
          <img src="/icons/icon-history.svg" alt="History" className="icon" />
          <span className="label">History</span>
        </button>

        <button role="tab" aria-pressed={active==='religion'} onClick={() => handleTabChange('religion')} className={`icon-card ${active==='religion' ? 'active':''}`} style={{animationDelay:'160ms'}}>
          <img src="/icons/icon-religion.svg" alt="Religion" className="icon" />
          <span className="label">Religion</span>
        </button>
      </div>

      <div className="love-panels">
        {active === 'history' && (
          <div className="panel love-panel history">
            <h4>My History</h4>
            <p>I grew up exploring technology and building small projects. I enjoy data and analytics work.</p>
          </div>
        )}

        {active === 'religion' && (
          <div className="panel love-panel religion">
            <h4>Religion & Beliefs</h4>
            <p>I value reflection and community; I enjoy learning about different traditions and perspectives.</p>
          </div>
        )}

        {active === 'football' && (
          <div className="panel love-panel football">
            <h4>Football</h4>
            <p>I'm a fan of football — I watch major leagues and play casually when I can.</p>
          </div>
        )}

        {active === 'movies' && (
          <div className="panel love-panel movies">
            <h4>Movie Recommendations</h4>
            <InteractiveMovies movies={profile.movies} />
          </div>
        )}
      </div>
    </div>
  )
}
