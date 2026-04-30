import React, { useRef } from 'react'
import profile from '../data/profileData'
import './Resume.css'

function Resume({ onClose }) {
  const printRef = useRef()

  function handlePrint() {
    window.print()
  }

  return (
    <div className="resume-root">
      <div className="resume-header">
        <h1>Resume — {profile.name}</h1>
        <div>
          <a className="button" href="/assets/resume.pdf" download>
            Download PDF
          </a>
          <button className="button" onClick={handlePrint} style={{marginLeft:8}}>
            Print
          </button>
          <button onClick={onClose} className="link" style={{marginLeft:8}}>Close</button>
        </div>
      </div>

      <article className="resume-article panel" ref={printRef}>
        <section className="resume-summary">
          <h2>Summary</h2>
          <p>{profile.summary}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {profile.experience.map((e, i) => (
            <div key={i} className="resume-item">
              <h3>{e.role} — {e.company}</h3>
              <p className="muted">{e.from} — {e.to}</p>
              <ul>
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Projects</h2>
          <ul>
            {profile.projects.map((p, i) => (
              <li key={i}><strong>{p.title}</strong> — {p.description} <span className="muted">({p.tech.join(', ')})</span></li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Email: <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></p>
        </section>
      </article>
    </div>
  )
}

export default Resume
