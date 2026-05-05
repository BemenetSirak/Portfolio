import React from 'react'
import './ExploreOverview.css'

const INTERESTS = [
  { id: 'history',  label: 'History',  icon: '/icons/icon-history.svg',  desc: 'Ancient empires to Cold War' },
  { id: 'religion', label: 'Religion', icon: '/icons/icon-religion.svg', desc: 'Ethiopian Orthodox traditions' },
  { id: 'movies',   label: 'Movies',   icon: '/icons/icon-movies.svg',   desc: 'Top 10 films & shows' },
  { id: 'football', label: 'Football', icon: '/icons/icon-football.svg', desc: 'Arsenal & Volo league' },
  { id: 'hiking',   label: 'Hiking',   icon: '/icons/icon-hiking.svg',   desc: 'Mountain trails' },
]

const PHOTO_TEASERS = [
  {
    src: '/images/gallery/eth-orthodox-murals.jpg',
    label: 'Faith',
    caption: 'Ethiopian Orthodox',
    tab: 'religion',
  },
  {
    src: '/images/gallery/football-team.jpg',
    label: 'Football',
    caption: 'Game Night Volo League',
    tab: 'football',
  },
  {
    src: '/images/gallery/hiking-sedona-canyon.jpg',
    label: 'Hiking',
    caption: 'Sedona, AZ',
    tab: 'hiking',
  },
  {
    src: '/images/history-knights.jpg',
    label: 'History',
    caption: 'Medieval Europe',
    tab: 'history',
  },
]

function openTab(id, onClose) {
  onClose()
  window.dispatchEvent(new CustomEvent('openInterestTab', { detail: { tab: id } }))
  setTimeout(() => {
    document.getElementById('things-i-love')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 120)
}

function scrollTo(id, onClose) {
  onClose()
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 120)
}

export default function ExploreOverview({ onClose }) {
  return (
    <div className="eo-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Explore overview">
      <div className="eo-panel" onClick={e => e.stopPropagation()}>

        <div className="eo-header">
          <div>
            <h2 className="eo-title">Explore My World</h2>
            <p className="eo-subtitle">Everything you'll find on this page tap to jump there</p>
          </div>
          <button className="eo-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="eo-body">

          {/* Photo teasers */}
          <section className="eo-section">
            <h3 className="eo-section-label">
              <span className="eo-section-dot" />
              A Glimpse
            </h3>
            <div className="eo-photos-grid">
              {PHOTO_TEASERS.map((p) => (
                <button
                  key={p.tab}
                  className="eo-photo-card"
                  onClick={() => openTab(p.tab, onClose)}
                  style={{ backgroundImage: `url(${p.src})` }}
                  aria-label={`Open ${p.label} tab`}
                >
                  <div className="eo-photo-overlay">
                    <span className="eo-photo-label">{p.label}</span>
                    <span className="eo-photo-caption">{p.caption}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

        </div>

        <div className="eo-footer">
          <button className="eo-jump-btn primary" onClick={() => scrollTo('things-i-love', onClose)}>
            Jump to Interests ↓
          </button>
          <button className="eo-jump-btn secondary" onClick={() => scrollTo('visitor-contact', onClose)}>
            Get In Touch ↓
          </button>
          <button className="eo-jump-btn ghost" onClick={onClose}>
            Maybe Later
          </button>
        </div>

      </div>
    </div>
  )
}
