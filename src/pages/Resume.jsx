import React from 'react'
import profile from '../data/profileData'
import './Resume.css'

export default function Resume({ onClose }) {
  return (
    <div className="rv-root">
      <header className="rv-header">
        <div>
          <h1 className="rv-name">{profile.name}</h1>
          <p className="rv-title">{profile.title}</p>
          <div className="rv-contact-row">
            <a href={`mailto:${profile.contact.email}`} className="rv-contact-link">✉ {profile.contact.email}</a>
            {profile.contact.phone && <span className="rv-contact-link">📞 {profile.contact.phone}</span>}
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="rv-contact-link">in LinkedIn</a>
          </div>
        </div>
        <div className="rv-header-actions">
          <a href="/assets/resume.pdf" download className="rv-btn-primary">Download PDF</a>
          <button onClick={onClose} className="rv-btn-ghost">Close</button>
        </div>
      </header>

      <div className="rv-body">

        {/* Summary */}
        <section className="rv-section">
          <h2 className="rv-section-title">Summary</h2>
          <p className="rv-body-text">{profile.summary}</p>
        </section>

        {/* Skills */}
        <section className="rv-section">
          <h2 className="rv-section-title">Skills</h2>
          <div className="rv-skill-groups">
            <div className="rv-skill-group">
              <span className="rv-skill-cat">Programming Languages</span>
              <div className="rv-tags">
                {['Java', 'Python', 'SQL'].map(s => <span key={s} className="rv-tag">{s}</span>)}
              </div>
            </div>
            <div className="rv-skill-group">
              <span className="rv-skill-cat">Software & Tools</span>
              <div className="rv-tags">
                {['Power BI', 'Git', 'Microsoft Excel'].map(s => <span key={s} className="rv-tag">{s}</span>)}
              </div>
            </div>
            <div className="rv-skill-group">
              <span className="rv-skill-cat">Core Strengths</span>
              <div className="rv-tags">
                {['Data Analysis', 'OOP', 'Process Improvement', 'Reporting Automation'].map(s => <span key={s} className="rv-tag">{s}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="rv-section">
          <h2 className="rv-section-title">Professional Experience</h2>
          {profile.experience.map((e, i) => (
            <div key={i} className="rv-exp-item">
              <div className="rv-exp-row">
                <div>
                  <h3 className="rv-exp-role">{e.role}</h3>
                  <p className="rv-exp-company">{e.company}{e.location ? ` · ${e.location}` : ''}</p>
                </div>
                <span className="rv-exp-dates">{e.from} – {e.to}</span>
              </div>
              <ul className="rv-bullets">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="rv-section">
          <h2 className="rv-section-title">Education</h2>
          {profile.education.map((e, i) => (
            <div key={i} className="rv-exp-item">
              <div className="rv-exp-row">
                <div>
                  <h3 className="rv-exp-role">{e.degree}</h3>
                  <p className="rv-exp-company">{e.school}</p>
                </div>
                <span className="rv-exp-dates">{e.from} – {e.to}</span>
              </div>
              {e.note && <p className="rv-note">{e.note}</p>}
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="rv-section">
          <h2 className="rv-section-title">Projects</h2>
          <div className="rv-projects">
            {profile.projects.map((p, i) => (
              <div key={i} className="rv-project-item">
                <h3 className="rv-exp-role">{p.title}</h3>
                <p className="rv-body-text" style={{ margin: '2px 0 6px' }}>{p.description}</p>
                <div className="rv-tags">
                  {p.tech.map(t => <span key={t} className="rv-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
