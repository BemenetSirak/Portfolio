import { useState, useEffect } from 'react'

// Module-level cache survives re-renders but not page reloads
const CACHE = {}

async function fetchOne(title, year, apiKey) {
  const key = `${title}::${year}`
  if (key in CACHE) return CACHE[key]

  try {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${apiKey}&plot=short`
    const res = await fetch(url)
    const data = await res.json()
    CACHE[key] = data.Response === 'True'
      ? {
          imdb:   data.imdbRating !== 'N/A' ? parseFloat(data.imdbRating) : null,
          poster: data.Poster     !== 'N/A' ? data.Poster                 : null,
          genre:  data.Genre      ? data.Genre.split(',')[0].trim()        : null,
          short:  data.Plot       !== 'N/A' ? data.Plot                   : null,
        }
      : null
  } catch {
    CACHE[key] = null
  }
  return CACHE[key]
}

// Returns a map of item.id → { imdb, poster, genre, short }
// Falls back gracefully when VITE_OMDB_KEY is not set.
export function useOMDb(list) {
  const [data, setData] = useState({})
  const apiKey = import.meta.env.VITE_OMDB_KEY

  useEffect(() => {
    if (!apiKey || !list?.length) return
    let alive = true

    list.forEach(async (item) => {
      const result = await fetchOne(item.title, item.year, apiKey)
      if (alive && result) {
        setData(prev => ({ ...prev, [item.id]: result }))
      }
    })

    return () => { alive = false }
  }, [list, apiKey])

  return data
}
