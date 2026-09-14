import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './ThingsILove.css'
import MoviesPanel from './MoviesPanel'
import profile from '../data/profileData'
import { INK_ICONS } from './InkIcons'

// A quick rewind-roll between interest "datasets": the outgoing panel
// rolls up and away like a scroll snapping shut, the incoming one
// unrolls back down to open — rather than a flat crossfade.
const ROLL_VARIANTS = {
  initial: { scaleY: 0.06, opacity: 0 },
  animate: { scaleY: 1, opacity: 1, transition: { duration: 0.42, ease: [0.25, 1, 0.5, 1] } },
  exit: { scaleY: 0.06, opacity: 0, transition: { duration: 0.28, ease: [0.5, 0, 0.75, 0] } },
}

// Framer Motion doesn't consult prefers-reduced-motion on its own — a
// visitor who's asked their OS for less motion still gets the full
// scaleY roll otherwise, which is exactly the kind of large, fast
// transform that setting is meant to suppress.
const REDUCED_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

const TABS = [
  { id: 'history',  label: 'History',  delay: 0 },
  { id: 'religion', label: 'Religion', delay: 60 },
  { id: 'movies',   label: 'Movies',   delay: 120 },
  { id: 'football', label: 'Football', delay: 180 },
  { id: 'hiking',   label: 'Hiking',   delay: 240 },
  { id: 'coffee',   label: 'Coffee',   delay: 300 },
]

function getTabFromURL() {
  try {
    return new URLSearchParams(window.location.search).get('tab') || null
  } catch {
    return null
  }
}

function setTabInURL(tab) {
  try {
    const url = new URL(window.location.href)
    if (tab) url.searchParams.set('tab', tab)
    else url.searchParams.delete('tab')
    window.history.replaceState({ tab }, '', url)
  } catch {
    // URL sync is best-effort; the tab still opens without it
  }
}

function InterestPanel({ data }) {
  const bgStyle = data.bgStyle ?? {
    backgroundImage: data.bg ? `url(${data.bg})` : undefined,
    backgroundPosition: data.bgPosition ?? 'center center',
    backgroundSize: data.bgSize ?? 'cover',
    backgroundColor: data.bgColor ?? undefined,
  }

  return (
    <div
      className={`love-panel panel-bg${data.extraClass ? ' ' + data.extraClass : ''}`}
      style={bgStyle}
    >
      <div className="panel-bg-content">
        <h4>{data.title}</h4>
        <p>{data.intro}</p>
        <ul className="era-list">
          {data.bullets.map((b, i) => (
            <li key={i}><strong>{b.heading}</strong> — {b.body}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ThingsILove() {
  const [active, setActive] = useState(() => getTabFromURL())
  const reduceMotion = useReducedMotion()
  const rollVariants = reduceMotion ? REDUCED_VARIANTS : ROLL_VARIANTS

  useEffect(() => {
    function onPop() { setActive(getTabFromURL()) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    function onTrigger(e) {
      setActive(e.detail.tab)
      setTabInURL(e.detail.tab)
    }
    window.addEventListener('openInterestTab', onTrigger)
    return () => window.removeEventListener('openInterestTab', onTrigger)
  }, [])

  function handleTabChange(tab) {
    const next = active === tab ? null : tab
    setActive(next)
    setTabInURL(next)
  }

  const activeInterest = profile.interests.find(i => i.id === active)

  return (
    <div id="things-i-love" className="things-i-love">
      <div className="love-row">
        <h3>Things I Love</h3>

        <div className="love-buttons" role="tablist" aria-label="Things I love">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-pressed={active === t.id}
              onClick={() => handleTabChange(t.id)}
              className={`icon-card${active === t.id ? ' active' : ''}`}
              style={{ animationDelay: `${t.delay}ms` }}
            >
              <span className="icon">{INK_ICONS[t.id]}</span>
              <span className="label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="love-panels">
        <AnimatePresence mode="wait">
          {active === 'movies' && (
            <motion.div
              key="movies"
              className="love-panel movies-panel-wrap panel"
              style={{ transformOrigin: 'top center' }}
              variants={rollVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <MoviesPanel />
            </motion.div>
          )}
          {active && active !== 'movies' && activeInterest && (
            <motion.div
              key={active}
              style={{ transformOrigin: 'top center' }}
              variants={rollVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <InterestPanel data={activeInterest} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
