import './AboutJoin.css'
import type { CSSProperties, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import PixelRects from '../PixelRects'
import { ABOUT_HEAD } from '../../data/orcaArt'
import { ABOUT_BACKGROUND_WORDS, ABOUT_CHECKS, ABOUT_TIMING } from '../../data/about'
import { usePageTransition } from '../../hooks/usePageTransition'

function AboutJoin({ seen }: { seen: boolean }) {
    const go = usePageTransition()
    const transition = (event: MouseEvent<HTMLAnchorElement>, to: string, wipe: string) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        go(to, wipe)
    }
    const timing = {
        '--about-fade-duration': `${ABOUT_TIMING.fade}s`,
        '--about-rise-duration': `${ABOUT_TIMING.riseDuration}s`,
        '--about-bob-duration': `${ABOUT_TIMING.bobDuration}s`,
    } as CSSProperties

    return (
        <section className={`about-section about-join${seen ? ' seen' : ''}`} id="join" aria-label="Join" style={timing}>
            <div className="about-mark-layer" aria-hidden="true"><div className="about-join-mark about-animate" style={{ animationDelay: `${ABOUT_TIMING.joinTitle}s` }}><span>{ABOUT_BACKGROUND_WORDS.join}</span><span>{ABOUT_BACKGROUND_WORDS.join}</span><span>{ABOUT_BACKGROUND_WORDS.join}</span></div></div>
            <div className="about-join-copy">
                <p className="about-section-command about-animate" style={{ animationDelay: `${ABOUT_TIMING.sectionCommand}s` }}><span>$ </span>./join.sh</p>
                <div className="about-join-heading">
                    <h2 className="about-section-title about-animate" style={{ animationDelay: `${ABOUT_TIMING.joinTitle}s` }}>WANT IN?</h2>
                </div>
                <p className="about-section-description about-animate" style={{ animationDelay: `${ABOUT_TIMING.sectionDescription}s` }}>Beginner or seasoned, if you like breaking and building things, there's a seat for you.</p>
                <div className="about-join-actions about-animate" style={{ animationDelay: `${ABOUT_TIMING.joinActions}s` }}>
                    <Link to="/contact" className="about-join-button about-join-primary" onClick={(event) => transition(event, '/contact', '~/join')}>Join xelulabs</Link>
                    <Link to="/crew" className="about-join-button about-join-secondary" onClick={(event) => transition(event, '/crew', '~/crew')}>Meet the crew</Link>
                </div>
            </div>
            <div className="about-window about-join-window about-animate" style={{ animationDelay: `${ABOUT_TIMING.joinWindow}s` }}>
                <div className="about-window-bar"><i /><i /><i /><span>~/xelulabs/join.sh</span></div>
                <div className="about-join-checks">{ABOUT_CHECKS.map((check, index) => <p key={index} className="about-animate" style={{ animationDelay: `${ABOUT_TIMING.checkStart + index * ABOUT_TIMING.checkStep}s`, animationDuration: `${ABOUT_TIMING.terminalLineDuration}s` }}><span style={{ color: check.color }}>{check.tag}</span> {check.text}</p>)}</div>
            </div>
            <div className="about-join-rise" aria-hidden="true" style={{ animationDelay: `${ABOUT_TIMING.joinWindow}s` }}><div className="about-join-bob"><svg viewBox="0 0 40 34" shapeRendering="crispEdges"><g opacity="0.6"><PixelRects art={ABOUT_HEAD} fill="#8a2d45" dx={-0.25} /></g><g opacity="0.6"><PixelRects art={ABOUT_HEAD} fill="#2d7f86" dx={0.25} /></g><PixelRects art={ABOUT_HEAD} /></svg></div></div>
        </section>
    )
}

export default AboutJoin
