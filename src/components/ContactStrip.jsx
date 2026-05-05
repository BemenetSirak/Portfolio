import React from 'react'
import './ContactStrip.css'

function IgIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  )
}
function GhIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.12-1.5-1.12-1.5-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0 1 12 7.8c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49C19.14 20.62 22 16.78 22 12.26 22 6.58 17.52 2 12 2z" fill="currentColor"/>
    </svg>
  )
}
function LiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M11 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M11 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}
function TwIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function ContactStrip({ contact }) {
  const socials = [
    { label: 'Instagram', href: contact.instagram || '#', icon: <IgIcon />, cls: 'soc-ig' },
    { label: 'GitHub',    href: contact.github    || '#', icon: <GhIcon />, cls: 'soc-gh' },
    { label: 'LinkedIn',  href: contact.linkedin  || '#', icon: <LiIcon />, cls: 'soc-li' },
    { label: 'Email',     href: `mailto:${contact.email}`, icon: <MailIcon />, cls: 'soc-mail' },
  ]

  return (
    <div className="contact-strip panel">
      <h3>Let's Connect!</h3>
      <p className="contact-sub">Feel free to say hi or just start a conversation!</p>
      <div className="social-icons">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className={`social-btn ${s.cls}`}
            target={s.href.startsWith('mailto') ? undefined : '_blank'}
            rel={s.href.startsWith('mailto') ? undefined : 'noreferrer'}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  )
}
