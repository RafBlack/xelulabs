import './AboutWork.css'
import type { CSSProperties } from 'react'
import PixelRects from '../PixelRects'
import { ABOUT_ICONS, SMALL_ORCA } from '../../data/orcaArt'
import { ABOUT_MARQUEE, ABOUT_PILLARS, ABOUT_TIMING } from '../../data/about'

function AboutWork({ seen }: { seen: boolean }) {
    const timing = {
        '--about-fade-duration': `${ABOUT_TIMING.fade}s`,
        '--about-fish-duration': `${ABOUT_TIMING.cardFishDuration}s`,
        '--about-marquee-duration': `${ABOUT_TIMING.marqueeDuration}s`,
    } as CSSProperties

    return (
        <section className={`about-section about-work${seen ? ' seen' : ''}`} id="what-we-do" aria-label="What we do" style={timing}>
            <div className="about-marquee" aria-hidden="true"><div>{ABOUT_MARQUEE}{ABOUT_MARQUEE}</div></div>
            <div className="about-section-copy">
                <p className="about-section-command about-animate" style={{ animationDelay: `${ABOUT_TIMING.sectionCommand}s` }}><span>$ </span>ls ~/xelulabs</p>
                <h2 className="about-section-title about-animate" style={{ animationDelay: `${ABOUT_TIMING.sectionTitle}s` }}><span>WHAT</span><span>WE DO</span></h2>
                <p className="about-section-description about-animate" style={{ animationDelay: `${ABOUT_TIMING.sectionDescription}s` }}>Three folders, one goal: get better by doing the work.</p>
            </div>
            <div className="about-work-rows">{ABOUT_PILLARS.map((pillar, index) => (
                <article className="about-work-row about-animate" key={pillar.dir} style={{ animationDelay: `${ABOUT_TIMING.pillarStart + index * ABOUT_TIMING.pillarStep}s` }}>
                    <svg className="about-row-fish" viewBox="0 0 20 10" shapeRendering="crispEdges" aria-hidden="true"><PixelRects art={SMALL_ORCA} /></svg>
                    <svg className="about-work-icon" viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true"><PixelRects art={ABOUT_ICONS[index]} /></svg>
                    <div><h3>{pillar.dir}</h3><p>{pillar.text}</p></div>
                    <p className="about-work-files">{pillar.files}</p>
                </article>
            ))}</div>
        </section>
    )
}

export default AboutWork
