import { useEffect, useRef, useState } from 'react'

const WHEEL_GESTURE_GAP = 180
const WHEEL_MINIMUM_DELTA = 5

export function useSectionScroll(selector: string, lockDuration: number) {
    const pageRef = useRef<HTMLDivElement>(null)
    const scrollerRef = useRef<HTMLElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const scrollFrame = useRef(0)
    const [active, setActive] = useState(0)

    useEffect(() => {
        const scroller = scrollerRef.current
        const page = pageRef.current
        if (!scroller || !page) return
        const media = matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)')
        let lockedTarget: number | null = null
        let lockTimer: ReturnType<typeof setTimeout> | undefined
        let lastWheelAt = 0

        const sections = [...scroller.querySelectorAll<HTMLElement>(selector)]
        const sectionTop = (section: HTMLElement) => scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top
        const currentIndex = () => sections.reduce((best, section, index) => Math.abs(sectionTop(section) - scroller.scrollTop) < Math.abs(sectionTop(sections[best]) - scroller.scrollTop) ? index : best, 0)
        // sections taller than the viewport scroll natively until their edge
        const canScrollWithin = (direction: number) => {
            const section = sections[currentIndex()]
            const top = sectionTop(section)
            return direction > 0 ? scroller.scrollTop + scroller.clientHeight < top + section.offsetHeight - 2 : scroller.scrollTop > top + 2
        }
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
            lockTimer = setTimeout(unlock, lockDuration)
        }
        const onWheel = (event: WheelEvent) => {
            const direction = Math.sign(event.deltaY)
            const now = Date.now()
            const withinGesture = now - lastWheelAt < WHEEL_GESTURE_GAP
            lastWheelAt = now
            if (lockedTarget === null && direction && canScrollWithin(direction)) return
            event.preventDefault()
            if (lockedTarget !== null || withinGesture || !direction || (event.deltaMode === 0 && Math.abs(event.deltaY) < WHEEL_MINIMUM_DELTA)) return
            navigate(currentIndex() + direction)
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return
            const target = event.target
            if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [contenteditable], [role="textbox"]'))) return
            if (event.code === 'Space' && target instanceof HTMLElement && target.closest('button, a, summary, [role="button"]')) return
            let step = 0
            if (event.key === 'ArrowDown' || event.key === 'PageDown' || (event.code === 'Space' && !event.shiftKey)) step = 1
            if (event.key === 'ArrowUp' || event.key === 'PageUp' || (event.code === 'Space' && event.shiftKey)) step = -1
            if (step && lockedTarget === null && canScrollWithin(step)) {
                event.preventDefault()
                scroller.scrollBy({ top: step * scroller.clientHeight * 0.8, behavior: 'smooth' })
                return
            }
            let index = step ? currentIndex() + step : undefined
            if (event.key === 'Home') index = 0
            if (event.key === 'End') index = sections.length - 1
            if (index === undefined) return
            event.preventDefault()
            navigate(index)
        }
        const onScrollEnd = () => {
            if (lockedTarget !== null && Math.abs(scroller.scrollTop - lockedTarget) < 2) unlock()
        }
        const removeListeners = () => {
            page.removeEventListener('wheel', onWheel)
            window.removeEventListener('keydown', onKeyDown)
            scroller.removeEventListener('scrollend', onScrollEnd)
            unlock()
        }
        const syncListeners = () => {
            removeListeners()
            if (!media.matches) return
            page.addEventListener('wheel', onWheel, { passive: false })
            window.addEventListener('keydown', onKeyDown)
            scroller.addEventListener('scrollend', onScrollEnd)
        }
        media.addEventListener('change', syncListeners)
        syncListeners()
        return () => {
            media.removeEventListener('change', syncListeners)
            removeListeners()
            cancelAnimationFrame(scrollFrame.current)
        }
    }, [selector, lockDuration])

    const syncScroll = () => {
        scrollFrame.current = 0
        const scroller = scrollerRef.current
        if (!scroller) return
        const max = scroller.scrollHeight - scroller.clientHeight
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scroller.scrollTop / max : 0})`
        const middle = scroller.getBoundingClientRect().top + scroller.clientHeight / 2
        const sections = [...scroller.querySelectorAll<HTMLElement>(selector)]
        const nearest = sections.reduce((best, section, index) => Math.abs(section.getBoundingClientRect().top + section.clientHeight / 2 - middle) < Math.abs(sections[best].getBoundingClientRect().top + sections[best].clientHeight / 2 - middle) ? index : best, 0)
        setActive((previous) => previous === nearest ? previous : nearest)
    }

    const onScroll = () => {
        if (scrollFrame.current) return
        scrollFrame.current = requestAnimationFrame(syncScroll)
    }

    const goTo = (id: string) => {
        const scroller = scrollerRef.current
        const section = document.getElementById(id)
        if (!scroller || !section) return
        scroller.scrollTo({ top: scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }

    return { pageRef, scrollerRef, progressRef, active, onScroll, goTo }
}
