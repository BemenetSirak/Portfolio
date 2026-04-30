import React, { useState } from 'react'
import './Gallery.css'

export default function Gallery({ images = [] }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="gallery panel">
      <h3>Gallery</h3>
      <div className="thumbs">
        {images.map((src, i) => (
          <button key={i} className="thumb" onClick={() => setOpen(i)}>
            <img src={src} alt={`gallery ${i}`} />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <img src={images[open]} alt="open" />
        </div>
      )}
    </div>
  )
}
