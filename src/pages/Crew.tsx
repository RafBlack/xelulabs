import './Crew.css'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Header from '../components/Header'
import CrewHero from '../components/crew/CrewHero'
import CrewGrid from '../components/crew/CrewGrid'
import { CREW_TIMING } from '../data/crew'
import { useSectionScroll } from '../hooks/useSectionScroll'

const CREW_SECTIONS = [
    { id: 'crew-hero', label: 'THE CREW' },
    { id: 'crew-grid', label: 'MEMBERS' },
]

function Crew() {
    const { pageRef, scrollerRef, progressRef, active, onScroll, goTo } = useSectionScroll('.crew-section', 700)
    const [seen, setSeen] = useState<string[]>(['crew-hero'])

    useEffect(() => {
        const scroller = scrollerRef.current
        if (!scroller) return
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setSeen((previous) => previous.includes(entry.target.id) ? previous : [...previous, entry.target.id])
                    observer.unobserve(entry.target)
                }
            }
        }, { root: scroller, threshold: 0.25 })
        scroller.querySelectorAll('.crew-section:not(#crew-hero)').forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [scrollerRef])

    return (
        <div ref={pageRef} className="crew-page" style={{ '--crew-dot-transition': `${CREW_TIMING.fade}s` } as CSSProperties}>
            <div className="crew-header"><Header /></div>
            <div ref={progressRef} className="crew-progress" aria-hidden="true" />
            <nav className="crew-dots" aria-label="Sections">{CREW_SECTIONS.map((section, index) => <button key={section.id} type="button" className="crew-dot" aria-current={active === index ? 'true' : undefined} onClick={() => goTo(section.id)}><span>{section.label}</span><i aria-hidden="true" /></button>)}</nav>
            <main ref={scrollerRef} className="crew-scroller" onScroll={onScroll}>
                <div className="crew-surface">
                    <div className="crew-container">
                        <CrewHero />
                        <CrewGrid seen={seen.includes('crew-grid')} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Crew
