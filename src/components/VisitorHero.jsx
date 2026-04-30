import React, { useEffect, useRef } from 'react'
import './VisitorHero.css'

export default function VisitorHero({ name, title, onExplore }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('show'))
  }, [])

  return (
    <section ref={ref} className="visitor-hero flow-playful reveal" data-flow="playful">
      <div className="hero-img">
        <img src="/images/visitor-hero.jpg" alt="hero" />
      </div>
      <div className="hero-body">
        <h1>Hey there! I'm {name.split(' ')[0]}!</h1>
        <p className="muted">Welcome to my world</p>
        <p>I'm a developer, gamer, coffee lover, travel enthusiast, and an anime fan.</p>
        <div className="hero-actions">
          <button onClick={() => onExplore('movies')} className="button">Let's Explore</button>
        </div>
      </div>
    </section>
  )
}
