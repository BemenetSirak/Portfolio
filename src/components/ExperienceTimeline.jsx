import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ExperienceTimeline.css'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceTimeline({ items, selectedSkill, itemMatchesSkill, endLabel }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.exp-tl-item', root)
      cards.forEach((card) => {
        const line = card.querySelector('.exp-tl-line')

        gsap.fromTo(
          card,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              transformOrigin: 'top center',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 60%',
                scrub: 0.4,
              },
            }
          )
        }
      })

      const endMarker = root.querySelector('.exp-tl-end')
      if (endMarker) {
        gsap.fromTo(
          endMarker,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: endMarker,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        const ring = endMarker.querySelector('.exp-tl-end-ring')
        if (ring) {
          gsap.to(ring, {
            scale: 1.8,
            opacity: 0,
            duration: 1.6,
            ease: 'power1.out',
            repeat: -1,
          })
        }
      }
    }, root)

    return () => ctx.revert()
  }, [items])

  return (
    <div className="exp-timeline" ref={rootRef}>
      {items.map((e, i) => {
        const haystack = `${e.role} ${e.company} ${e.bullets.join(' ')}`
        const dimmed = selectedSkill && itemMatchesSkill && !itemMatchesSkill(haystack, selectedSkill)
        const isLast = i === items.length - 1
        return (
          <div key={i} className={`exp-tl-item${dimmed ? ' exp-tl-item--dim' : ''}`}>
            <div className="exp-tl-marker">
              <div className="exp-tl-dot" />
              {(!isLast || endLabel) && <div className="exp-tl-line" />}
            </div>
            <div className="exp-tl-body">
              <h3 className="exp-tl-role">{e.role}</h3>
              <p className="exp-tl-company">
                {e.company}{e.location ? <span className="exp-tl-location"> · {e.location}</span> : null}
              </p>
              <span className="exp-tl-dates">{e.from} – {e.to}</span>
              <ul className="exp-tl-bullets">
                {e.bullets.map((b, j) => (
                  <li
                    key={j}
                    className={selectedSkill && itemMatchesSkill && itemMatchesSkill(b, selectedSkill) ? 'exp-bullet--match' : ''}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}

      {endLabel && (
        <div className="exp-tl-end">
          <div className="exp-tl-end-marker">
            <span className="exp-tl-end-ring" />
            <span className="exp-tl-end-dot" />
          </div>
          <span className="exp-tl-end-label">{endLabel}</span>
        </div>
      )}
    </div>
  )
}
