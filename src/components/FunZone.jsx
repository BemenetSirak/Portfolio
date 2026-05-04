import React from 'react'
import './FunZone.css'

const FACTS = [
  { icon: '⚽', text: "Lifelong Arsenal fan — the Invincibles sealed it. I also play 5-a-side every week and love every minute of it." },
  { icon: '📜', text: "History obsessive. The Aksumite Empire, Medieval Europe, the Ottomans, WWII — I consume documentaries and podcasts constantly." },
  { icon: '✝️', text: "Ethiopian Orthodox Christian. One of the oldest churches in the world — Ge'ez liturgy, ancient fasting traditions, and roots in Axum." },
  { icon: '🎬', text: "Historical dramas are my weakness — Peaky Blinders, Narcos, The Last Kingdom. Shawshank Redemption is untouchable cinema." },
  { icon: '🕍', text: "Fascinated by early church history — the Council of Nicaea, the Desert Fathers, and Christianity's ancient African roots." },
  { icon: '🏔️', text: "I hike to reset. The Simien Mountains of Ethiopia and the Tour du Mont Blanc are at the top of my bucket list." },
]

export default function FunZone() {
  return (
    <div className="fun-facts panel">
      <h3>Things About Me</h3>
      <ul className="facts-list">
        {FACTS.map((f, i) => (
          <li key={i}>
            <span className="fact-icon" aria-hidden="true">{f.icon}</span>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
