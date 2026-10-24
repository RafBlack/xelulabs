import { useEffect, useRef, useState } from 'react'

export type Hole = { x1: number; y1: number; x2: number; y2: number }

const PAD = 26

export function useCutouts() {
    const stageRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLElement>(null)
    const [holes, setHoles] = useState<Hole[]>([])

    useEffect(() => {
        const measure = () => {
            const stage = stageRef.current
            const hero = heroRef.current
            if (!stage || !hero) return
            const box = stage.getBoundingClientRect()
            setHoles(
                Array.from(hero.children, (el) => {
                    const r = el.getBoundingClientRect()
                    return {
                        x1: r.left - box.left - PAD,
                        y1: r.top - box.top - PAD,
                        x2: r.right - box.left + PAD,
                        y2: r.bottom - box.top + PAD,
                    }
                }),
            )
        }
        let live = true
        const frame = requestAnimationFrame(measure)
        document.fonts.ready.then(() => live && measure())
        addEventListener('resize', measure)
        return () => {
            live = false
            cancelAnimationFrame(frame)
            removeEventListener('resize', measure)
        }
    }, [])

    return { stageRef, heroRef, holes }
}
