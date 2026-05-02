import React from 'react'
import profile from '../data/profileData'
import './RecruiterLayout.css'

const NAV = [
  { label: 'About',      id: 'rl-hero' },
  { label: 'Experience', id: 'rl-experience' },
  { label: 'Projects',   id: 'rl-projects' },
  { label: 'Skills',     id: 'rl-skills' },
  { label: 'Education',  id: 'rl-education' },
  { label: 'Contact',    id: 'rl-contact' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function RecruiterLayout({ onBack }) {
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
              Download CV
            </a>
            <button className="rl-nav-link rl-switch-btn" onClick={onBack}>
              ← Switch
            </button>
          </div>
        </div>
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
                  <div className="rl-tl-left">
                    <span className="rl-tl-dates">{e.from} – {e.to}</span>
                    <div className="rl-tl-line" />
                  </div>
                  <div className="rl-tl-body">
                    <div className="rl-tl-dot" />
                    <h3 className="rl-tl-role">{e.role}</h3>
                    <p className="rl-tl-company">{e.company}</p>
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
                <a key={i} href={p.url} className="rl-project-card" onClick={e => e.preventDefault()}>
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
                </a>
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
            {profile.education.map((e, i) => (
              <div key={i} className="rl-edu-item">
                <div className="rl-edu-icon">🎓</div>
                <div>
                  <h3 className="rl-edu-degree">{e.degree}</h3>
                  <p className="rl-edu-school">{e.school}</p>
                  <p className="rl-edu-years">{e.from} – {e.to}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="rl-card">
            <h2 className="rl-section-heading">Certifications</h2>
            <div className="rl-certs">
              {profile.certifications.map((c, i) => (
                <div key={i} className="rl-cert-row">
                  <div className="rl-cert-check">✓</div>
                  <span className="rl-cert-name">{c.name}</span>
                  <span className="rl-cert-year">{c.year}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

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
