import React from 'react'
import './BrandLogo.css'
import waxSeal from '../assets/scroll/wax-seal.png'

export default function BrandLogo({ onBack }) {
  return (
    <button className="brand-logo" onClick={onBack} aria-label="Home">
      <img src={waxSeal} alt="" className="brand-logo-seal" />
    </button>
  )
}
