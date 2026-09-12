import React from 'react'
import './ScrollRod.css'

// A wooden dowel spanning the full width of the page, capping the
// unrolled parchment at the very top or bottom of the visitor page.
export default function ScrollRod({ position = 'top' }) {
  return (
    <div className={`page-scroll-rod page-scroll-rod--${position}`} aria-hidden="true">
      <div className="page-scroll-rod-bar" />
    </div>
  )
}
