import './AboutStory.css'
import type { CSSProperties } from 'react'
import PixelRects from '../PixelRects'
import { SMALL_ORCA } from '../../data/orcaArt'
import { ABOUT_COMMITS, ABOUT_TIMING } from '../../data/about'

function AboutStory({ seen, inView }: { seen: boolean, inView: boolean }) {
    const timing = {
        '--about-fade-duration': `${ABOUT_TIMING.fade}s`,
        '--about-line-duration': `${ABOUT_TIMING.lineDuration}s`,
        '--about-dive-duration': `${ABOUT_TIMING.diveDuration}s`,
    } as CSSProperties

    return (
        <section className={`about-section about-story${seen ? ' seen' : ''}${inView ? ' in-view' : ''}`} id="our-story" aria-label="Our story" style={timing}>
            <div className="about-story-mark about-animate" aria-hidden="true" style={{ animationDelay: `${ABOUT_TIMING.timeline}s` }}>2026</div>
            <div className="about-section-copy">
                <p className="about-section-command about-animate" style={{ animationDelay: `${ABOUT_TIMING.sectionCommand}s` }}><span>$ </span>git log --oneline</p>
                <h2 className="about-section-title about-animate" style={{ animationDelay: `${ABOUT_TIMING.sectionTitle}s` }}><span>OUR</span><span>STORY</span></h2>
                <p className="about-section-description about-animate" style={{ animationDelay: `${ABOUT_TIMING.sectionDescription}s` }}>Every org starts with an init commit. This is ours so far.</p>
            </div>
            <div className="about-story-history">
                <div className="about-story-track">
                    <div className="about-story-line" aria-hidden="true" style={{ animationDelay: `${ABOUT_TIMING.timeline}s` }} />
                    <div className="about-story-diver" aria-hidden="true" style={{ animationDelay: `${ABOUT_TIMING.timeline}s` }}><svg viewBox="0 0 20 10" shapeRendering="crispEdges"><PixelRects art={SMALL_ORCA} /></svg></div>
                    <ol>{ABOUT_COMMITS.map((commit, index) => <li key={index} className="about-animate" style={{ animationDelay: `${ABOUT_TIMING.commitStart + index * ABOUT_TIMING.commitStep}s` }}><span className="about-story-dot" aria-hidden="true" style={{ background: commit.dot }} /><span className="about-story-hash">{commit.hash}</span><span className="about-story-message">{commit.message}</span><span className="about-story-when">{commit.when}</span></li>)}</ol>
                </div>
            </div>
        </section>
    )
}

export default AboutStory
