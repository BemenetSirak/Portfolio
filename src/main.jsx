import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css'
import App from './App.jsx'
import DemoRoadmap from './pages/DemoRoadmap'

const rootEl = document.getElementById('root')
const path = window.location.pathname

createRoot(rootEl).render(
  <StrictMode>
    {path === '/demo-roadmap' ? <DemoRoadmap /> : <App />}
  </StrictMode>,
)
