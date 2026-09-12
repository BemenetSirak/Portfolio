// Hand-inked illustration icons for the "Things I Love" row, drawn to
// read like sketches on the parchment rather than flat UI glyphs.
const STROKE = { stroke: '#4a2e10', strokeWidth: 2.6, strokeLinejoin: 'round', strokeLinecap: 'round' }
const THIN   = { stroke: '#7a5a2a', strokeWidth: 1.8, strokeLinecap: 'round', fill: 'none' }

export const INK_ICONS = {
  history: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M4 30 16 18h10l7 7 7-7h10l10 12-11 14-5-5-6 6-6-6-6 6-6-6z" fill="#efe0bb" {...STROKE} />
      <path d="M33 25l-7 7M40 18l-4 12M25 43l4-8M37 43l4-8" {...THIN} stroke="#4a2e10" />
      <path d="M4 30v10M60 30v10" {...STROKE} fill="none" />
    </svg>
  ),
  religion: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 6l22 8v16c0 14-10 24-22 28C20 54 10 44 10 30V14z" fill="#efe0bb" {...STROKE} />
      <path d="M32 6v52M10 30h44" {...STROKE} fill="none" strokeWidth="2" />
      <path d="M32 8l20 7.5V30H32zM32 30H10.5c0 13 9 22.5 21.5 26z" fill="#b8913f" />
      <path d="M32 6l22 8v16c0 14-10 24-22 28C20 54 10 44 10 30V14z" fill="none" {...STROKE} />
    </svg>
  ),
  movies: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M6 14c10-4 20-2 26 4 6-6 16-8 26-4v36c-10-4-20-2-26 4-6-6-16-8-26-4z" fill="#f1e5c3" {...STROKE} />
      <path d="M32 18v36" {...STROKE} fill="none" strokeWidth="2" />
      <path d="M12 22c6-2 12-1 16 2M12 30c6-2 12-1 16 2M12 38c6-2 12-1 16 2M36 24c4-3 10-4 16-2M36 32c4-3 10-4 16-2M36 40c4-3 10-4 16-2" {...THIN} />
    </svg>
  ),
  football: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="24" fill="#f1e5c3" {...STROKE} />
      <path d="M32 19l12 9-4.5 14h-15L20 28z" fill="#4a2e10" />
      <path d="M32 19V9M44 28l10-4M39.5 42l7 11M24.5 42l-7 11M20 28l-10-4" {...STROKE} fill="none" strokeWidth="2.2" />
    </svg>
  ),
  hiking: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="50" cy="15" r="5" fill="#e6b84a" {...STROKE} strokeWidth="1.8" />
      <path d="M4 52 22 20l10 16 8-10 20 26z" fill="#dcc48f" {...STROKE} />
      <path d="M22 20l3.5 7 3-3 3.5 12" fill="#f6efd8" {...STROKE} strokeWidth="1.8" />
      <path d="M8 52c8-6 12-4 18-8 8-4 10 2 18-2" {...THIN} strokeDasharray="3 3" />
    </svg>
  ),
  coffee: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M12 26h34v14c0 10-8 16-17 16S12 50 12 40z" fill="#f1e5c3" {...STROKE} />
      <path d="M46 30h4c6 0 8 4 8 8s-2 8-8 8h-5" fill="none" {...STROKE} />
      <ellipse cx="29" cy="26" rx="17" ry="4" fill="#5a3a1c" {...STROKE} strokeWidth="2" />
      <path d="M20 20c-2-4 2-6 0-10M29 20c-2-4 2-6 0-10M38 20c-2-4 2-6 0-10" {...THIN} strokeWidth="2" />
      <path d="M8 60h52" {...STROKE} fill="none" strokeWidth="2.4" />
    </svg>
  ),
}
