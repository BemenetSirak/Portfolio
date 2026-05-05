import React, { useState, useEffect, useRef } from 'react'
import './InterestsDropdown.css'

const INTERESTS = [
  { id: 'history',  label: 'History',  icon: '/icons/icon-history.svg',  desc: 'Ancient empires, Medieval Europe & modern conflicts' },
  { id: 'religion', label: 'Religion', icon: '/icons/icon-religion.svg', desc: 'Oriental Orthodox, specificall Ethopian Orthodox Christianity & traditions' },
  { id: 'movies',   label: 'Movies',   icon: '/icons/icon-movies.svg',   desc: 'Top 10 films & shows with ratings and notes' },
  { id: 'football', label: 'Football', icon: '/icons/icon-football.svg', desc: 'Arsenal FC and recreational 5-a-side' },
  { id: 'hiking',   label: 'Hiking',   icon: '/icons/icon-hiking.svg',   desc: 'Mountain trails and bucket-list routes' },
]

export default function InterestsDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    if (!open) return
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  function openTab(tabId) {
    setOpen(false)
    window.dispatchEvent(new CustomEvent('openInterestTab', { detail: { tab: tabId } }))
    setTimeout(() => {
      document.getElementById('things-i-love')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="interests-dd" ref={ref}>
      <button
        className={`link interests-trigger${open ? ' open' : ''}`}
        onClick={() => setOpen(s => !s)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Interests
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="dd-caret">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="interests-menu" role="menu">
          <div className="interests-menu-header">My Interests</div>
          {INTERESTS.map(item => (
            <button
              key={item.id}
              className="interests-item"
              onClick={() => openTab(item.id)}
              role="menuitem"
            >
              <img src={item.icon} alt="" width="36" height="36" className="item-icon" />
              <div className="item-text">
                <span className="item-label">{item.label}</span>
                <span className="item-desc">{item.desc}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="item-arrow">
                <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
