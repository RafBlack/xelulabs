import { useLayoutEffect } from 'react'
import type { RefObject } from 'react'
import { SWIM } from '../data/timeline'

const DROP: Keyframe[] = [
    { transform: 'translateY(-0.6em)', opacity: 0 },
    { transform: 'none', opacity: 1 },
]

export function useSwimIntro(lineRef: RefObject<HTMLElement | null>, orcaRef: RefObject<HTMLElement | null>) {
    useLayoutEffect(() => {
        const line = lineRef.current
        const orca = orcaRef.current
        if (!line || !orca) return
        const letters = Array.from(line.querySelectorAll<HTMLElement>('.hero-letter'))
        const swim = orca.animate(null, { delay: SWIM.start, duration: SWIM.duration, fill: 'both' })
        const path = swim.effect as KeyframeEffect
        const drops = letters.map((el) =>
            el.animate(DROP, { duration: SWIM.drop, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'backwards' }),
        )

        const plan = () => {
            const box = line.getBoundingClientRect()
            const w = orca.offsetWidth
            const from = -box.left - w
            const to = document.documentElement.clientWidth - box.left
            path.setKeyframes([
                { transform: `translateX(${from}px)` },
                { transform: `translateX(${to}px)` },
            ])
            letters.forEach((el, i) => {
                const r = el.getBoundingClientRect()
                const mid = r.left + r.width / 2 - box.left - w / 2
                drops[i].effect?.updateTiming({ delay: SWIM.start + ((mid - from) / (to - from)) * SWIM.duration })
            })
        }

        plan()
        addEventListener('resize', plan)
        return () => {
            removeEventListener('resize', plan)
            swim.cancel()
            drops.forEach((a) => a.cancel())
        }
    }, [lineRef, orcaRef])
}
