import { useCallback, useRef } from 'react'
import type { MouseEvent } from 'react'

export type Point = { x: number; y: number }

const OFF: Point = { x: -9999, y: -9999 }

export function toStage(e: MouseEvent<HTMLElement>): Point {
    const r = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
}

export function useMousePosition() {
    const pos = useRef<Point>(OFF)
    const onMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
        pos.current = toStage(e)
    }, [])
    const onMouseLeave = useCallback(() => {
        pos.current = OFF
    }, [])
    return { pos, onMouseMove, onMouseLeave }
}
