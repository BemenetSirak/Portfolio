import React, { useState, useEffect } from 'react'
import './Gallery.css'

const IMAGES = [
  { src: '/images/gallery/hiking-sedona-canyon.jpg',    caption: 'Sedona, AZ',             tag: 'Hiking' },
  { src: '/images/gallery/hiking-sedona-climb.jpg',     caption: 'Slickrock Trail, Sedona', tag: 'Hiking' },
  { src: '/images/gallery/football-jersey.jpg',         caption: 'B. Sirak — #5',           tag: 'Football' },
  { src: '/images/gallery/football-team.jpg',           caption: 'Game Night',              tag: 'Football' },
  { src: '/images/gallery/arsenal-badge.jpg',           caption: 'Arsenal FC',              tag: 'Football' },
  { src: '/images/gallery/eth-orthodox-murals.jpg',     caption: 'Ethiopian Church Murals', tag: 'Faith' },
  { src: '/images/gallery/eth-orthodox-medallion.jpg',  caption: 'Aksumite Medallion Art',  tag: 'Faith' },
]

export default function Gallery() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (open === null) return
    function onKey(e) {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen(i => (i + 1) % IMAGES.length)
      if (e.key === 'ArrowLeft')  setOpen(i => (i - 1 + IMAGES.length) % IMAGES.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="gallery panel">
      <h3>Gallery</h3>
      <div className="gl-grid">
        {IMAGES.map((img, i) => (
          <button key={i} className="gl-thumb" onClick={() => setOpen(i)}>
            <img src={img.src} alt={img.caption} loading="lazy" />
            <div className="gl-overlay">
              <span className="gl-tag">{img.tag}</span>
              <span className="gl-caption">{img.caption}</span>
            </div>
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="gl-lightbox" onClick={() => setOpen(null)}>
          <div className="gl-lb-inner" onClick={e => e.stopPropagation()}>
            <img src={IMAGES[open].src} alt={IMAGES[open].caption} />
            <div className="gl-lb-bar">
              <button className="gl-lb-nav" onClick={() => setOpen(i => (i - 1 + IMAGES.length) % IMAGES.length)}>‹</button>
              <span className="gl-lb-caption">{IMAGES[open].caption}</span>
              <button className="gl-lb-nav" onClick={() => setOpen(i => (i + 1) % IMAGES.length)}>›</button>
            </div>
            <button className="gl-lb-close" onClick={() => setOpen(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  )
}
