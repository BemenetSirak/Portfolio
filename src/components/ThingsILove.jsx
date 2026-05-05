import React, { useState, useEffect } from 'react'
import './ThingsILove.css'
import MoviesPanel from './MoviesPanel'
import profile from '../data/profileData'

const TABS = [
  { id: 'history',  label: 'History',  icon: '/icons/icon-history.svg',  delay: 0 },
  { id: 'religion', label: 'Religion', icon: '/icons/icon-religion.svg', delay: 60 },
  { id: 'movies',   label: 'Movies',   icon: '/icons/icon-movies.svg',   delay: 120 },
  { id: 'football', label: 'Football', icon: '/icons/icon-football.svg', delay: 180 },
  { id: 'hiking',   label: 'Hiking',   icon: '/icons/icon-hiking.svg',   delay: 240 },
  { id: 'coffee',   label: 'Coffee',   icon: '/icons/icon-coffee.svg',   delay: 300 },
]

function getTabFromURL() {
  try {
    return new URLSearchParams(window.location.search).get('tab') || null
  } catch (e) {
    return null
  }
}

function setTabInURL(tab) {
  try {
    const url = new URL(window.location.href)
    if (tab) url.searchParams.set('tab', tab)
    else url.searchParams.delete('tab')
    window.history.replaceState({ tab }, '', url)
  } catch (e) {}
}

function InterestPanel({ data }) {
  const bgStyle = data.bgStyle ?? {
    backgroundImage: data.bg ? `url(${data.bg})` : undefined,
    backgroundPosition: data.bgPosition ?? 'center center',
    backgroundSize: data.bgSize ?? 'cover',
    backgroundColor: data.bgColor ?? undefined,
  }

  return (
    <div
      className={`love-panel panel-bg${data.extraClass ? ' ' + data.extraClass : ''}`}
      style={bgStyle}
    >
      <div className="panel-bg-content">
        <h4>{data.title}</h4>
        <p>{data.intro}</p>
        <ul className="era-list">
          {data.bullets.map((b, i) => (
            <li key={i}><strong>{b.heading}</strong> — {b.body}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ThingsILove() {
  const [active, setActive] = useState(() => getTabFromURL())

  useEffect(() => {
    function onPop() { setActive(getTabFromURL()) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    function onTrigger(e) {
      setActive(e.detail.tab)
      setTabInURL(e.detail.tab)
    }
    window.addEventListener('openInterestTab', onTrigger)
    return () => window.removeEventListener('openInterestTab', onTrigger)
  }, [])

  function handleTabChange(tab) {
    const next = active === tab ? null : tab
    setActive(next)
    setTabInURL(next)
  }

  const activeInterest = profile.interests.find(i => i.id === active)

  return (
    <div id="things-i-love" className="things-i-love panel">
      <h3>Things I Love</h3>

      <div className="love-buttons" role="tablist" aria-label="Things I love">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-pressed={active === t.id}
            onClick={() => handleTabChange(t.id)}
            className={`icon-card${active === t.id ? ' active' : ''}`}
            style={{ animationDelay: `${t.delay}ms` }}
          >
            <img src={t.icon} alt={t.label} className="icon" />
            <span className="label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="love-panels">
        {active === 'movies' && (
          <div key="movies" className="love-panel movies-panel-wrap panel">
            <MoviesPanel />
          </div>
        )}
        {active && active !== 'movies' && activeInterest && (
          <InterestPanel key={active} data={activeInterest} />
        )}
      </div>
    </div>
  )
}
