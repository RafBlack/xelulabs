import './CrewGrid.css'
import type { CSSProperties, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import PixelRects from '../PixelRects'
import { SMALL_ORCA } from '../../data/orcaArt'
import { CREW_MEMBERS, CREW_TIMING } from '../../data/crew'
import { usePageTransition } from '../../hooks/usePageTransition'

function CrewGrid({ seen }: { seen: boolean }) {
    const go = usePageTransition()
    const transition = (event: MouseEvent<HTMLAnchorElement>, to: string, wipe: string) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        go(to, wipe)
    }
    const timing = {
        '--crew-fade-duration': `${CREW_TIMING.fade}s`,
        '--crew-fish-duration': `${CREW_TIMING.cardFishDuration}s`,
    } as CSSProperties

    return (
        <section className={`crew-section crew-grid${seen ? ' seen' : ''}`} id="crew-grid" aria-label="Members" style={timing}>
            <div className="crew-mark-layer" aria-hidden="true"><div className="crew-grid-mark crew-animate" style={{ animationDelay: `${CREW_TIMING.gridTitle}s` }}>MEMBERS</div></div>
            <div className="crew-grid-copy">
                <p className="crew-section-command crew-animate" style={{ animationDelay: '0.05s' }}><span>$ </span>ls ~/crew/members</p>
                <h2 className="crew-section-title crew-animate" style={{ animationDelay: '0.15s' }}><span>MEET</span><span>THE TEAM</span></h2>
                <p className="crew-section-description crew-animate" style={{ animationDelay: '0.25s' }}>Every handle has a story. Here's who's building xelulabs.</p>
                <div className="crew-grid-cta crew-animate" style={{ animationDelay: `${CREW_TIMING.ctaDelay}s` }}>
                    <p className="crew-cta-text">Think you belong here?</p>
                    <Link to="/contact" className="crew-cta-button" onClick={(event) => transition(event, '/contact', '~/join')}>Apply to join</Link>
                </div>
            </div>
            <div className="crew-grid-cards">
                {CREW_MEMBERS.map((member, index) => (
                    <article
                        className={`crew-card crew-animate${member.status === 'afk' ? ' crew-card-vacant' : ''}`}
                        key={member.handle}
                        style={{ animationDelay: `${CREW_TIMING.cardStart + index * CREW_TIMING.cardStep}s` }}
                    >
                        <svg className="crew-card-fish" viewBox="0 0 20 10" shapeRendering="crispEdges" aria-hidden="true"><PixelRects art={SMALL_ORCA} /></svg>
                        <div className="crew-card-header">
                            <div className="crew-card-avatar" aria-hidden="true">
                                <span className="crew-card-glyph">{member.handle === '???' ? '?' : member.handle[0].toUpperCase()}</span>
                                <span className={`crew-card-status crew-status-${member.status}`} />
                            </div>
                            <div>
                                <h3 className="crew-card-handle">{member.handle}</h3>
                                <p className="crew-card-role">{member.role}</p>
                            </div>
                        </div>
                        <p className="crew-card-bio">{member.bio}</p>
                        <div className="crew-card-footer">
                            <div className="crew-card-tags">{member.tags.map((tag) => <span key={tag} className="crew-tag">{tag}</span>)}</div>
                            <span className="crew-card-hash">{member.joinHash}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default CrewGrid
