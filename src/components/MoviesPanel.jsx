import React, { useState } from 'react'
import profile from '../data/profileData'
import { useOMDb } from '../hooks/useOMDb'
import './MoviesPanel.css'

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  )
}

function ScoreDots({ value, max = 10 }) {
  const filled = Math.round(value)
  return (
    <span className="score-dots" aria-label={`${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`dot${i < filled ? ' filled' : ''}`} />
      ))}
    </span>
  )
}

export default function MoviesPanel() {
  const [subTab, setSubTab] = useState('movies')
  const [selectedId, setSelectedId] = useState(null)

  const list = subTab === 'movies' ? profile.movies : profile.shows
  const omdb = useOMDb(list)

  const selected = list.find(i => i.id === selectedId) ?? list[0]
  const live = selected ? omdb[selected.id] : null

  // Live OMDb data wins; local profileData is the fallback
  const poster    = live?.poster ?? selected?.poster ?? null
  const imdbScore = live?.imdb   ?? selected?.imdb   ?? null
  const genre     = live?.genre  ?? selected?.genre  ?? ''
  const short     = live?.short  ?? selected?.short  ?? ''

  function switchSubTab(tab) {
    setSubTab(tab)
    setSelectedId(null)
  }

  return (
    <div className="movies-panel">

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
            <li key={item.id} className={selected?.id === item.id ? 'active' : ''}>
              <button onClick={() => setSelectedId(item.id)}>
                <span className="mp-num">{i + 1}</span>
                <span className="mp-title">{item.title}</span>
                <span className="mp-year">({item.year})</span>
              </button>
            </li>
          ))}
        </ol>

        {/* Full-poster detail card */}
        {selected && (
          <div className="mp-detail" key={`${subTab}-${selected.id}`}>

            {/* Background poster image */}
            {poster ? (
              <>
                <div className="mp-poster-blur-bg" style={{ backgroundImage: `url(${poster})` }} />
                <img className="mp-poster-full" src={poster} alt={selected.title} />
              </>
            ) : (
              <div className="mp-poster-placeholder" />
            )}

            {/* Gradient overlay */}
            <div className="mp-poster-gradient" />

            {/* Top badges */}
            <div className="mp-poster-top">
              {genre && <span className="badge genre">{genre}</span>}
              {selected.recommended && (
                <span className="rec-badge"><CheckIcon /> Recommended</span>
              )}
            </div>

            {/* Text content over the poster */}
            <div className="mp-detail-body">
              <h4 className="mp-detail-title">{selected.title}</h4>
              <p className="mp-detail-year">{selected.year}</p>

              <div className="mp-scores">
                {imdbScore != null && (
                  <div className="score-row">
                    <StarIcon />
                    <span className="score-label">IMDB</span>
                    <span className="score-val imdb-val">
                      {imdbScore}<span className="score-max">/10</span>
                    </span>
                  </div>
                )}
                <div className="score-row">
                  <StarIcon />
                  <span className="score-label">My Pick</span>
                  <span className="score-val my-val">
                    {selected.rating}<span className="score-max">/10</span>
                  </span>
                  <ScoreDots value={selected.rating} />
                </div>
              </div>

              {short && <p className="mp-short">{short}</p>}
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
