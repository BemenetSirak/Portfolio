import React from 'react'
import './ContactStrip.css'

export default function ContactStrip({ contact }) {
  return (
    <div className="contact-strip panel">
      <h4>Let's Connect!</h4>
      <div className="icons">
        <a href={`mailto:${contact.email}`} aria-label="email">✉️</a>
        <a href={contact.linkedin} aria-label="linkedin" target="_blank" rel="noreferrer">in</a>
      </div>
    </div>
  )
}
