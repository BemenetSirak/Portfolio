import React, { useState } from 'react'
import profile from '../data/profileData'
import './RecruiterLayout.css'

const NAV = [
  { label: 'About',      id: 'rl-hero' },
  { label: 'Experience', id: 'rl-experience' },
  { label: 'Projects',   id: 'rl-projects' },
  { label: 'Skills',     id: 'rl-skills' },
  { label: 'Education',  id: 'rl-education' },
  { label: 'Resume',     id: 'rl-resume' },
  { label: 'Contact',    id: 'rl-contact' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function RecruiterLayout({ onBack }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="rl-root">

      {/* ── Sticky nav ── */}
      <header className="rl-header">
        <div className="rl-header-inner">
          <button className="rl-brand" onClick={onBack} aria-label="Home">
            <span className="rl-brand-b">B</span>
          </button>

          <nav className="rl-nav">
            {NAV.map(l => (
              <button key={l.id} className="rl-nav-link" onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="rl-header-actions">
            <a href="/assets/resume.pdf" download className="rl-btn-primary rl-btn-sm">
              Download Resume
            </a>
            <button className="rl-nav-link rl-switch-btn" onClick={onBack}>
              ← Switch
            </button>
            <button
              className="rl-hamburger"
              onClick={() => setMenuOpen(s => !s)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="rl-mobile-drawer" aria-label="Mobile navigation">
            {NAV.map(l => (
              <button
                key={l.id}
                className="rl-mobile-nav-item"
                onClick={() => { scrollTo(l.id); setMenuOpen(false) }}
              >
                {l.label}
              </button>
            ))}
            <div className="rl-mobile-drawer-actions">
              <a
                href="/assets/resume.pdf"
                download
                className="rl-btn-primary rl-btn-sm"
                onClick={() => setMenuOpen(false)}
              >
                Download Resume
              </a>
              <button
                className="rl-nav-link rl-switch-btn"
                onClick={() => { onBack(); setMenuOpen(false) }}
              >
                ← Switch
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="rl-main">

        {/* ── Hero ── */}
        <section id="rl-hero" className="rl-hero">
          <div className="rl-hero-left">
            <span className="rl-greeting">Hello, I'm</span>
            <h1 className="rl-name">{profile.name}</h1>
            <p className="rl-role">{profile.title}</p>
            <p className="rl-bio">{profile.summary}</p>
            <div className="rl-hero-cta">
              <a href={`mailto:${profile.contact.email}`} className="rl-btn-primary">
                Hire Me
              </a>
              <button className="rl-btn-outline" onClick={() => scrollTo('rl-projects')}>
                View My Work
              </button>
            </div>
          </div>
          <div className="rl-hero-right">
            <div className="rl-photo-frame">
              <img
                src="/images/recruiter-hero.jpg"
                alt={profile.name}
                className="rl-photo"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              <div className="rl-photo-fallback" aria-hidden="true">
                {profile.name.split(' ').map(w => w[0]).join('')}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <div className="rl-stats-bar">
          {profile.stats.map((s, i) => (
            <div key={i} className="rl-stat">
              <span className="rl-stat-value">{s.value}</span>
              <span className="rl-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Experience + Projects ── */}
        <div className="rl-two-col">

          <section id="rl-experience" className="rl-card">
            <h2 className="rl-section-heading">Experience</h2>
            <div className="rl-timeline">
              {profile.experience.map((e, i) => (
                <div key={i} className="rl-tl-item">
                  <div className="rl-tl-marker">
                    <div className="rl-tl-dot" />
                    <div className="rl-tl-line" />
                  </div>
                  <div className="rl-tl-body">
                    <h3 className="rl-tl-role">{e.role}</h3>
                    <p className="rl-tl-company">
                      {e.company}{e.location ? <span className="rl-tl-location"> · {e.location}</span> : null}
                    </p>
                    <span className="rl-tl-dates">{e.from} – {e.to}</span>
                    <ul className="rl-tl-bullets">
                      {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="rl-projects" className="rl-card">
            <h2 className="rl-section-heading">Featured Projects</h2>
            <div className="rl-projects-grid">
              {profile.projects.map((p, i) => (
                <div key={i} className={`rl-project-card${p.highlights?.length ? ' rl-project-card--featured' : ''}`}>
                  <div className="rl-project-top">
                    <div className="rl-project-thumb" style={{ background: p.gradient }}>
                      <span className="rl-project-initial">{p.title[0]}</span>
                    </div>
                    <div className="rl-project-body">
                      <p className="rl-project-tagline">{p.tagline}</p>
                      <h3 className="rl-project-title">{p.title}</h3>
                      <div className="rl-tech-list">
                        {p.tech.map(t => <span key={t} className="rl-tech-tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                  {p.description && (
                    <p className="rl-project-desc">{p.description}</p>
                  )}
                  {p.highlights?.length > 0 && (
                    <ul className="rl-project-highlights">
                      {p.highlights.map((h, j) => <li key={j}>{h}</li>)}
                    </ul>
                  )}
                  {p.url && p.url !== '#' && (
                    <a href={p.url} target="_blank" rel="noreferrer" className="rl-project-link">
                      View on GitHub →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── Skills ── */}
        <section id="rl-skills" className="rl-card rl-skills-card">
          <h2 className="rl-section-heading">Skills</h2>
          <div className="rl-skills-row">
            {profile.skills.map((s, i) => (
              <React.Fragment key={s.name}>
                <div className="rl-skill">
                  <div className="rl-skill-badge" style={{ background: s.color }}>
                    {s.abbr}
                  </div>
                  <span className="rl-skill-label">{s.name}</span>
                </div>
                {i < profile.skills.length - 1 && (
                  <svg className="rl-skill-sep" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8h8M9 5l3 3-3 3" stroke="rgba(255,255,255,0.20)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ── Education + Certifications ── */}
        <div className="rl-two-col">

          <section id="rl-education" className="rl-card">
            <h2 className="rl-section-heading">Education</h2>
            <div className="rl-edu-list">
              {profile.education.map((e, i) => (
                <div key={i} className="rl-edu-item">
                  <div className="rl-edu-icon">🎓</div>
                  <div>
                    <h3 className="rl-edu-degree">{e.degree}</h3>
                    <p className="rl-edu-school">{e.school}</p>
                    <p className="rl-edu-years">{e.from} – {e.to}</p>
                    {e.note && <p className="rl-edu-note">{e.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rl-card">
            <h2 className="rl-section-heading">Core Strengths</h2>
            <div className="rl-strengths">
              {['Data Analysis', 'Power BI Dashboards', 'OOP', 'Process Improvement', 'Reporting Automation', 'Federal Compliance', 'SQL Querying', 'Agile Collaboration'].map(s => (
                <span key={s} className="rl-strength-tag">{s}</span>
              ))}
            </div>
          </section>

        </div>

        {/* ── Resume ── */}
        <section id="rl-resume" className="rl-card rl-resume-card">
          <div className="rl-resume-top">
            <h2 className="rl-section-heading">Resume</h2>
            <a href="/assets/resume.pdf" download className="rl-btn-outline rl-btn-sm">
              Download PDF
            </a>
          </div>

          {/* Summary */}
          <div className="rl-resume-block">
            <h3 className="rl-resume-block-title">Summary</h3>
            <p className="rl-resume-body">{profile.summary}</p>
          </div>

          {/* Skills */}
          <div className="rl-resume-block">
            <h3 className="rl-resume-block-title">Skills</h3>
            <div className="rl-resume-skill-groups">
              <div className="rl-resume-skill-group">
                <span className="rl-resume-skill-cat">Programming Languages</span>
                <div className="rl-resume-tags">
                  {['Java', 'Python', 'SQL'].map(s => <span key={s} className="rl-resume-tag">{s}</span>)}
                </div>
              </div>
              <div className="rl-resume-skill-group">
                <span className="rl-resume-skill-cat">Software & Tools</span>
                <div className="rl-resume-tags">
                  {['Power BI', 'Git', 'Microsoft Excel'].map(s => <span key={s} className="rl-resume-tag">{s}</span>)}
                </div>
              </div>
              <div className="rl-resume-skill-group">
                <span className="rl-resume-skill-cat">Core Strengths</span>
                <div className="rl-resume-tags">
                  {['Data Analysis', 'OOP', 'Process Improvement', 'Reporting Automation'].map(s => <span key={s} className="rl-resume-tag">{s}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="rl-resume-block">
            <h3 className="rl-resume-block-title">Professional Experience</h3>
            {profile.experience.map((e, i) => (
              <div key={i} className="rl-resume-exp">
                <div className="rl-resume-exp-row">
                  <div>
                    <h4 className="rl-resume-role">{e.role}</h4>
                    <p className="rl-resume-company">
                      {e.company}{e.location ? ` · ${e.location}` : ''}
                    </p>
                  </div>
                  <span className="rl-resume-dates">{e.from} – {e.to}</span>
                </div>
                <ul className="rl-resume-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="rl-resume-block">
            <h3 className="rl-resume-block-title">Education</h3>
            {profile.education.map((e, i) => (
              <div key={i} className="rl-resume-exp">
                <div className="rl-resume-exp-row">
                  <div>
                    <h4 className="rl-resume-role">{e.degree}</h4>
                    <p className="rl-resume-company">{e.school}</p>
                  </div>
                  <span className="rl-resume-dates">{e.from} – {e.to}</span>
                </div>
                {e.note && <p className="rl-resume-note">{e.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="rl-contact" className="rl-card rl-contact-card">
          <h2 className="rl-section-heading">Get In Touch</h2>
          <p className="rl-contact-sub">
            Open to new opportunities — feel free to reach out via email or connect on LinkedIn.
          </p>
          <div className="rl-contact-links">
            <a href={`mailto:${profile.contact.email}`} className="rl-contact-link">
              <span className="rl-contact-icon">✉</span>
              {profile.contact.email}
            </a>
            <a href={`tel:${profile.contact.phone}`} className="rl-contact-link">
              <span className="rl-contact-icon">📞</span>
              {profile.contact.phone}
            </a>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="rl-contact-link">
              <span className="rl-contact-icon">in</span>
              LinkedIn
            </a>
            <a href={profile.contact.github} target="_blank" rel="noreferrer" className="rl-contact-link">
              <span className="rl-contact-icon">{'</>'}</span>
              GitHub
            </a>
          </div>
        </section>

      </main>
    </div>
  )
}
