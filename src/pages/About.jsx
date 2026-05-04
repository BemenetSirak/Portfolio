import React from 'react'
import profile from '../data/profileData'
import './About.css'

const FACTS = [
  {
    emoji: '🇪🇹',
    title: 'Ethiopian Roots',
    body: "Born and raised with deep Ethiopian heritage. My culture, language, and identity are something I carry with immense pride.",
  },
  {
    emoji: '✝️',
    title: 'Ethiopian Orthodox Faith',
    body: "Raised in the Ethiopian Orthodox Tewahedo Church — one of the oldest Christian traditions in the world, tracing back to the 4th century and Emperor Ezana of Axum.",
  },
  {
    emoji: '📜',
    title: 'History Obsessive',
    body: "From the Aksumite Empire and Medieval Europe to the Ottoman Empire and the Cold War — I read, watch, and listen to history constantly. It never gets old.",
  },
  {
    emoji: '⚽',
    title: 'Arsenal & 5-a-Side',
    body: "Lifelong Arsenal supporter — the Invincibles sealed it for me. I also play 5-a-side football every week. One of the best stress relievers there is.",
  },
  {
    emoji: '🎬',
    title: 'Cinema & Historical Dramas',
    body: "The Shawshank Redemption is perfection. Peaky Blinders, Narcos, The Last Kingdom, and Attack on Titan are at the top of my list. History in a story? I'm watching.",
  },
  {
    emoji: '🕍',
    title: 'Early Church History',
    body: "Fascinated by the early church — the Council of Nicaea, the Desert Fathers, and Christianity's ancient African roots. The Ethiopian church preserved traditions the rest of the world forgot.",
  },
  {
    emoji: '🏔️',
    title: 'Hiking & the Outdoors',
    body: "Mountains are my reset button. The Simien Mountains of Ethiopia top my bucket list, along with the Laugavegur Trail in Iceland and the Tour du Mont Blanc.",
  },
  {
    emoji: '💻',
    title: 'Data & Tech',
    body: "I love turning messy data into clear stories. Power BI, SQL, Python — the toolkit that bridges engineering quality and business insight.",
  },
]

export default function About({ onClose }) {
  return (
    <div className="about-root">
      <header className="about-header">
        <div className="about-header-left">
          <h1 className="about-name">{profile.name}</h1>
          <p className="about-title-line">{profile.title}</p>
        </div>
        <button onClick={onClose} className="about-close-btn" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Close
        </button>
      </header>

      <section className="about-bio panel">
        <p className="about-bio-text">{profile.summary}</p>
        <div className="about-contact-row">
          <a href={`mailto:${profile.contact.email}`} className="about-contact-chip">✉ {profile.contact.email}</a>
          <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="about-contact-chip">in LinkedIn</a>
          <a href={profile.contact.github} target="_blank" rel="noreferrer" className="about-contact-chip">⌥ GitHub</a>
        </div>
      </section>

      <section className="about-facts-section">
        <h2 className="about-section-title">A Bit About Me</h2>
        <div className="about-facts-grid">
          {FACTS.map((f, i) => (
            <div key={i} className="about-fact-card panel">
              <span className="about-fact-emoji">{f.emoji}</span>
              <h3 className="about-fact-title">{f.title}</h3>
              <p className="about-fact-body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
