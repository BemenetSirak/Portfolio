import React, { useState } from 'react'
import './InteractiveMovies.css'

export default function InteractiveMovies({ movies }) {
  const [selected, setSelected] = useState(movies && movies[0])

  if (!movies || movies.length === 0) return null

  return (
    <section className="movies-root">
      <div className="movies-intro panel">
        <h2>Movies & Shows</h2>
        <p>Movies and TV shows are my passion. I would say historical fiction is my favourite genre, but I love almost all genres except for horror movies. Click any item to see my rating and thoughts.</p>
      </div>

      <div className="movies-grid">
        <aside className="movies-list">
          <h3>Top 10</h3>
          <ol>
            {movies.map((m) => (
              <li key={m.id} className={m.id === selected.id ? 'active' : ''}>
                <button onClick={() => setSelected(m)} aria-pressed={m.id === selected.id}>{m.title} <span className="muted">({m.year})</span></button>
              </li>
            ))}
          </ol>
        </aside>

        <div className="movies-detail panel">
          <div className="poster">
            <img src={selected.poster} alt={`${selected.title} poster`} />
          </div>
          <div className="detail-body">
            <h3>{selected.title} <span className="muted">({selected.year})</span></h3>
            <p className="muted">Rating: {selected.rating}/10 — {selected.recommended ? 'Recommended' : 'Not recommended'}</p>
            <p>{selected.short}</p>
            <p><strong>My notes:</strong> {selected.notes}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
