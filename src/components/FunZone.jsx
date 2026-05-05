import React from 'react'
import './FunZone.css'
import profile from '../data/profileData'

export default function FunZone() {
  return (
    <div className="fun-facts panel">
      <h3>Things About Me</h3>
      <ul className="facts-list">
        {profile.funFacts.map((f, i) => (
          <li key={i}>
            <span className="fact-icon" aria-hidden="true">{f.icon}</span>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
