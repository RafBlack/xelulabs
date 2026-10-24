import './NotFound.css'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { usePageTransition } from '../hooks/usePageTransition'

function NotFound() {
    const go = usePageTransition()

    const returnHome = (event: MouseEvent<HTMLAnchorElement>) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        go('/', '~/')
    }

    return (
        <div className="stage not-found">
            <Header />
            <main className="not-found-content container" aria-labelledby="not-found-title">
                <p className="not-found-code" aria-hidden="true">404</p>
                <div className="not-found-copy">
                    <p className="not-found-status">
                        <span aria-hidden="true" />
                        Signal lost
                    </p>
                    <h1 id="not-found-title">LOST AT SEA</h1>
                    <p>The page you requested drifted beyond the network. Let&apos;s get you back to familiar waters.</p>
                    <Link className="not-found-link" to="/" onClick={returnHome}>
                        <span aria-hidden="true">&larr;</span>
                        Return home
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default NotFound
