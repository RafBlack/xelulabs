import './CrewHero.css'
import type { CSSProperties } from 'react'
import PixelRects from '../PixelRects'
import { ABOUT_HEAD, BODY_ORCA } from '../../data/orcaArt'
import { CREW_STATS, CREW_TIMING } from '../../data/crew'

function CrewHero() {
    const first = 'THE'
    const second = 'CREW'
    const timing = {
        '--crew-fade-duration': `${CREW_TIMING.fade}s`,
        '--crew-letter-duration': `${CREW_TIMING.letterDuration}s`,
        '--crew-hint-duration': `${CREW_TIMING.hintDuration}s`,
        '--crew-body-drift-duration': `${CREW_TIMING.bodyDriftDuration}s`,
        '--crew-body-wig-duration': `${CREW_TIMING.bodyWigDuration}s`,
    } as CSSProperties

    return (
        <section className="crew-section crew-hero seen" id="crew-hero" aria-label="The crew" style={timing}>
            <div className="crew-mark-layer" aria-hidden="true"><div className="crew-hero-mark crew-animate" style={{ animationDelay: `${CREW_TIMING.eyebrow}s` }}>THE CREW</div></div>
            <div className="crew-hero-copy">
                <p className="crew-eyebrow crew-animate" style={{ animationDelay: `${CREW_TIMING.eyebrow}s` }}><span aria-hidden="true" />CREW</p>
                <h1 className="crew-hero-title" aria-label="THE CREW">
                    <span aria-hidden="true">{[...first].map((letter, index) => <span key={index} className="crew-letter" style={{ animationDelay: `${CREW_TIMING.titleFirstLine + index * CREW_TIMING.letterStep}s` }}>{letter === ' ' ? '\u00a0' : letter}</span>)}</span>
                    <span aria-hidden="true">{[...second].map((letter, index) => <span key={index} className="crew-letter" style={{ animationDelay: `${CREW_TIMING.titleSecondLine + index * CREW_TIMING.letterStep}s` }}>{letter}</span>)}</span>
                </h1>
                <p className="crew-hero-description crew-animate" style={{ animationDelay: `${CREW_TIMING.description}s` }}>The people behind xelulabs. Small team, big ambitions, one shared obsession with cybersecurity.</p>
            </div>
            <div className="crew-hero-visual">
                <div className="crew-hero-bob" aria-hidden="true">
                    <div className="crew-hero-bob-inner">
                        <svg viewBox="0 0 48 22" shapeRendering="crispEdges">
                            <g opacity="0.6"><PixelRects art={BODY_ORCA} fill="#8a2d45" dx={-0.3} /></g>
                            <g opacity="0.6"><PixelRects art={BODY_ORCA} fill="#2d7f86" dx={0.3} /></g>
                            <PixelRects art={BODY_ORCA} />
                        </svg>
                    </div>
                </div>
                <div className="crew-window crew-animate" style={{ animationDelay: `${CREW_TIMING.statsWindow}s` }}>
                    <div className="crew-window-bar"><i /><i /><i /><span>xelu@xelulabs: ~/crew</span></div>
                    <div className="crew-terminal">
                        <p><span style={{ color: '#7fd3d8' }}>$ </span>cat crew_status.md</p>
                        <div className="crew-terminal-content">
                            <svg className="crew-terminal-head crew-animate" viewBox="0 0 40 34" shapeRendering="crispEdges" aria-hidden="true" style={{ animationDelay: `${CREW_TIMING.statStart}s` }}><PixelRects art={ABOUT_HEAD} /></svg>
                            <div className="crew-stats">{CREW_STATS.map((stat, index) => <p key={index} className="crew-animate" style={{ animationDelay: `${CREW_TIMING.statStart + index * CREW_TIMING.statStep}s`, animationDuration: '0.25s' }}><span style={{ color: stat.color }}>{stat.key}</span> {stat.value}</p>)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="crew-scroll-hint crew-animate" style={{ animationDelay: `${CREW_TIMING.scrollHintDelay}s` }}><i aria-hidden="true" />SCROLL</p>
        </section>
    )
}

export default CrewHero
