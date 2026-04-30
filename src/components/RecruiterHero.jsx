import React, { useEffect, useRef } from 'react'
import './RecruiterHero.css'

export default function RecruiterHero({ name, title, onAction }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('show'))
  }, [])

  return (
    <section ref={ref} className="recruiter-hero panel flow-professional reveal" data-flow="professional">
      <div className="recruiter-left">
        <h1>{name}</h1>
        <p className="muted">{title}</p>
        <p>I build reliable, maintainable systems with a focus on quality and performance.</p>
        <div className="hero-actions">
          <button className="button" onClick={() => onAction('resume')}>Download Resume</button>
          <button className="button" onClick={() => onAction('projects')} style={{marginLeft:8}}>View Projects</button>
          <button className="button" onClick={() => onAction('contact')} style={{marginLeft:8}}>Contact</button>
        </div>
      </div>
      <div className="recruiter-right">
        <img src="/images/recruiter-hero.jpg" alt="professional" />
      </div>
    </section>
  )
}
