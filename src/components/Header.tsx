import './Header.css'
import { memo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GHOSTS, LOGO_PATHS, LOGO_VIEWBOX } from '../data/logoPaths'

const links = [
    { to: '/', label: 'HOME' },
    { to: '/crew', label: 'CREW' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
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
                    <NavLink key={l.to} to={l.to} end>
                        {l.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}

export default memo(Header)
