import './AboutHero.css'
import type { CSSProperties } from 'react'
import PixelRects from '../PixelRects'
import { ABOUT_HEAD, BODY_ORCA } from '../../data/orcaArt'
import { ABOUT_INTRO, ABOUT_NEOFETCH, ABOUT_SWATCHES, ABOUT_TIMING } from '../../data/about'

function AboutHero() {
    const first = 'WHO WE'
    const second = 'ARE'
    const introEnd = ABOUT_TIMING.introStart + ABOUT_INTRO.length * ABOUT_TIMING.introStep
    const timing = {
        '--about-fade-duration': `${ABOUT_TIMING.fade}s`,
        '--about-letter-duration': `${ABOUT_TIMING.letterDuration}s`,
        '--about-body-drift-duration': `${ABOUT_TIMING.bodyDriftDuration}s`,
        '--about-body-wig-duration': `${ABOUT_TIMING.bodyWigDuration}s`,
        '--about-hint-duration': `${ABOUT_TIMING.hintDuration}s`,
    } as CSSProperties

    return (
        <section className="about-section about-hero seen" id="who-we-are" aria-label="Who we are" style={timing}>
            <div className="about-hero-copy">
                <p className="about-eyebrow about-animate" style={{ animationDelay: `${ABOUT_TIMING.heroEyebrow}s` }}><span aria-hidden="true" />ABOUT</p>
                <h1 className="about-hero-title" aria-label="WHO WE ARE">
                    <span aria-hidden="true">{[...first].map((letter, index) => <span key={index} className="about-letter" style={{ animationDelay: `${ABOUT_TIMING.heroFirstLetter + index * ABOUT_TIMING.letterStep}s` }}>{letter === ' ' ? '\u00a0' : letter}</span>)}</span>
                    <span aria-hidden="true">{[...second].map((letter, index) => <span key={index} className="about-letter" style={{ animationDelay: `${ABOUT_TIMING.heroSecondLine + index * ABOUT_TIMING.letterStep}s` }}>{letter}</span>)}</span>
                </h1>
                <div className="about-intro">
                    <p className="about-animate about-intro-command" style={{ animationDelay: `${ABOUT_TIMING.heroCommand}s` }}><span>$ </span>cat about.md</p>
                    <p className="about-intro-text">{[...ABOUT_INTRO].map((letter, index) => <span key={index} className="about-char" style={{ animationDelay: `${ABOUT_TIMING.introStart + index * ABOUT_TIMING.introStep}s`, '--about-char-duration': `${ABOUT_TIMING.introStep}s` } as CSSProperties}>{letter}<span className="about-char-cursor" /></span>)}<span className="about-caret" style={{ animationDelay: `${introEnd}s` }} /></p>
                </div>
            </div>
            <div className="about-hero-visual">
                <div className="about-body-drift" aria-hidden="true">
                    <div className="about-animate about-body-reveal" style={{ animationDelay: `${ABOUT_TIMING.body}s` }}>
                        <div className="about-body-wig"><svg viewBox="0 0 48 22" shapeRendering="crispEdges"><g opacity="0.6"><PixelRects art={BODY_ORCA} fill="#8a2d45" dx={-0.3} /></g><g opacity="0.6"><PixelRects art={BODY_ORCA} fill="#2d7f86" dx={0.3} /></g><PixelRects art={BODY_ORCA} /></svg></div>
                    </div>
                </div>
                <div className="about-window about-animate" style={{ animationDelay: `${ABOUT_TIMING.terminal}s` }}>
                    <div className="about-window-bar"><i /><i /><i /><span>xelu@xelulabs: ~</span></div>
                    <div className="about-neofetch">
                        <p><span>$ </span>neofetch</p>
                        <div className="about-neofetch-content">
                            <svg className="about-neofetch-head about-animate" viewBox="0 0 40 34" shapeRendering="crispEdges" aria-hidden="true" style={{ animationDelay: `${ABOUT_TIMING.head}s` }}><PixelRects art={ABOUT_HEAD} /></svg>
                            <div className="about-neofetch-lines">{ABOUT_NEOFETCH.map((line, index) => <p key={index} className="about-animate" style={{ animationDelay: `${ABOUT_TIMING.neoStart + index * ABOUT_TIMING.neoStep}s`, animationDuration: `${ABOUT_TIMING.terminalLineDuration}s` }}><span style={{ color: line.color }}>{line.key}</span>{line.value}</p>)}<div className="about-swatches about-animate" aria-hidden="true" style={{ animationDelay: `${ABOUT_TIMING.swatches}s` }}>{ABOUT_SWATCHES.map((color) => <span key={color} style={{ background: color }} />)}</div></div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="about-scroll-hint about-animate" style={{ animationDelay: `${introEnd}s` }}><i aria-hidden="true" />SCROLL</p>
        </section>
    )
}

export default AboutHero
