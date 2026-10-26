import './Crew.css'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Header from '../components/Header'
import CrewHero from '../components/crew/CrewHero'
import CrewGrid from '../components/crew/CrewGrid'
import { CREW_TIMING } from '../data/crew'

const CREW_SECTIONS = [
    { id: 'crew-hero', label: 'THE CREW' },
    { id: 'crew-grid', label: 'MEMBERS' },
]

function Crew() {
    const pageRef = useRef<HTMLDivElement>(null)
    const scrollerRef = useRef<HTMLElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const scrollFrame = useRef(0)
    const [seen, setSeen] = useState<string[]>(['crew-hero'])
    const [active, setActive] = useState(0)

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
    }, [])

    useEffect(() => {
        const scroller = scrollerRef.current
        const page = pageRef.current
        if (!scroller || !page) return
        const media = matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)')
        let lockedTarget: number | null = null
        let lockTimer: ReturnType<typeof setTimeout> | undefined

        const sections = [...scroller.querySelectorAll<HTMLElement>('.crew-section')]
        const sectionTop = (section: HTMLElement) => scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top
        const currentIndex = () => sections.reduce((best, section, index) => Math.abs(sectionTop(section) - scroller.scrollTop) < Math.abs(sectionTop(sections[best]) - scroller.scrollTop) ? index : best, 0)
        const unlock = () => {
            lockedTarget = null
            clearTimeout(lockTimer)
        }
        const navigate = (index: number) => {
            if (lockedTarget !== null || index < 0 || index >= sections.length) return
            const target = sectionTop(sections[index])
            if (Math.abs(scroller.scrollTop - target) < 2) return
            lockedTarget = target
            setActive(index)
            scroller.scrollTo({ top: target, behavior: 'smooth' })
            lockTimer = setTimeout(unlock, 700)
        }
        const onWheel = (event: WheelEvent) => {
            const direction = Math.sign(event.deltaY)
            if (direction === 0) return
            if (lockedTarget !== null) {
                event.preventDefault()
                return
            }

            const index = currentIndex()
            const section = sections[index]
            const top = sectionTop(section)
            const bottom = top + section.offsetHeight
            const canScrollWithin = direction > 0
                ? scroller.scrollTop + scroller.clientHeight < bottom - 2
                : scroller.scrollTop > top + 2

            if (canScrollWithin) return

            const nextIndex = index + direction
            if (nextIndex < 0 || nextIndex >= sections.length) return
            event.preventDefault()
            navigate(nextIndex)
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return
            const target = event.target
            if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [contenteditable], [role="textbox"]'))) return
            if (event.code === 'Space' && target instanceof HTMLElement && target.closest('button, a, summary, [role="button"]')) return
            let index: number | undefined
            if (event.key === 'ArrowDown' || event.key === 'PageDown' || (event.code === 'Space' && !event.shiftKey)) index = currentIndex() + 1
            if (event.key === 'ArrowUp' || event.key === 'PageUp' || (event.code === 'Space' && event.shiftKey)) index = currentIndex() - 1
            if (event.key === 'Home') index = 0
            if (event.key === 'End') index = sections.length - 1
            if (index === undefined) return
            event.preventDefault()
            if (lockedTarget !== null) return
            navigate(index)
        }
        const onScrollEnd = () => {
            if (lockedTarget !== null && Math.abs(scroller.scrollTop - lockedTarget) < 2) unlock()
        }
        const syncListeners = () => {
            page.removeEventListener('wheel', onWheel)
            window.removeEventListener('keydown', onKeyDown)
            scroller.removeEventListener('scrollend', onScrollEnd)
            unlock()
            if (!media.matches) return
            page.addEventListener('wheel', onWheel, { passive: false })
            window.addEventListener('keydown', onKeyDown)
            scroller.addEventListener('scrollend', onScrollEnd)
        }
        media.addEventListener('change', syncListeners)
        syncListeners()
        return () => {
            media.removeEventListener('change', syncListeners)
            page.removeEventListener('wheel', onWheel)
            window.removeEventListener('keydown', onKeyDown)
            scroller.removeEventListener('scrollend', onScrollEnd)
            unlock()
        }
    }, [])

    const updateScroll = () => {
        if (scrollFrame.current) return
        scrollFrame.current = requestAnimationFrame(syncScroll)
    }

    const syncScroll = () => {
        scrollFrame.current = 0
        const scroller = scrollerRef.current
        if (!scroller) return
        const max = scroller.scrollHeight - scroller.clientHeight
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scroller.scrollTop / max : 0})`
        const middle = scroller.getBoundingClientRect().top + scroller.clientHeight / 2
        const sections = [...scroller.querySelectorAll<HTMLElement>('.crew-section')]
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
        <div ref={pageRef} className="crew-page" style={{ '--crew-dot-transition': `${CREW_TIMING.fade}s` } as CSSProperties}>
            <div className="crew-header"><Header /></div>
            <div ref={progressRef} className="crew-progress" aria-hidden="true" />
            <nav className="crew-dots" aria-label="Sections">{CREW_SECTIONS.map((section, index) => <button key={section.id} type="button" className="crew-dot" aria-current={active === index ? 'true' : undefined} onClick={() => goToSection(section.id)}><span>{section.label}</span><i aria-hidden="true" /></button>)}</nav>
            <main ref={scrollerRef} className="crew-scroller" onScroll={updateScroll}>
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
