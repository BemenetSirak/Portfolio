import React, { useEffect, useState } from 'react'

const THEMES = ['light', 'dark']

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('theme')
    if (stored && THEMES.includes(stored)) return stored
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch (e) {
    // ignore
  }
  return 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
    const root = document.getElementById('root')
    if (root) root.setAttribute('data-theme', theme)
  }, [theme])

  function cycle() {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]
    setTheme(next)
  }

  return (
    <button onClick={cycle} aria-label={`Switch theme (current: ${theme})`} className="theme-toggle">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
