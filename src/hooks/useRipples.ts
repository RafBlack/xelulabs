import { useCallback, useEffect, useRef, useState } from 'react'
import { LOGO_HITS, LOGO_HITS_PORTRAIT, LOOP_MS, RIPPLE } from '../data/timeline'

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

    useEffect(() => {
        const timers: number[] = []
        const fire = () => {
            const hits = matchMedia('(orientation: portrait)').matches ? LOGO_HITS_PORTRAIT : LOGO_HITS
            hits.forEach((h) =>timers.push(setTimeout(() => addRipple(h.x, h.y), h.at)))
        }
        fire()
        const loop = setInterval(fire, LOOP_MS)
        return () => {
            clearInterval(loop)
            timers.forEach(clearTimeout)
        }
    }, [addRipple])

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
