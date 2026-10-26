import './About.css'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Header from '../components/Header'
import AboutHero from '../components/about/AboutHero'
import AboutWork from '../components/about/AboutWork'
import AboutStory from '../components/about/AboutStory'
import AboutJoin from '../components/about/AboutJoin'
import { ABOUT_SECTIONS, ABOUT_TIMING } from '../data/about'
import { useSectionScroll } from '../hooks/useSectionScroll'

function About() {
    const { pageRef, scrollerRef, progressRef, active, onScroll, goTo } = useSectionScroll('.about-section', ABOUT_TIMING.scrollLockDuration)
    const [seen, setSeen] = useState<string[]>(['who-we-are'])
    const [storyInView, setStoryInView] = useState(false)

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
        scroller.querySelectorAll('.about-section:not(#who-we-are, #our-story)').forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [scrollerRef])

    useEffect(() => {
        const scroller = scrollerRef.current
        const story = scroller?.querySelector('#our-story')
        if (!scroller || !story) return
        const observer = new IntersectionObserver(([entry]) => setStoryInView(entry.isIntersecting), { root: scroller, threshold: 0.25 })
        observer.observe(story)
        return () => observer.disconnect()
    }, [scrollerRef])

    return (
        <div ref={pageRef} className="about-page" style={{ '--about-dot-transition': `${ABOUT_TIMING.dotTransitionDuration}s` } as CSSProperties}>
            <div className="about-header"><Header /></div>
            <div ref={progressRef} className="about-progress" aria-hidden="true" />
            <nav className="about-dots" aria-label="Sections">{ABOUT_SECTIONS.map((section, index) => <button key={section.id} type="button" className="about-dot" aria-current={active === index ? 'true' : undefined} onClick={() => goTo(section.id)}><span>{section.label}</span><i aria-hidden="true" /></button>)}</nav>
            <main ref={scrollerRef} className="about-scroller" onScroll={onScroll}>
                <div className="about-surface">
                    <div className="about-container">
                        <AboutHero />
                        <AboutWork seen={seen.includes('what-we-do')} />
                        <AboutStory inView={storyInView} />
                        <AboutJoin seen={seen.includes('join')} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default About
