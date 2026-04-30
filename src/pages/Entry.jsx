import React from 'react'
import './Entry.css'

function Entry({ onChoose }) {
  return (
    <main className="entry-root">
      <div style={{display:'flex',justifyContent:'flex-end'}}>
        <a href="/" className="brand-link" style={{textDecoration:'none'}}><span style={{fontFamily:'Brush Script MT, cursive',fontSize:26,color:'var(--accent)'}}>B</span></a>
      </div>
      <h1>Welcome!</h1>
      <p>Which experience would you like to explore?</p>
      <div className="entry-grid">
        <button
          className="entry-card recruiter"
          onClick={() => onChoose('recruiter')}
          aria-label="Enter recruiter experience"
        >
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <img src="/images/recruiter.svg" alt="recruiter" style={{width:48,height:48}} />
            <div>
              <h2>I'm a Recruiter</h2>
              <p>View my professional experience, projects, and contact info.</p>
            </div>
          </div>
        </button>

        <button
          className="entry-card visitor"
          onClick={() => onChoose('visitor')}
          aria-label="Enter visitor experience"
        >
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <img src="/images/visitor.svg" alt="visitor" style={{width:48,height:48}} />
            <div>
              <h2>I'm a Visitor</h2>
              <p>Explore my personal side, hobbies, and interactive bits.</p>
            </div>
          </div>
        </button>
      </div>
      <p className="tip">Tip: you can switch between experiences anytime.</p>
      <p style={{marginTop:18,textAlign:'center'}}>
        <a href="/demo-roadmap" target="_blank" rel="noreferrer">View demo & roadmap (poster)</a>
      </p>
    </main>
  )
}

export default Entry
