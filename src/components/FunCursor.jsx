import React, { useEffect, useRef } from 'react'
import './FunCursor.css'

export default function FunCursor() {
  const ref = useRef()
  const dest = useRef({ x: -200, y: -200 })

  useEffect(() => {
    function onMove(e) {
      dest.current = { x: e.clientX, y: e.clientY }
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`
        ref.current.style.top  = `${e.clientY}px`
      }
    }

    function onOver(e) {
      const hovering = !!e.target.closest('a, button, [role="button"], input, select, textarea, label')
      ref.current?.classList.toggle('is-hovering', hovering)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <div ref={ref} className="cursor-sword" aria-hidden="true">
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sword-blade" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#F8F8FF"/>
            <stop offset="40%"  stopColor="#D8D8E8"/>
            <stop offset="100%" stopColor="#8890A0"/>
          </linearGradient>
          <linearGradient id="sword-grip" x1="31" y1="31" x2="43" y2="43" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#7B5E3A"/>
            <stop offset="100%" stopColor="#4A3020"/>
          </linearGradient>
          <filter id="sword-glow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFD700" floodOpacity="0.85"/>
          </filter>
        </defs>

        {/* Blade */}
        <polygon points="2,2 32,24 24,32" fill="url(#sword-blade)"/>

        {/* Fuller — center groove highlight */}
        <line x1="4" y1="4" x2="26" y2="26"
          stroke="rgba(255,255,255,0.65)" strokeWidth="1" strokeLinecap="round"/>

        {/* Guard */}
        <line x1="21" y1="35" x2="35" y2="21"
          stroke="#C9A84C" strokeWidth="4" strokeLinecap="round"/>
        <line x1="22" y1="34" x2="34" y2="22"
          stroke="rgba(255,225,120,0.45)" strokeWidth="1.2" strokeLinecap="round"/>

        {/* Grip */}
        <line x1="31" y1="31" x2="42" y2="42"
          stroke="url(#sword-grip)" strokeWidth="5.5" strokeLinecap="round"/>

        {/* Wrap stitching */}
        <line x1="33" y1="32" x2="32" y2="33" stroke="#A07850" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="35" y1="34" x2="34" y2="35" stroke="#A07850" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="37" y1="36" x2="36" y2="37" stroke="#A07850" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="39" y1="38" x2="38" y2="39" stroke="#A07850" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Pommel */}
        <circle cx="45" cy="45" r="4.5" fill="#C9A84C" stroke="#8B6914" strokeWidth="1.5"/>
        <circle cx="45" cy="45" r="2"   fill="rgba(255,240,160,0.6)"/>
      </svg>
    </div>
  )
}
