# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
## Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Portfolio Entry: Recruiter vs Visitor

Below are two demo images showing an entry selection for your portfolio: a professional "Recruiter" view and a playful "Visitor" view. They live in `public/images` as `recruiter.svg` and `visitor.svg`.

- Recruiter view: focuses on a professional photo, concise summary, work experience, projects, and contact info.
- Visitor view: playful avatar, hobbies, interactive widgets (music samples, mini-games), gallery, and social links.

Recruiter demo image:

![Recruiter demo](public/images/recruiter.svg)

Visitor demo image:

![Visitor demo](public/images/visitor.svg)

Implementation checklist (high level)

1. Entry selection UI
	- Add a lightweight landing section with two large buttons: "Recruiter" and "Visitor".
	- Persist the choice in session storage so returning visitors see the same view during the session.

2. Routing / Layouts
	- Create two layout components: `RecruiterLayout.jsx` and `VisitorLayout.jsx`.
	- Use React Router (or a tiny internal router) to navigate between the layouts.

3. RecruiterLayout details
	- Professional header with photo, name, and title.
	- Sections: Summary, Experience (list items with dates and responsibilities), Projects (cards with links), Contact (email, LinkedIn, downloadable resume PDF).
	- Add a PDF resume link and an accessible email 'mailto:' button.
	- Optional: JSON-LD schema for Person/ProfessionalProfile to help SEO.

4. VisitorLayout details
	- Playful hero with animated avatar or SVG.
	- Interactive components: a small timeline that expands, a music player widget with short samples, a projects gallery with lightbox, and a contact/social strip.
	- Small easter eggs: keyboard shortcuts, theme toggles, or mini-games.

5. Shared components & data
	- Build reusable components: `Header`, `Card`, `ProjectList`, `ContactBar`, `Avatar`.
	- Data shape example (JS object):

```js
// profileData.js
export default {
  name: 'Your Name',
  title: 'Frontend Engineer',
  summary: 'Concise summary text',
  contact: { email: 'you@domain.com', linkedin: 'https://linkedin.com/in/you' },
  experience: [ { company: 'Acme', role: 'Senior Dev', from: 2021, to: 'Present', bullets: ['...'] } ],
  projects: [ { title: 'Portfolio', description: '...', url: '/projects/portfolio', tech: ['React','Vite'] } ]
}
```

6. Accessibility & Performance
	- Keyboard focus states, semantic HTML, and ARIA where needed.
	- Optimize images (use webp/AVIF), lazy-load offscreen media, code-split large interactive widgets.

7. Analytics & Privacy
	- Track which entry users choose (Recruiter vs Visitor) with a privacy-friendly event (no PII). Respect Do Not Track.

8. Testing and Deployment
	- Add unit tests for critical components and an E2E test for entry flow.
	- Deploy on Vercel / Netlify; ensure proper caching of static assets.

Step-by-step implementation (detailed)

1) Scaffold components and routes
	- Create `src/layouts/RecruiterLayout.jsx`, `src/layouts/VisitorLayout.jsx` and `src/pages/Entry.jsx`.
	- Install `react-router-dom` and add routes: `/` (Entry), `/recruiter`, `/visitor`.

2) Entry component
	- `Entry.jsx` shows two buttons, each with a short description and the demo SVG as a thumbnail.
	- On click: save choice to `sessionStorage.setItem('entry','recruiter')` or `sessionStorage.setItem('entry','visitor')` and navigate.

3) RecruiterLayout implementation
	- Use a two-column grid. Left: photo card with `img` (use `loading="lazy"`), right: sections with accessible headings.
	- Projects: cards with short descriptions and an optional live demo link.
	- Add a "Download resume" button (serve `/assets/resume.pdf` from `public/`).

4) VisitorLayout implementation
	- Use CSS animations or Framer Motion for micro-interactions.
	- Add a small audio player (HTMLAudioElement) with controls and brief samples (host under `public/media`).
	- Provide toggles for playful themes (neon, pastel).

5) Data-driven rendering
	- Keep all profile data in `src/data/profileData.js` and import it in both layouts.

6) Add analytics & A/B telemetry
	- Log which view users choose in a single non-identifying event.

7) Polish & tests
	- Run accessibility tests with axe-core in CI, add unit tests for entry logic.

Suggested milestones (2-week plan for solo dev)

- Day 1–2: Entry UI, routes, basic layouts, and data skeleton.
- Day 3–5: Recruiter layout content, resume link, and accessibility fixes.
- Day 6–8: Visitor interactive widgets, gallery, audio player.
- Day 9–11: Tests, analytics, SEO microdata, and performance tuning.
- Day 12–14: Deploy and polish animations/easter eggs.

Quick component contract samples

- ProjectCard props: { title, description, tech: string[], url, image }
- ExperienceItem props: { company, role, from, to, bullets: string[] }

Edge cases to consider

- Users with JavaScript disabled: ensure critical contact info is reachable (mailto links, static resume).
- Large resumes or media: provide streamed downloads and placeholders while loading.
- Accessibility: color contrast and keyboard-only navigation.

Next steps I can take for you

- Implement the Entry component and wire routing (small PR)
- Create `RecruiterLayout.jsx` and `VisitorLayout.jsx` with placeholder components and sample data
- Add unit tests for the entry flow

If you want, I can implement the entry UI and wire the two layouts now — tell me which step to start with.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
