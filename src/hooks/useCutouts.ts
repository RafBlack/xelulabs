import { useEffect, useRef, useState } from 'react'
import type { Phase } from './useOrcaIntro'

export type Hole = { x1: number; y1: number; x2: number; y2: number }

const PAD = 26

export function useCutouts(phase: Phase) {
    const stageRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descRef = useRef<HTMLParagraphElement>(null)
    const orcaRef = useRef<HTMLSpanElement>(null)
    const [holes, setHoles] = useState<Hole[]>([])
    const withOrca = phase !== 'gone'

    useEffect(() => {
        const measure = () => {
            const stage = stageRef.current
            if (!stage) return
            const box = stage.getBoundingClientRect()
            if (!box.width) return
            const s = box.width / 1920
            const els = [titleRef.current, descRef.current, withOrca ? orcaRef.current : null]
            setHoles(
                els
                    .filter((el): el is HTMLElement => el !== null)
                    .map((el) => {
                        const r = el.getBoundingClientRect()
                        return {
                            x1: (r.left - box.left) / s - PAD,
                            y1: (r.top - box.top) / s - PAD,
                            x2: (r.right - box.left) / s + PAD,
                            y2: (r.bottom - box.top) / s + PAD,
                        }
                    }),
            )
        }
        let live = true
        const frame = requestAnimationFrame(measure)
        document.fonts.ready.then(() => live && measure())
        return () => {
            live = false
            cancelAnimationFrame(frame)
        }
    }, [phase, withOrca])

    return { stageRef, titleRef, descRef, orcaRef, holes }
}
