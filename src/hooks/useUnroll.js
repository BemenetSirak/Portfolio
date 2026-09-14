import { useEffect, useState } from 'react'

// Toggles true on the frame after mount, so a component can transition
// from a collapsed "rolled up" state to its resting state — used for the
// manuscript-unrolling entrance on the main page and its popups.
export default function useUnroll() {
  const [unrolled, setUnrolled] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setUnrolled(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return unrolled
}
