import { useState, useEffect } from 'react'
import './App.css'
import Entry from './pages/Entry'
import RecruiterLayout from './layouts/RecruiterLayout'
import VisitorLayout from './layouts/VisitorLayout'

function App() {
  const [entry, setEntry] = useState(() => {
    try {
      const stored = sessionStorage.getItem('entry') || null
      if (!stored) {
        // Deep-link: ?tab=movies (or any tab) auto-enters the visitor view
        const tab = new URLSearchParams(window.location.search).get('tab')
        if (tab) return 'visitor'
      }
      return stored
    } catch (e) {
      return null
    }
  })

  useEffect(() => {
    try {
      if (entry) sessionStorage.setItem('entry', entry)
      else sessionStorage.removeItem('entry')
    } catch (e) {
      // ignore storage errors
    }
  }, [entry])

  function handleChoose(value) {
    setEntry(value)
  }

  function handleBack() {
    setEntry(null)
  }

  if (!entry) {
    return <Entry onChoose={handleChoose} />
  }

  const flowClass = entry === 'recruiter' ? 'flow-professional' : 'flow-playful'

  return (
    <div className={flowClass}>
      {entry === 'recruiter' ? (
        <RecruiterLayout onBack={handleBack} />
      ) : (
        <VisitorLayout onBack={handleBack} />
      )}
    </div>
  )
}

export default App
