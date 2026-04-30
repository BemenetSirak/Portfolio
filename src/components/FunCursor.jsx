import React, { useEffect, useRef } from 'react'
import './FunCursor.css'

export default function FunCursor() {
  const ref = useRef()
  const pos = useRef({ x: -100, y: -100 })
  const dest = useRef({ x: -100, y: -100 })

  useEffect(() => {
    function onMove(e) {
      dest.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    let raf = null
    function loop() {
      pos.current.x += (dest.current.x - pos.current.x) * 0.18
      pos.current.y += (dest.current.y - pos.current.y) * 0.18
      if (ref.current) {
        // set left/top so we don't override the CSS centering transform
        ref.current.style.left = `${pos.current.x}px`
        ref.current.style.top = `${pos.current.y}px`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="fun-cursor" aria-hidden="true">
      <div className="fun-dot" />
    </div>
  )
}
