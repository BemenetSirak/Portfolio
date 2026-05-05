import React from 'react'
import './DemoRoadmap.css'

export default function DemoRoadmap() {
  return (
    <div className="demo-roadmap">
      <header className="demo-header">
        <h1>PORTFOLIO WEBSITE — DEMO & ROADMAP</h1>
        <p>Two Experiences. One Portfolio. Choose your path.</p>
      </header>

      <div className="demo-columns">
        <section className="demo-col entry-col panel">
          <h3>1. ENTRY SECTION</h3>
          <div className="card">
            <h2>Welcome!</h2>
            <p>Who would you like to explore?</p>
            <div className="two-cards">
              <div className="small-card">I'm a Recruiter</div>
              <div className="small-card">I'm a Visitor</div>
            </div>
            <p className="tip">Tip: You can switch between experiences anytime!</p>
          </div>
          <ul className="suggestions">
            <li>Dual Experience</li>
            <li>Responsive Design</li>
            <li>Dark & Lite Modes</li>
            <li>Smooth Animations</li>
            <li>Easy Navigation</li>
            <li>Performance Optimized</li>
            <li>SEO Friendly</li>
            <li>Contact & CTA</li>
          </ul>
        </section>

        <section className="demo-col recruiter-col panel">
          <h3>2. RECRUITER EXPERIENCE (PROFESSIONAL)</h3>
          <div className="hero-card">
            <h2>Hello, I'm Alex Roberts</h2>
            <p>Full Stack Developer</p>
            <img src="/images/ai-animation.svg" alt="professional hero" />
          </div>
          <div className="features">
            <div className="feature">Experience</div>
            <div className="feature">Featured Projects</div>
            <div className="feature">Skills</div>
            <div className="feature">Education</div>
          </div>
        </section>

        <section className="demo-col visitor-col panel">
          <h3>3. VISITOR EXPERIENCE (FUN & INTERACTIVE)</h3>
          <div className="visitor-hero">
            <h2>Hey there! I'm Alex!</h2>
            <p>Welcome to my world</p>
            <img src="/images/ai-animation.svg" alt="visitor hero" />
          </div>
          <div className="things-love">
            <h4>Things I Love</h4>
            <div className="icons-row">
              <div className="icon">Gaming</div>
              <div className="icon">Music</div>
              <div className="icon">Travel</div>
              <div className="icon">Photography</div>
              <div className="icon">Anime</div>
              <div className="icon">Technology</div>
            </div>
          </div>
        </section>
      </div>

      <footer className="demo-footer panel">
        <h4>Step-by-step breakdown, what I need to do</h4>
        <ol>
          <li>Plan & Structure</li>
          <li>Set Up Project</li>
          <li>Design Entry Page</li>
          <li>Build Recruiter Site</li>
          <li>Build Visitor Site</li>
          <li>Add Utilities</li>
          <li>Test Everything</li>
          <li>Deploy & Share</li>
        </ol>
      </footer>
    </div>
  )
}
