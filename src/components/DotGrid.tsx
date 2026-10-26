import './DotGrid.css'
import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { RIPPLE } from '../data/timeline'
import type { Hole } from '../hooks/useCutouts'
import type { Point } from '../hooks/useMousePosition'
import type { Wave } from '../hooks/useRipples'

type Props = { pos: RefObject<Point>; waves: Wave[]; holes: Hole[] }

type Dot = { x: number; y: number; t: number; ox: number; oy: number }

const RADIUS = 140
const PUSH = 7
const SIZE = 2
const EASE = 0.25
const STEP = 32

function makeDots(width: number, height: number) {
    const dots: Dot[] = []
    for (let y = STEP / 2; y < height; y += STEP) {
        for (let x = ((width % STEP) + STEP) / 2; x < width; x += STEP) dots.push({ x, y, t: 0, ox: 0, oy: 0 })
    }
    return dots
}

function waveStrength(dot: Dot, waves: Wave[]) {
    return waves.reduce((max, w) => {
        const off = Math.abs(Math.hypot(dot.x - w.x, dot.y - w.y) - w.r)
        const s = Math.max(0, 1 - off / RIPPLE.band) * Math.max(0, 1 - w.r / RIPPLE.max) * RIPPLE.strength
        return Math.max(max, s)
    }, 0)
}

function target(dot: Dot, pos: Point, waves: Wave[]) {
    const dx = dot.x - pos.x
    const dy = dot.y - pos.y
    const d = Math.hypot(dx, dy) || 1
    const near = Math.max(0, 1 - d / RADIUS)
    const push = near * PUSH
    return { t: Math.min(1, near + waveStrength(dot, waves)), ox: (dx / d) * push, oy: (dy / d) * push }
}

const inHole = (dot: Dot, holes: Hole[]) =>
    holes.some((h) => dot.x > h.x1 && dot.x < h.x2 && dot.y > h.y1 && dot.y < h.y2)

function DotGrid({ pos, waves, holes }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const latest = useRef<Props>({ pos, waves, holes })

    useEffect(() => {
        latest.current = { pos, waves, holes }
    })

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return
        let ratio = 1
        let size = SIZE
        let width = 0
        let height = 0
        let dots: Dot[] = []
        let frame = 0
        let dirty = true
        let last: Point = { x: NaN, y: NaN }
        let lastHoles: Hole[] = []

        const setup = () => {
            ratio = window.devicePixelRatio || 1
            size = Math.max(1, Math.round(SIZE * ratio))
            width = canvas.offsetWidth
            height = canvas.offsetHeight
            canvas.width = Math.round(width * ratio)
            canvas.height = Math.round(height * ratio)
            dots = makeDots(width, height)
            dirty = true
        }
        const observer = new ResizeObserver(setup)
        observer.observe(canvas)

        const draw = () => {
            frame = requestAnimationFrame(draw)
            const { waves, holes } = latest.current
            const pos = latest.current.pos.current
            if (!dirty && !waves.length && holes === lastHoles && pos.x === last.x && pos.y === last.y) return
            last = pos
            lastHoles = holes
            dirty = false
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            dots.forEach((dot) => {
                const goal = target(dot, pos, waves)
                if (Math.abs(goal.t - dot.t) > 0.001 || Math.abs(goal.ox - dot.ox) > 0.01 || Math.abs(goal.oy - dot.oy) > 0.01) dirty = true
                dot.t += (goal.t - dot.t) * EASE
                dot.ox += (goal.ox - dot.ox) * EASE
                dot.oy += (goal.oy - dot.oy) * EASE
                if (inHole(dot, holes)) return
                const c = Math.round(38 + (74 - 38) * dot.t)
                ctx.fillStyle = `rgb(${c},${c},${Math.round(42 + (82 - 42) * dot.t)})`
                ctx.fillRect(Math.round((dot.x + dot.ox) * ratio), Math.round((dot.y + dot.oy) * ratio), size, size)
            })
        }

        frame = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(frame)
            observer.disconnect()
        }
    }, [])

    return <canvas ref={canvasRef} className="dots" aria-hidden="true" />
}

export default DotGrid
