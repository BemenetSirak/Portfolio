import React, { useState, useEffect, useMemo, useRef } from 'react'
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

function itemMatchesSkill(text, skill) {
  return text.toLowerCase().includes(skill.toLowerCase())
}

// Animated count-up stat, e.g. "1+" or "4+" -> counts 0 -> N once scrolled into view.
function AnimatedStat({ value, label }) {
  const ref = useRef(null)
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/)
  const [display, setDisplay] = useState(match ? `0${match[2] || ''}` : value)

  useEffect(() => {
    if (!match) return
    const target = parseFloat(match[1])
    const suffix = match[2] || ''
    const el = ref.current
    if (!el) return
    let done = false
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done) {
        done = true
        const duration = 900
        const start = performance.now()
        const isInt = Number.isInteger(target)
        const tick = now => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = target * eased
          setDisplay((isInt ? Math.round(current) : current.toFixed(1)) + suffix)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div ref={ref} className="rl-stat">
      <span className="rl-stat-value">{display}</span>
      <span className="rl-stat-label">{label}</span>
    </div>
  )
}

export default function RecruiterLayout({ onBack }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [shotsPanel, setShotsPanel] = useState(null)
  const [activeSection, setActiveSection] = useState('rl-hero')
  const [pastHero, setPastHero] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [toast, setToast] = useState(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [paletteIndex, setPaletteIndex] = useState(0)
  const toastTimer = useRef(null)

  function showToast(message) {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.contact.email)
      showToast('Email copied to clipboard')
    } catch {
      showToast(`Copy failed — email: ${profile.contact.email}`)
    }
  }

  // Scroll-spy: highlight the nav link for whichever section is in view.
  useEffect(() => {
    const sections = NAV.map(l => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Sticky quick-action bar appears once the hero scrolls out of view.
  useEffect(() => {
    const hero = document.getElementById('rl-hero')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: '-120px 0px 0px 0px', threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  // Reveal-on-scroll for anything tagged .rl-reveal.
  useEffect(() => {
    const els = document.querySelectorAll('.rl-reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rl-reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Command palette (⌘K / Ctrl+K) commands — plain data, dispatched by runCommand.
  // Kept action-free (only serializable fields) so the list itself never closes
  // over refs while it's being computed/rendered.
  const commands = useMemo(() => [
    ...NAV.map(l => ({ id: `nav-${l.id}`, label: `Go to ${l.label}`, group: 'Navigate', type: 'nav', navId: l.id })),
    ...profile.skills.map(s => ({ id: `skill-${s.name}`, label: `Filter by ${s.name}`, group: 'Skills', type: 'skill', skill: s.name })),
    ...profile.projects.map(p => ({ id: `proj-${p.title}`, label: `Project: ${p.title}`, group: 'Projects', type: 'nav', navId: 'rl-projects' })),
    { id: 'email', label: `Email ${profile.contact.email}`, group: 'Contact', type: 'email' },
    { id: 'copy-email', label: 'Copy email address', group: 'Contact', type: 'copy-email' },
    { id: 'linkedin', label: 'Open LinkedIn profile', group: 'Contact', type: 'link', href: profile.contact.linkedin },
    { id: 'github', label: 'Open GitHub profile', group: 'Contact', type: 'link', href: profile.contact.github },
    { id: 'resume', label: 'Download resume PDF', group: 'Contact', type: 'link', href: '/assets/resume.pdf' },
  ], [])

  const filteredCommands = useMemo(() => {
    const q = paletteQuery.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(c => c.label.toLowerCase().includes(q))
  }, [commands, paletteQuery])

  function openPalette() {
    setPaletteQuery('')
    setPaletteIndex(0)
    setPaletteOpen(true)
  }

  function runCommand(cmd) {
    if (cmd.type === 'nav') scrollTo(cmd.navId)
    else if (cmd.type === 'skill') { setSelectedSkill(cmd.skill); scrollTo('rl-experience') }
    else if (cmd.type === 'email') window.location.href = `mailto:${profile.contact.email}`
    else if (cmd.type === 'copy-email') copyEmail()
    else if (cmd.type === 'link') window.open(cmd.href, '_blank', 'noreferrer')
    setPaletteOpen(false)
  }

  function handlePaletteKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setPaletteIndex(i => Math.min(i + 1, filteredCommands.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setPaletteIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = filteredCommands[paletteIndex]
      if (cmd) runCommand(cmd)
    } else if (e.key === 'Escape') {
      setPaletteOpen(false)
    }
  }

  // Global ⌘K / Ctrl+K shortcut to open the command palette.
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openPalette()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
              <button
                key={l.id}
                className={`rl-nav-link${activeSection === l.id ? ' rl-nav-link--active' : ''}`}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="rl-header-actions">
            <button
              className="rl-search-btn"
              onClick={openPalette}
              aria-label="Open command palette"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M14 14l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <kbd className="rl-search-kbd">⌘K</kbd>
            </button>
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
            <AnimatedStat key={i} value={s.value} label={s.label} />
          ))}
        </div>

        {/* ── Experience + Projects ── */}
        <div className="rl-two-col">

          <section id="rl-experience" className="rl-card rl-reveal">
            <h2 className="rl-section-heading">Experience</h2>
            <div className="rl-timeline">
              {profile.experience.map((e, i) => {
                const haystack = `${e.role} ${e.company} ${e.bullets.join(' ')}`
                const dimmed = selectedSkill && !itemMatchesSkill(haystack, selectedSkill)
                return (
                  <div
                    key={i}
                    className={`rl-tl-item${dimmed ? ' rl-tl-item--dim' : ''}`}
                    style={{ '--reveal-index': i }}
                  >
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
                        {e.bullets.map((b, j) => (
                          <li
                            key={j}
                            className={selectedSkill && itemMatchesSkill(b, selectedSkill) ? 'rl-bullet--match' : ''}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section id="rl-projects" className="rl-card rl-reveal">
            <h2 className="rl-section-heading">Featured Projects</h2>
            <div className="rl-projects-grid">
              {profile.projects.map((p, i) => {
                const dimmed = selectedSkill && !p.tech.includes(selectedSkill)
                return (
                  <div
                    key={i}
                    className={`rl-project-card${p.highlights?.length ? ' rl-project-card--featured' : ''}${dimmed ? ' rl-project-card--dim' : ''}`}
                    style={{ '--reveal-index': i }}
                  >
                    <div className="rl-project-top">
                      <div className="rl-project-thumb" style={{ background: p.gradient }}>
                        <span className="rl-project-initial">{p.title[0]}</span>
                      </div>
                      <div className="rl-project-body">
                        <p className="rl-project-tagline">{p.tagline}</p>
                        <h3 className="rl-project-title">{p.title}</h3>
                        <div className="rl-tech-list">
                          {p.tech.map(t => (
                            <span
                              key={t}
                              className={`rl-tech-tag${selectedSkill === t ? ' rl-tech-tag--match' : ''}`}
                            >
                              {t}
                            </span>
                          ))}
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
                    {p.screenshots?.length > 0 && (
                      <button
                        type="button"
                        className="rl-project-link rl-view-shots-btn"
                        onClick={() => setShotsPanel(p)}
                      >
                        View Screenshots →
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

        </div>

        {shotsPanel && (
          <div className="rl-shots-backdrop" onClick={() => setShotsPanel(null)} role="dialog" aria-modal="true" aria-label={`${shotsPanel.title} screenshots`}>
            <div className="rl-shots-panel" onClick={e => e.stopPropagation()}>
              <div className="rl-shots-header">
                <div>
                  <h3 className="rl-shots-title">{shotsPanel.title}</h3>
                  <p className="rl-shots-subtitle">Preview only — still under active development</p>
                </div>
                <button className="rl-shots-close" onClick={() => setShotsPanel(null)} aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="rl-shots-grid">
                {shotsPanel.screenshots.map((s, k) => (
                  <button
                    key={k}
                    type="button"
                    className="rl-shot-card"
                    onClick={() => setLightbox(s)}
                    aria-label={`View screenshot: ${s.label}`}
                  >
                    <img src={s.src} alt={s.label} className="rl-shot-img" loading="lazy" />
                    <span className="rl-shot-tag" aria-hidden="true">Under Construction</span>
                    <span className="rl-shot-caption">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {lightbox && (
          <div className="rl-lightbox-backdrop" onClick={() => setLightbox(null)}>
            <div className="rl-lightbox-body" onClick={e => e.stopPropagation()}>
              <button className="rl-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
              <img src={lightbox.src} alt={lightbox.label} className="rl-lightbox-img" />
              <span className="rl-under-construction rl-under-construction--lg" aria-hidden="true">Under Construction</span>
              <p className="rl-lightbox-caption">{lightbox.label} — preview only, not a live link</p>
            </div>
          </div>
        )}

        {/* ── Skills ── */}
        <section id="rl-skills" className="rl-card rl-skills-card rl-reveal">
          <div className="rl-skills-heading-row">
            <h2 className="rl-section-heading">Skills</h2>
            <span className="rl-skills-hint">
              {selectedSkill
                ? <>Highlighting Experience &amp; Projects that use <strong>{selectedSkill}</strong>{' '}
                    <button type="button" className="rl-skill-clear" onClick={() => setSelectedSkill(null)}>Clear ×</button>
                  </>
                : 'Click a skill to see where it shows up above ↑'}
            </span>
          </div>
          <div className="rl-skills-row">
            {profile.skills.map((s, i) => (
              <React.Fragment key={s.name}>
                <button
                  type="button"
                  className={`rl-skill${selectedSkill === s.name ? ' rl-skill--active' : ''}`}
                  onClick={() => setSelectedSkill(sel => (sel === s.name ? null : s.name))}
                  aria-pressed={selectedSkill === s.name}
                >
                  <div className="rl-skill-badge" style={{ background: s.color }}>
                    {s.abbr}
                  </div>
                  <span className="rl-skill-label">{s.name}</span>
                </button>
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

          <section id="rl-education" className="rl-card rl-reveal">
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

          <section className="rl-card rl-reveal">
            <h2 className="rl-section-heading">Core Strengths</h2>
            <div className="rl-strengths">
              {['Data Analysis', 'Power BI Dashboards', 'OOP', 'Process Improvement', 'Reporting Automation', 'Federal Compliance', 'SQL Querying', 'Agile Collaboration'].map(s => (
                <span key={s} className="rl-strength-tag">{s}</span>
              ))}
            </div>
          </section>

        </div>

        {/* ── Resume ── */}
        <section id="rl-resume" className="rl-card rl-resume-card rl-reveal">
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

          {/* Projects */}
          <div className="rl-resume-block">
            <h3 className="rl-resume-block-title">Projects</h3>
            {profile.projects.map((p, i) => (
              <div key={i} className="rl-resume-exp">
                <div className="rl-resume-exp-row">
                  <div>
                    <h4 className="rl-resume-role">{p.title}</h4>
                    <p className="rl-resume-company">{p.tagline}</p>
                  </div>
                  {!p.screenshots?.length && p.url && p.url !== '#' && (
                    <a href={p.url} target="_blank" rel="noreferrer" className="rl-resume-dates" style={{ color: 'var(--rl-accent-lt)', fontSize: '0.8rem' }}>
                      GitHub →
                    </a>
                  )}
                </div>
                {p.description && <p className="rl-resume-body" style={{ margin: '6px 0 6px' }}>{p.description}</p>}
                {p.highlights?.length > 0 && (
                  <ul className="rl-resume-bullets">
                    {p.highlights.map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
                <div className="rl-resume-tags" style={{ marginTop: 8 }}>
                  {p.tech.map(t => <span key={t} className="rl-resume-tag">{t}</span>)}
                </div>
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
        <section id="rl-contact" className="rl-card rl-contact-card rl-reveal">
          <h2 className="rl-section-heading">Get In Touch</h2>
          <p className="rl-contact-sub">
            Open to new opportunities — feel free to reach out via email or connect on LinkedIn.
          </p>
          <div className="rl-contact-links">
            <div className="rl-contact-link rl-contact-link--email">
              <a href={`mailto:${profile.contact.email}`} className="rl-contact-email-anchor">
                <span className="rl-contact-icon">✉</span>
                {profile.contact.email}
              </a>
              <button
                type="button"
                className="rl-copy-btn"
                onClick={copyEmail}
                aria-label="Copy email address"
                title="Copy email address"
              >
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
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

      {/* ── Sticky quick-action bar (appears once hero scrolls out of view) ── */}
      <div className={`rl-quickbar${pastHero ? ' rl-quickbar--visible' : ''}`}>
        <a href={`mailto:${profile.contact.email}`} className="rl-quickbar-btn rl-quickbar-btn--primary">
          Hire Me
        </a>
        <a href="/assets/resume.pdf" download className="rl-quickbar-btn">
          Resume
        </a>
        <button type="button" className="rl-quickbar-btn" onClick={() => scrollTo('rl-contact')}>
          Contact
        </button>
      </div>

      {/* ── Toast ── */}
      <div className={`rl-toast${toast ? ' rl-toast--visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>

      {/* ── Command palette (⌘K) ── */}
      {paletteOpen && (
        <div className="rl-palette-backdrop" onClick={() => setPaletteOpen(false)}>
          <div className="rl-palette" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Command palette">
            <div className="rl-palette-input-row">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M14 14l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <input
                autoFocus
                type="text"
                className="rl-palette-input"
                placeholder="Jump to a section, filter by skill, or contact…"
                value={paletteQuery}
                onChange={e => { setPaletteQuery(e.target.value); setPaletteIndex(0) }}
                onKeyDown={handlePaletteKeyDown}
              />
              <kbd className="rl-palette-esc">Esc</kbd>
            </div>
            <div className="rl-palette-list">
              {filteredCommands.length === 0 && (
                <div className="rl-palette-empty">No matches</div>
              )}
              {filteredCommands.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  className={`rl-palette-item${i === paletteIndex ? ' rl-palette-item--active' : ''}`}
                  onMouseEnter={() => setPaletteIndex(i)}
                  onClick={() => runCommand(c)}
                >
                  <span className="rl-palette-item-label">{c.label}</span>
                  <span className="rl-palette-item-group">{c.group}</span>
                </button>
              ))}
            </div>
            <div className="rl-palette-footer">
              <span><kbd>↑↓</kbd> Navigate</span>
              <span><kbd>Enter</kbd> Select</span>
              <span><kbd>Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
