import React, { useState } from 'react'
import profile from '../data/profileData'
import './MoviesPanel.css'

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function ScoreDots({ value, max = 10 }) {
  return (
    <span className="score-dots" aria-label={`${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`dot${i < value ? ' filled' : ''}`} />
      ))}
    </span>
  )
}

export default function MoviesPanel() {
  const [subTab, setSubTab] = useState('movies')
  const [selectedId, setSelectedId] = useState(null)

  const list = subTab === 'movies' ? profile.movies : profile.shows
  const selected = list.find((i) => i.id === selectedId) ?? list[0]

  function switchSubTab(tab) {
    setSubTab(tab)
    setSelectedId(null)
  }

  return (
    <div className="movies-panel">
      {/* Sub-tab row */}
      <div className="mp-subtabs">
        <button
          className={`mp-tab${subTab === 'movies' ? ' active' : ''}`}
          onClick={() => switchSubTab('movies')}
        >
          Top 10 Movies
        </button>
        <button
          className={`mp-tab${subTab === 'shows' ? ' active' : ''}`}
          onClick={() => switchSubTab('shows')}
        >
          Top 10 Shows
        </button>
      </div>

      <div className="mp-body">
        {/* List */}
        <ol className="mp-list">
          {list.map((item, i) => (
            <li
              key={item.id}
              className={selected?.id === item.id ? 'active' : ''}
            >
              <button onClick={() => setSelectedId(item.id)}>
                <span className="mp-num">{i + 1}</span>
                <span className="mp-title">{item.title}</span>
                <span className="mp-year">({item.year})</span>
              </button>
            </li>
          ))}
        </ol>

        {/* Detail */}
        {selected && (
          <div
            className={`mp-detail${selected.poster ? ' mp-detail--poster' : ''}`}
            key={`${subTab}-${selected.id}`}
            style={selected.poster ? { backgroundImage: `url(${selected.poster})` } : undefined}
          >
            {selected.poster && <div className="mp-detail-overlay" />}
            <div className="mp-detail-inner">
              <h4 className="mp-detail-title">{selected.title}</h4>
              <p className="mp-detail-year">{selected.year}</p>

              <div className="mp-badges">
                <span className="badge genre">{selected.genre}</span>
              </div>

              <div className="mp-scores">
                <div className="score-row">
                  <StarIcon />
                  <span className="score-label">IMDB</span>
                  <span className="score-val imdb-val">{selected.imdb}<span className="score-max">/10</span></span>
                </div>
                <div className="score-row">
                  <StarIcon />
                  <span className="score-label">My Pick</span>
                  <span className="score-val my-val">{selected.rating}<span className="score-max">/10</span></span>
                  <ScoreDots value={selected.rating} />
                </div>
                {selected.recommended && (
                  <span className="rec-badge">Recommended</span>
                )}
              </div>

              <p className="mp-short">{selected.short}</p>
              <p className="mp-notes">
                <strong>My take:</strong> {selected.notes}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
