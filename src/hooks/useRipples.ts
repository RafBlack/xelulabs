import { useCallback, useEffect, useRef, useState } from 'react'
import { RIPPLE } from '../data/timeline'

export type Wave = { x: number; y: number; r: number }

type Source = { x: number; y: number; t: number }

export function useRipples() {
    const [waves, setWaves] = useState<Wave[]>([])
    const list = useRef<Source[]>([])
    const frame = useRef(0)

    const addRipple = useCallback((x: number, y: number) => {
        list.current.push({ x, y, t: performance.now() })
        if (frame.current) return
        const step = (now: number) => {
            const radius = (w: Source) => Math.max(0, now - w.t) * RIPPLE.speed
            list.current = list.current.filter((w) => radius(w) < RIPPLE.max)
            setWaves(list.current.map((w) => ({ x: w.x, y: w.y, r: radius(w) })))
            frame.current = list.current.length ? requestAnimationFrame(step) : 0
        }
        frame.current = requestAnimationFrame(step)
    }, [])

    useEffect(
        () => () => {
            cancelAnimationFrame(frame.current)
            frame.current = 0
            list.current = []
        },
        [],
    )

    return { waves, addRipple }
}
