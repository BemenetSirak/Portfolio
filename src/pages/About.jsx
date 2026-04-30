import React from 'react'
import profile from '../data/profileData'
import './About.css'

function About({ onClose }) {
  return (
    <div className="about-root">
      <div className="about-header">
        <h1>About — {profile.name}</h1>
        <div>
          <button onClick={onClose} className="link">Close</button>
        </div>
      </div>

      <section className="about-bio panel">
        <h2>Bio</h2>
        <p>{profile.summary}</p>
        <p>
          Contact: <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        </p>
      </section>

      <section className="about-timeline">
        <h2>Timeline</h2>
        <ul>
          {profile.experience.map((e, i) => (
            <li key={i} className="timeline-item">
              <strong>{e.role}</strong> — {e.company} <span className="muted">({e.from} — {e.to})</span>
              <ul>
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-skills panel">
        <h2>Skills & Projects</h2>
        <p>
          Projects: {profile.projects.map((p) => p.title).join(', ')}
        </p>
        <p>Skills: React, JavaScript, TypeScript, CSS, Node.js (demo list)</p>
        <a className="button" href="/assets/resume.pdf" download>
          Download Resume (PDF)
        </a>
      </section>
    </div>
  )
}

export default About
