import React, { useState, useRef } from 'react'
import './MusicPlayer.css'

export default function MusicPlayer({ samples = [] }) {
  const [playing, setPlaying] = useState(null)
  const audioRef = useRef()

  function play(index) {
    setPlaying(index)
    if (audioRef.current) {
      audioRef.current.src = samples[index].src
      audioRef.current.play()
    }
  }

  return (
    <div className="music-player panel">
      <h3>Music Player</h3>
      <p className="muted">Short samples — placeholder audio</p>
      <ul className="samples-list">
        {samples.map((s, i) => (
          <li key={i}>
            <button className={playing === i ? 'playing' : ''} onClick={() => play(i)}>{s.title}</button>
          </li>
        ))}
      </ul>
      <audio ref={audioRef} hidden />
    </div>
  )
}
