import './Header.css'
import { NavLink } from 'react-router-dom'

const links = [
    { to: '/', label: 'HOME' },
    { to: '/about', label: 'ABOUT' },
    { to: '/crew', label: 'CREW' },
    { to: '/contact', label: 'CONTACT' },
]

function Header() {
    return (
        <header className="header">
            <nav className="nav" aria-label="Main">
                {links.map((l) => (
                    <NavLink key={l.to} to={l.to} end>
                        {l.label}
                    </NavLink>
                ))}
            </nav>
            <div className="est">EST. 2026</div>
        </header>
    )
}

export default Header
