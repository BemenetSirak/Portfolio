import React from 'react'
import './ExploreOverview.css'

const INTERESTS = [
  { id: 'history',  label: 'History',  icon: '/icons/icon-history.svg',  desc: 'Ancient empires to Cold War' },
  { id: 'religion', label: 'Religion', icon: '/icons/icon-religion.svg', desc: 'Ethiopian Orthodox traditions' },
  { id: 'movies',   label: 'Movies',   icon: '/icons/icon-movies.svg',   desc: 'Top 10 films & shows' },
  { id: 'football', label: 'Football', icon: '/icons/icon-football.svg', desc: 'Arsenal & 5-a-side' },
  { id: 'hiking',   label: 'Hiking',   icon: '/icons/icon-hiking.svg',   desc: 'Mountain trails' },
]

const HIGHLIGHTS = [
  { emoji: '⚽', label: 'Football',  text: 'Arsenal fan + weekly 5-a-side player' },
  { emoji: '📜', label: 'History',   text: 'Aksumite Empire, Medieval Europe, Cold War' },
  { emoji: '✝️', label: 'Faith',     text: 'Ethiopian Orthodox — 1,600 years of tradition' },
  { emoji: '🎬', label: 'Cinema',    text: 'Shawshank, Peaky Blinders, Attack on Titan' },
  { emoji: '🏔️', label: 'Hiking',   text: 'Simien Mountains & Tour du Mont Blanc on the list' },
  { emoji: '🕍', label: 'Church',    text: 'Fascinated by early church history & the Desert Fathers' },
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
            <p className="eo-subtitle">Everything you'll find on this page — tap to jump there</p>
          </div>
          <button className="eo-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="eo-body">

          {/* Things I Love */}
          <section className="eo-section">
            <h3 className="eo-section-label">
              <span className="eo-section-dot" />
              Things I Love
            </h3>
            <div className="eo-interests-row">
              {INTERESTS.map(item => (
                <button
                  key={item.id}
                  className="eo-interest-btn"
                  onClick={() => openTab(item.id, onClose)}
                >
                  <img src={item.icon} alt="" width="32" height="32" className="eo-interest-icon" />
                  <span className="eo-interest-label">{item.label}</span>
                  <span className="eo-interest-desc">{item.desc}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section className="eo-section">
            <h3 className="eo-section-label">
              <span className="eo-section-dot" />
              Highlights
            </h3>
            <div className="eo-highlights-grid">
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className="eo-highlight">
                  <span className="eo-highlight-emoji">{h.emoji}</span>
                  <div>
                    <span className="eo-highlight-label">{h.label}</span>
                    <span className="eo-highlight-text">{h.text}</span>
                  </div>
                </div>
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
