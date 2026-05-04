import React, { useState, useEffect } from 'react'
import './ThingsILove.css'
import MoviesPanel from './MoviesPanel'

const TABS = [
  { id: 'history',  label: 'History',  icon: '/icons/icon-history.svg',  delay: 0 },
  { id: 'religion', label: 'Religion', icon: '/icons/icon-religion.svg', delay: 60 },
  { id: 'movies',   label: 'Movies',   icon: '/icons/icon-movies.svg',   delay: 120 },
  { id: 'football', label: 'Football', icon: '/icons/icon-football.svg', delay: 180 },
  { id: 'hiking',   label: 'Hiking',   icon: '/icons/icon-hiking.svg',   delay: 240 },
]

function getTabFromURL() {
  try {
    return new URLSearchParams(window.location.search).get('tab') || null
  } catch (e) {
    return null
  }
}

function setTabInURL(tab) {
  try {
    const url = new URL(window.location.href)
    if (tab) url.searchParams.set('tab', tab)
    else url.searchParams.delete('tab')
    window.history.replaceState({ tab }, '', url)
  } catch (e) {}
}

export default function ThingsILove() {
  const [active, setActive] = useState(() => getTabFromURL())

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

  return (
    <div id="things-i-love" className="things-i-love panel">
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
            <img src={t.icon} alt={t.label} className="icon" />
            <span className="label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="love-panels">

        {/* ── History ─── */}
        {active === 'history' && (
          <div
            key="history"
            className="love-panel panel-bg"
            style={{ backgroundImage: 'url(/images/history-knights.jpg)', backgroundPosition: 'center 25%' }}
          >
            <div className="panel-bg-content">
              <h4>History Through the Ages</h4>
              <p>
                History has always fascinated me — the sweep of empires, the lives of ordinary people caught in extraordinary times, and the way the past quietly shapes everything around us today.
              </p>
              <ul className="era-list">
                <li><strong>Ancient Ethiopia &amp; the Aksumite Empire</strong> — One of the great civilisations the world rarely talks about. A trading powerhouse, an early centre of Christianity, and home to some of the most striking monuments in Africa.</li>
                <li><strong>Medieval Europe — Knights, Crusades &amp; Feudalism</strong> — The chivalric ideal vs. the brutal reality. The clash of kingdoms, the role of the Church, and the slow birth of modern governance.</li>
                <li><strong>The Ottoman Empire</strong> — A multi-ethnic superpower that bridged East and West for six centuries. Its rise and gradual decline reshaped three continents.</li>
                <li><strong>World War II</strong> — The defining conflict of the modern world. Leadership, sacrifice, propaganda, and the terrifying fragility of civilisation under pressure.</li>
                <li><strong>The Cold War Era</strong> — A chess match played on a global board, where ideology, technology, and espionage shaped the world we still live in.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── Religion ─── */}
        {active === 'religion' && (
          <div
            key="religion"
            className="love-panel panel-bg"
            style={{ backgroundImage: 'url(/images/orthodox-cross-filigree.jpg)', backgroundPosition: 'center center', backgroundSize: 'contain', backgroundColor: '#0a0a0a' }}
          >
            <div className="panel-bg-content">
              <h4>Ethiopian Orthodox Christianity</h4>
              <p>
                I was raised in the Ethiopian Orthodox Tewahedo Church — one of the oldest Christian traditions in the world, tracing its roots back to the 4th century and the conversion of Emperor Ezana of Aksum.
              </p>
              <ul className="era-list">
                <li><strong>Deep roots</strong> — The Ethiopian church has maintained unbroken traditions for over 1,600 years, including its own liturgical calendar, sacred language (Ge'ez), and biblical canon.</li>
                <li><strong>Fasting &amp; feasting</strong> — Fasting is central to the faith. The fasting calendar is one of the most demanding of any Christian tradition — and the feasts that follow are equally joyful.</li>
                <li><strong>The Ark of the Covenant</strong> — According to Ethiopian tradition, the original Ark resides in Axum. Whether or not you believe it, that belief shapes the nation's identity profoundly.</li>
                <li><strong>Community</strong> — For me, faith is inseparable from family and community. Sunday services, coffee ceremonies, and shared meals are all expressions of the same spiritual life.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── Movies ─── */}
        {active === 'movies' && (
          <div key="movies" className="love-panel movies-panel-wrap panel">
            <MoviesPanel />
          </div>
        )}

        {/* ── Football ─── */}
        {active === 'football' && (
          <div
            key="football"
            className="love-panel panel-bg arsenal-panel"
            style={{
              background: 'linear-gradient(135deg, #0a0a14 0%, #1a0505 60%, #2a0808 100%)',
              backgroundImage: 'url(/images/arsenal-logo.svg)',
              backgroundSize: '320px auto',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 48px center',
            }}
          >
            <div className="panel-bg-content">
              <h4>Arsenal FC &amp; the Beautiful Game</h4>
              <p>
                I've supported Arsenal since I was old enough to know what a Premier League table was. The highs, the lows, and the perpetual hope that this year might actually be our year.
              </p>
              <ul className="era-list">
                <li><strong>Why Arsenal?</strong> — The Invincibles era cemented it for me. A team that went an entire season unbeaten is the stuff of legend, and that legacy never leaves you.</li>
                <li><strong>Style of play</strong> — Arsenal at their best play attractive, technical football. Watching Mikel Arteta build something genuinely exciting at the Emirates has been a joy.</li>
                <li><strong>Playing recreationally</strong> — Beyond watching, I play 5-a-side regularly. It's the best stress relief I know — nothing clears your head like a full-sprint game.</li>
                <li><strong>The community</strong> — Football is a shared language. It doesn't matter where you're from; a late winner in stoppage time feels the same in every language.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── Hiking ─── */}
        {active === 'hiking' && (
          <div key="hiking" className="love-panel panel-bg hiking-gradient">
            <div className="panel-bg-content">
              <h4>Trails, Mountains &amp; Open Skies</h4>
              <p>
                Hiking is where I go to reset. There's something about being out in open terrain — away from screens, notifications, and city noise — that puts everything in perspective.
              </p>
              <ul className="era-list">
                <li><strong>Why I hike</strong> — It's meditative in the best way. Every trail demands your full attention, and in return it gives you views you can't buy.</li>
                <li><strong>Favourite terrain</strong> — Mountains and highland trails. The Simien Mountains of Ethiopia are on my bucket list — dramatic escarpments, endemic wildlife, and deep gorges.</li>
                <li><strong>The camera always comes</strong> — Hiking trips double as photography expeditions. Golden hour at altitude is something else entirely.</li>
                <li><strong>Bucket list trails</strong> — The Simien Mountains (Ethiopia), Laugavegur Trail (Iceland), the Tour du Mont Blanc (Alps), and eventually, Kilimanjaro.</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
