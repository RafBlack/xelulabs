import './About.css'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Header from '../components/Header'
import AboutHero from '../components/about/AboutHero'
import AboutWork from '../components/about/AboutWork'
import AboutStory from '../components/about/AboutStory'
import AboutJoin from '../components/about/AboutJoin'
import { ABOUT_SECTIONS, ABOUT_TIMING } from '../data/about'

function About() {
    const scrollerRef = useRef<HTMLElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const [seen, setSeen] = useState<string[]>(['who-we-are'])
    const [active, setActive] = useState(0)
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
        scroller.querySelectorAll('.about-section:not(#who-we-are)').forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const scroller = scrollerRef.current
        const story = scroller?.querySelector('#our-story')
        if (!scroller || !story) return
        const observer = new IntersectionObserver(([entry]) => setStoryInView(entry.isIntersecting), { root: scroller, threshold: 0.25 })
        observer.observe(story)
        return () => observer.disconnect()
    }, [])

    const updateScroll = () => {
        const scroller = scrollerRef.current
        if (!scroller) return
        const max = scroller.scrollHeight - scroller.clientHeight
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scroller.scrollTop / max : 0})`
        const middle = scroller.getBoundingClientRect().top + scroller.clientHeight / 2
        const sections = [...scroller.querySelectorAll<HTMLElement>('.about-section')]
        const nearest = sections.reduce((best, section, index) => Math.abs(section.getBoundingClientRect().top + section.clientHeight / 2 - middle) < Math.abs(sections[best].getBoundingClientRect().top + sections[best].clientHeight / 2 - middle) ? index : best, 0)
        setActive((previous) => previous === nearest ? previous : nearest)
    }

    const goToSection = (id: string) => {
        const scroller = scrollerRef.current
        const section = document.getElementById(id)
        if (!scroller || !section) return
        scroller.scrollTo({ top: scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }

    return (
        <div className="about-page" style={{ '--about-dot-transition': `${ABOUT_TIMING.dotTransitionDuration}s` } as CSSProperties}>
            <div className="about-header"><Header /></div>
            <div ref={progressRef} className="about-progress" aria-hidden="true" />
            <nav className="about-dots" aria-label="Sections">{ABOUT_SECTIONS.map((section, index) => <button key={section.id} type="button" className="about-dot" aria-current={active === index ? 'true' : undefined} onClick={() => goToSection(section.id)}><span>{section.label}</span><i aria-hidden="true" /></button>)}</nav>
            <main ref={scrollerRef} className="about-scroller" onScroll={updateScroll}>
                <div className="about-surface">
                    <div className="about-container">
                        <AboutHero />
                        <AboutWork seen={seen.includes('what-we-do')} />
                        <AboutStory seen={seen.includes('our-story')} inView={storyInView} />
                        <AboutJoin seen={seen.includes('join')} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default About
