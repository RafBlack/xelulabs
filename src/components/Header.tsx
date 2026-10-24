import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import { GHOSTS, LOGO_PATHS, LOGO_VIEWBOX } from '../data/logoPaths'

const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/crew', label: 'Crew' },
    { to: '/contact', label: 'Contact' },
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
    return (
        <header className="header container">
            <Link to="/" className="brand" aria-label="XeluLabs home">
                <Mark />
                <span>XELU</span>
            </Link>
            <nav className="nav" aria-label="Main">
                {links.map((l) => (
                    <NavLink key={l.to} to={l.to} end>
                        {l.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}

export default Header
