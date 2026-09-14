import React from 'react'
import profile from '../data/profileData'
import ScrollPage from '../components/ScrollPage'
import './About.css'

const FACTS = [
  {
    emoji: '🇪🇹',
    title: 'Ethiopian Roots',
    body: "Born and raised in Addis, Very family oriented, I have a lot of my family in Ethiopia so very blessed.",
  },
  {
    emoji: '✝️',
    title: 'Ethiopian Orthodox Faith',
    body: "Raised in the Ethiopian Orthodox Tewahedo Church (Oriental Orthodox). I love my religion, and trying to grow everyday.",
  },
  {
    emoji: '📜',
    title: 'History Obsessive',
    body: "I love history. Cant stop listening to history channels.",
  },
  {
    emoji: '⚽',
    title: 'Arsenal & Sunday League',
    body: "Big Arsenal Fan. I also play Sunday League football every week. One of the best stress relievers there is.",
  },
  {
    emoji: '🎬',
    title: 'Cinema & Historical Dramas',
    body: "Vikings is perfection. Peaky Blinders, The Last Kingdom, and Outlaw King are at the top of my list. History in a story? I'm watching.",
  },
  {
    emoji: '🕍',
    title: 'Early Church History',
    body: "Fascinated by the early church  the Council of Ephesus, the Desert Fathers, and Christianity's ancient roots.",
  },
  {
    emoji: '🏔️',
    title: 'Hiking & the Outdoors',
    body: "Mountains are my reset button. I hike every now and then with my friends. Hiking down the Grand Canyon has been my favourite so far. Not the whole thing FYI.",
  },
  {
    emoji: '💻',
    title: 'Data & Tech',
    body: "I enjoy my work in data and tech. I have a background in QA and BI analytics, and I'm always exploring new tools and projects in the space.",
  },
]

export default function About({ onClose }) {
  return (
    <ScrollPage title="About Me">
      <div className="about-root">
        <header className="about-header">
          <div>
            <h1 className="about-name">{profile.name}</h1>
            <p className="about-title">{profile.title}</p>
            <div className="about-contact-row">
              <a href={`mailto:${profile.contact.email}`} className="about-contact-link">✉ {profile.contact.email}</a>
              <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="about-contact-link">in LinkedIn</a>
              <a href={profile.contact.github} target="_blank" rel="noreferrer" className="about-contact-link">⌥ GitHub</a>
            </div>
          </div>
          <div className="about-header-actions">
            <button onClick={onClose} className="about-btn-ghost">Close</button>
          </div>
        </header>

        <div className="about-body">

          {/* Summary */}
          <section className="about-section">
            <h2 className="about-section-title">Summary</h2>
            <p className="about-body-text">{profile.summary}</p>
          </section>

          {/* A Bit About Me */}
          <section className="about-section">
            <h2 className="about-section-title">A Bit About Me</h2>
            <div className="about-facts-grid">
              {FACTS.map((f, i) => (
                <div key={i} className="about-fact-item">
                  <span className="about-fact-emoji">{f.emoji}</span>
                  <h3 className="about-fact-title">{f.title}</h3>
                  <p className="about-fact-body">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </ScrollPage>
  )
}
