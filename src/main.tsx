import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Landscape: 1920x1080 stage scaled to fit, letterboxed.
// Portrait: 400px wide stage (at least 700 tall) scaled to fit, its height stretched to fill the screen.
const fit = () => {
    const portrait = matchMedia('(orientation: portrait)').matches
    const s = portrait ? Math.min(innerWidth / 400, innerHeight / 700) : Math.min(innerWidth / 1920, innerHeight / 1080)
    document.documentElement.style.setProperty('--fit', String(s))
    document.documentElement.style.setProperty('--stage-h', `${innerHeight / s}px`)
}
fit()
addEventListener('resize', fit)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
