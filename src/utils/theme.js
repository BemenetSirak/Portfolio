// Single source of truth for the site's light/dark theme. Both the nav
// toggle and the visitor page's candle call setTheme() directly and
// listen for 'themechange' — there is no multi-hop event relay between
// them, so the two can never disagree about which theme is active.
const THEMES = ['light', 'dark']

export function getTheme() {
  try {
    const stored = localStorage.getItem('theme')
    if (THEMES.includes(stored)) return stored
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch {
    // storage or matchMedia unavailable — fall through to light
  }
  return 'light'
}

export function setTheme(next) {
  if (!THEMES.includes(next)) return
  try {
    localStorage.setItem('theme', next)
  } catch {
    // persistence is best-effort
  }
  const root = document.getElementById('root')
  if (root) root.setAttribute('data-theme', next)
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }))
}
