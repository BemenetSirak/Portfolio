import React from 'react'
import './FunZone.css'

const FACTS = [
  { text: 'I can code for hours with lo-fi music on' },
  { text: "I've visited 12+ places and counting" },
  { text: 'My go-to drink is iced latte' },
  { text: 'I love solving puzzles and riddles' },
]

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="fact-check">
      <circle cx="8" cy="8" r="8" fill="#d1fae5"/>
      <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function FunZone() {
  return (
    <div className="fun-facts panel">
      <h3>Fun Facts About Me</h3>
      <ul className="facts-list">
        {FACTS.map((f, i) => (
          <li key={i}>
            <Check />
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
