import { useEffect, useState } from 'react'
import { getTheme, setTheme } from '../utils/theme'

export default function ThemeToggle() {
  const [theme, setLocalTheme] = useState(getTheme)

  // Make sure the DOM attribute/localStorage reflect this initial value
  // (harmless if another mount already applied it) and pick up any
  // change broadcast by this toggle, the candle, or anything else.
  useEffect(() => {
    setTheme(theme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function onThemeChange(e) { setLocalTheme(e.detail.theme) }
    window.addEventListener('themechange', onThemeChange)
    return () => window.removeEventListener('themechange', onThemeChange)
  }, [])

  function cycle() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button onClick={cycle} aria-label={`Switch theme (current: ${theme})`} className="theme-toggle">
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  )
}
