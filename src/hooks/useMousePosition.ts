import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

export type Point = { x: number; y: number }

const OFF: Point = { x: -9999, y: -9999 }

export function toStage(e: MouseEvent<HTMLElement>): Point {
    const r = e.currentTarget.getBoundingClientRect()
    return {
        x: ((e.clientX - r.left) * 1920) / r.width,
        y: ((e.clientY - r.top) * 1080) / r.height,
    }
}

export function useMousePosition() {
    const [pos, setPos] = useState<Point>(OFF)
    const frame = useRef(0)
    const pending = useRef<Point>(OFF)

    const onMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
        pending.current = toStage(e)
        if (frame.current) return
        frame.current = requestAnimationFrame(() => {
            frame.current = 0
            setPos(pending.current)
        })
    }, [])

    const onMouseLeave = useCallback(() => {
        cancelAnimationFrame(frame.current)
        frame.current = 0
        setPos(OFF)
    }, [])

    useEffect(() => () => cancelAnimationFrame(frame.current), [])

    return { pos, onMouseMove, onMouseLeave }
}
