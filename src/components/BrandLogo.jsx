import React from 'react'
import './BrandLogo.css'

export default function BrandLogo({ onBack }) {
  return (
    <button className="brand-logo" onClick={onBack} aria-label="Home">
      <span className="b-cursive">B</span>
    </button>
  )
}
