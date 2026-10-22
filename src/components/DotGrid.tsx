import './DotGrid.css'
import { useEffect, useRef } from 'react'
import { RIPPLE } from '../data/timeline'
import type { Hole } from '../hooks/useCutouts'
import type { Point } from '../hooks/useMousePosition'
import type { Wave } from '../hooks/useRipples'

type Props = { pos: Point; waves: Wave[]; holes: Hole[] }

type Dot = { x: number; y: number; t: number; ox: number; oy: number }

const WIDTH = 1920
const HEIGHT = 1080
const RADIUS = 140
const PUSH = 7
const SIZE = 3
const EASE = 0.25

function makeDots() {
    const dots: Dot[] = []
    for (let y = 156; y <= 924; y += 48) {
        for (let x = 168; x <= 1752; x += 48) dots.push({ x, y, t: 0, ox: 0, oy: 0 })
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
        const ratio = window.devicePixelRatio || 1
        canvas.width = WIDTH * ratio
        canvas.height = HEIGHT * ratio
        ctx.scale(ratio, ratio)
        const dots = makeDots()
        let frame = 0

        const draw = () => {
            const { pos, waves, holes } = latest.current
            ctx.clearRect(0, 0, WIDTH, HEIGHT)
            dots.forEach((dot) => {
                const goal = target(dot, pos, waves)
                dot.t += (goal.t - dot.t) * EASE
                dot.ox += (goal.ox - dot.ox) * EASE
                dot.oy += (goal.oy - dot.oy) * EASE
                if (inHole(dot, holes)) return
                const c = Math.round(46 + (150 - 46) * dot.t)
                ctx.fillStyle = `rgb(${c},${c},${Math.round(51 + (156 - 51) * dot.t)})`
                ctx.beginPath()
                ctx.arc(dot.x + dot.ox, dot.y + dot.oy, SIZE * (1 + dot.t * 0.5), 0, Math.PI * 2)
                ctx.fill()
            })
            frame = requestAnimationFrame(draw)
        }

        frame = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(frame)
    }, [])

    return <canvas ref={canvasRef} className="dots" aria-hidden="true" />
}

export default DotGrid
