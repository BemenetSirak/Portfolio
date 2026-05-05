import React, { useState } from 'react'
import './Interests.css'
import profile from '../data/profileData'
import InteractiveMovies from '../components/InteractiveMovies'

export default function Interests({ onClose, initialTab }) {
  const [tab, setTab] = useState(initialTab || 'things')

  return (
    <div className="interests-root">
      <header className="interests-header">
        <h1>Welcome — explore my world</h1>
        <div>
          <button onClick={onClose} className="link">Close</button>
        </div>
      </header>

      <div className="interests-grid">
        <aside className="things-card panel">
          <h2>Things I Love</h2>
          <p className="muted">Tap each card to read more</p>
          <div className="things-tabs">
            <button className={tab==='history' ? 'active' : ''} onClick={() => setTab('history')}>History</button>
            <button className={tab==='religion' ? 'active' : ''} onClick={() => setTab('religion')}>Religion</button>
            <button className={tab==='football' ? 'active' : ''} onClick={() => setTab('football')}>Football</button>
          </div>
          <div className="things-visual">
            <img src="/images/ai-animation.svg" alt="ai animation" />
          </div>
        </aside>

        <main className="interests-main">
          {tab === 'history' && (
            <section className="panel content history">
              <h2>My History</h2>
              <p>I am a passionate individual with a diverse range of interests and experiences. Coding, builing new things, and interacting with new tech is my growing passion.</p>
              <p>Key moments: learning to code, first data visualization project, moving into BI analytics.</p>
            </section>
          )}

          {tab === 'religion' && (
            <section className="panel content religion">
              <h2>Religion & Beliefs</h2>
              <p>I hold personal spiritual beliefs and respect diverse traditions. My approach combines reflection and community engagement.</p>
            </section>
          )}

          {tab === 'football' && (
            <section className="panel content football">
              <h2>Football</h2>
              <p>I'm a fan of football  I follow Premier league and enjoy playing casually.</p>
              <p>Favorite teams: Arsenal FC, Bayern Munich.</p>
            </section>
          )}

          <section className="panel movies content">
            <h2>Movies & Favorites</h2>
            <InteractiveMovies movies={profile.movies} />
          </section>

          <section className="panel fun content">
            <h2>Fun Facts</h2>
            <ul>
              <li>I love watching movies 24/7</li>
              <li>I'm into traveling and hiking.</li>
              <li>I absolutley and utterly love coffee.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}
