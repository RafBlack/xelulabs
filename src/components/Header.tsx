import './Header.css'
import { memo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GHOSTS, LOGO_PATHS, LOGO_VIEWBOX } from '../data/logoPaths'
import { SMALL_ORCA } from '../data/orcaArt'
import PixelRects from './PixelRects'
import { usePageTransition } from '../hooks/usePageTransition'

const links = [
    { to: '/', label: 'HOME', path: '~/' },
    { to: '/crew', label: 'CREW', path: '~/crew' },
    { to: '/about', label: 'ABOUT', path: '~/about' },
    { to: '/contact', label: 'CONTACT', path: '~/contact' },
]

function Mark() {
    const strokes = LOGO_PATHS.map((p) => <path key={p.id} d={p.d} />)
    return (
        <svg className="mark" viewBox={LOGO_VIEWBOX} aria-hidden="true">
            {GHOSTS.map((color, i) => (
                <g key={color} className={`mark-ghost mark-ghost-${i}`} stroke={color}>
                    {strokes}
                </g>
            ))}
            <g stroke="#f2f2ef">{strokes}</g>
        </svg>
    )
}

function Header() {
    const [open, setOpen] = useState(false)
    const go = usePageTransition()
    return (
        <header className={`header container${open ? ' header-open' : ''}`}>
            <Link to="/" className="brand" aria-label="xelulabs home">
                <Mark />
                <span>XELU</span>
            </Link>
            <button
                type="button"
                className="menu-btn"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="main-nav"
                onClick={() => setOpen(!open)}
            >
                <span />
                <span />
                <span />
            </button>
            <nav id="main-nav" className="nav" aria-label="Main">
                {links.map((l) => (
                    <NavLink key={l.to} to={l.to} end onClick={(event) => {
                        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                        event.preventDefault()
                        setOpen(false)
                        go(l.to, l.path)
                    }}>
                        {l.label}
                        <span className="nav-track" aria-hidden="true">
                            <span className="nav-swim">
                                <svg className="nav-fish" viewBox="0 0 20 10" shapeRendering="crispEdges">
                                    <PixelRects art={SMALL_ORCA} />
                                </svg>
                            </span>
                        </span>
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}

export default memo(Header)
