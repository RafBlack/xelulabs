import './BigOrca.css'
import { memo, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import PixelRects from './PixelRects'
import Splash from './Splash'
import { BIG_ORCA, BIG_ORCA_GLITCH, BIG_ORCA_SHINY, BODY_ORCA, SHADES } from '../data/orcaArt'
import { XELU_LINES } from '../data/xeluLines'
import { BREACH_PATH, HACK_WINDOW, HEAD_AIM, pickReaction, REACTION_DURATIONS, REACTION_HOLDS, SPLASH_END, SWIM_PATH } from '../data/timeline'
import type { RandomReaction } from '../data/timeline'

type Reaction = keyof typeof REACTION_DURATIONS
type Point = { x: number; y: number }
type Scale = { x: number; y: number }

const HEAD_COLS = BIG_ORCA.rows[0].length
const HEAD_ROWS = BIG_ORCA.rows.length
const SPOUT_COLUMNS = [[0, 10, 120], [14, 14, 170], [30, 10, 130]]
const SPOUT_TONES = ['#f2f2ef', '#cfe9ec', '#7fd3d8']
const SPOUT_DROPS = Array.from({ length: 18 }, (_, i) => ({
    left: (i * 7) % 40,
    flip: i % 2 ? -1 : 1,
    width: 20 + ((i * 23) % 80),
    height: 90 + ((i * 41) % 140),
    size: [6, 8, 10, 12][i % 4],
    color: SPOUT_TONES[i % 3],
    delay: `${((i * 5) % 6) * 0.03}s`,
}))
const RAIN = Array.from({ length: 96 }, (_, i) => ({
    left: i * 28,
    delay: `${((i * 7) % 13) * 0.07}s`,
    duration: `${2.2 + ((i * 5) % 7) * 0.12}s`,
    text: Array.from({ length: 22 + (i % 9) }, (_, j) => ((i * 31 + j * 17) % 3 === 0 ? '1' : '0')).join('\n') + '\n',
    head: i % 2 ? '1' : '0',
}))

const DRIPS = [
    { left: '17.5%', top: '25%' },
    { left: '20%', top: '37%' },
    { left: '25%', top: '53%' },
    { left: '30%', top: '65%' },
]

const makeBurst = (left: number, start: number) => ({
    left,
    columns: [[10, 10, 110], [22, 12, 160], [36, 10, 120]].map(([x, width, height], i) => ({
        left: x,
        width,
        height,
        delay: `${start + i * 0.05}s`,
    })),
    drops: Array.from({ length: 18 }, (_, i) => ({
        left: 10 + ((i * 7) % 34),
        flip: i % 2 ? -1 : 1,
        width: 24 + ((i * 23) % 90),
        height: 80 + ((i * 41) % 160),
        size: [6, 8, 10, 12][i % 4],
        color: SPOUT_TONES[i % 3],
        delay: `${start + ((i * 5) % 6) * 0.03}s`,
    })),
})

const parseDuration = (value: string) => Number.parseFloat(value) * (value.endsWith('ms') ? 1 : 1000)

function BigOrca({ play }: { play: boolean }) {
    const layerRef = useRef<HTMLDivElement>(null)
    const aimRef = useRef<HTMLDivElement>(null)
    const aimPointerRef = useRef<Point | null>(null)
    const bodyRef = useRef<HTMLDivElement>(null)
    const timerRef = useRef<number | undefined>(undefined)
    const tapsRef = useRef<number[]>([])
    const lastReactionRef = useRef<Reaction | null>(null)
    const withoutBubbleRef = useRef(0)
    const [fx, setFx] = useState(play)
    const [state, setState] = useState({
        kind: null as Reaction | null,
        id: 0,
        pets: 0,
        line: '',
        scale: { x: 1, y: 1 } as Scale,
    })
    const reducedMotion = !play

    useEffect(() => {
        if (!play) return
        const timer = window.setTimeout(() => setFx(false), SPLASH_END)
        return () => window.clearTimeout(timer)
    }, [play])

    useEffect(() => () => window.clearTimeout(timerRef.current), [])

    useEffect(() => {
        const aim = aimRef.current
        if (!aim || reducedMotion) return
        let frame = 0
        const update = () => {
            frame = 0
            const pointer = aimPointerRef.current
            const stage = layerRef.current?.closest('.stage')?.getBoundingClientRect()
            if (!pointer || !stage || state.kind) return
            const position = (pointer.x - stage.left) / stage.width
            const progress = Math.max(0, Math.min(1, (position - HEAD_AIM.inset) / (1 - HEAD_AIM.inset * 2)))
            const angle = HEAD_AIM.min + (HEAD_AIM.max - HEAD_AIM.min) * progress
            aim.style.setProperty('--aim', `${Math.round(angle * 10) / 10}deg`)
        }
        const move = (event: PointerEvent) => {
            if (event.pointerType === 'touch' && event.type !== 'pointerdown') return
            aimPointerRef.current = { x: event.clientX, y: event.clientY }
            if (!frame) frame = window.requestAnimationFrame(update)
        }
        if (state.kind) aim.style.setProperty('--aim', '0deg')
        else if (aimPointerRef.current) frame = window.requestAnimationFrame(update)
        window.addEventListener('pointermove', move, { passive: true })
        window.addEventListener('pointerdown', move, { passive: true })
        return () => {
            window.removeEventListener('pointermove', move)
            window.removeEventListener('pointerdown', move)
            window.cancelAnimationFrame(frame)
        }
    }, [reducedMotion, state.kind])

    useEffect(() => {
        const kind = state.kind
        const body = bodyRef.current
        const stage = layerRef.current?.closest('.stage')
        const layer = layerRef.current
        if (!body || !stage || !layer || reducedMotion || (kind !== 'swim' && kind !== 'breach')) return
        const stageRect = stage.getBoundingClientRect()
        const layerRect = layer.getBoundingClientRect()
        const dx = stageRect.left - layerRect.left
        const dy = stageRect.top - layerRect.top
        const path = kind === 'swim' ? SWIM_PATH : BREACH_PATH
        const keyframes = path.map((point) => ({
            offset: point.at / 100,
            transform: `translate(${point.x * state.scale.x + dx}px, ${point.y * state.scale.y + dy}px) rotate(${point.rotate}deg) scaleX(${point.flip})`,
        }))
        const animation = body.animate(keyframes, {
            duration: parseDuration(REACTION_DURATIONS[kind]),
            fill: 'both',
        })
        return () => animation.cancel()
    }, [reducedMotion, state.id, state.kind, state.scale])

    const poke = () => {
        const now = Date.now()
        const taps = tapsRef.current.filter((tap) => now - tap < HACK_WINDOW)
        taps.push(now)
        tapsRef.current = taps
        const stage = layerRef.current?.closest('.stage')
        const stageRect = stage?.getBoundingClientRect()
        const scale = stageRect ? { x: stageRect.width / 1440, y: stageRect.height / 860 } : { x: 1, y: 1 }
        let next: Reaction
        if (taps.length >= 5) {
            next = 'hack'
            tapsRef.current = []
        } else if (Math.random() < 0.02) {
            next = 'shiny'
        } else {
            const last = lastReactionRef.current
            next = pickReaction(last === 'hack' || last === 'shiny' ? null : last as RandomReaction | null, withoutBubbleRef.current)
        }
        if (reducedMotion && next !== 'hack' && next !== 'shiny') next = 'talk'
        lastReactionRef.current = next
        withoutBubbleRef.current = next === 'talk' || next === 'tilt' || next === 'hack' || next === 'shiny' ? 0 : withoutBubbleRef.current + 1
        const line = XELU_LINES[Math.floor(Math.random() * XELU_LINES.length)]
        setState((current) => ({
            ...current,
            kind: next,
            id: current.id + 1,
            pets: current.pets + 1,
            line,
            scale,
        }))
        window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => setState((current) => ({ ...current, kind: null })), REACTION_HOLDS[next] ?? 2400)
    }

    const kind = state.kind
    const isBody = !reducedMotion && (kind === 'swim' || kind === 'breach')
    const headArt = kind === 'shiny' && !reducedMotion ? BIG_ORCA_SHINY : BIG_ORCA
    const headAnimation = reducedMotion || !kind ? 'none' : isBody ? 'o5away' : `o5${kind}`
    const headStyle: CSSProperties = {
        animationName: headAnimation,
        animationDuration: kind ? REACTION_DURATIONS[kind] : '0s',
    }
    const bursts = kind === 'swim' ? [makeBurst(1310, 0.1), makeBurst(1300, 6)] : kind === 'breach' ? [makeBurst(1040, 0), makeBurst(680, 2.4)] : []
    const bubble = kind === 'tilt' ? '?' : kind === 'talk' ? state.line : kind === 'hack' ? 'access granted' : kind === 'shiny' ? 'shiny xelu!' : ''

    return (
        <>
            <div ref={layerRef} className="orca-layer">
                {!reducedMotion && kind === 'hack' && (
                    <div className="orca-rain" aria-hidden="true">
                        {RAIN.map((rain) => (
                            <div key={rain.left} className="orca-rain-col" style={{ left: `${rain.left}px`, animationDelay: rain.delay, animationDuration: rain.duration }}>
                                {rain.text}<span>{rain.head}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="big-orca" aria-hidden="true">
                    <div className="big-orca-rise">
                        <div ref={aimRef} className="big-orca-aim">
                            <div key={state.id} className="big-orca-react" style={headStyle}>
                                <svg className="big-orca-bob" viewBox={`0 0 ${HEAD_COLS} ${HEAD_ROWS}`} shapeRendering="crispEdges">
                                    {BIG_ORCA_GLITCH.map((ghost) => (
                                        <g key={ghost.color} opacity={0.6}>
                                            <g style={{ animationName: kind === 'glitch' || kind === 'hack' ? ghost.dx < 0 ? 'o5gR' : 'o5gC' : 'none', animationDuration: '0.6s' }}>
                                                <PixelRects art={headArt} fill={ghost.color} dx={ghost.dx} />
                                            </g>
                                        </g>
                                    ))}
                                    <PixelRects art={headArt} />
                                </svg>
                                {!reducedMotion && kind === 'hack' && (
                                    <svg className="orca-shades" viewBox="0 0 18 5" shapeRendering="crispEdges" aria-hidden="true">
                                        <PixelRects art={SHADES} />
                                    </svg>
                                )}
                                {!reducedMotion && kind === 'shiny' && (
                                    <>
                                        <span className="orca-spark" style={{ left: '30%', top: '12%' }} />
                                        <span className="orca-spark" style={{ left: '62%', top: '30%', animationDelay: '0.3s' }} />
                                        <span className="orca-spark" style={{ left: '20%', top: '52%', animationDelay: '0.6s' }} />
                                        <span className="orca-spark" style={{ left: '78%', top: '8%', animationDelay: '0.45s' }} />
                                    </>
                                )}
                                {!reducedMotion && kind === 'spout' && (
                                    <div className="orca-spout" aria-hidden="true">
                                        {SPOUT_COLUMNS.map(([left, width, height], i) => (
                                            <div key={left} className="orca-spout-col" style={{ left, width, height, animationDelay: `${i * 0.05}s` }} />
                                        ))}
                                        {SPOUT_DROPS.map((drop, i) => (
                                            <div key={i} className="orca-spout-pos" style={{ left: drop.left, transform: `scaleX(${drop.flip})` }}>
                                                <div className="orca-spout-drop" style={{ width: drop.width, height: drop.height, animationDelay: drop.delay }}>
                                                    <i style={{ width: drop.size, height: drop.size, background: drop.color }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {bubble && (
                                    <div className="orca-bubble" role="status">
                                        {bubble}
                                        <span className="orca-tail" />
                                        <span className="orca-tail-two" />
                                    </div>
                                )}
                                {fx &&
                                    DRIPS.map((drip, i) => (
                                        <i key={i} className="drip" style={{ ...drip, animationDelay: `${3.2 + i * 0.35}s` }} />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                {isBody && (
                    <div key={state.id} ref={bodyRef} className="orca-body" aria-hidden="true">
                        <div className="orca-body-in">
                            <svg viewBox="0 0 48 22" shapeRendering="crispEdges">
                                <g opacity={0.6}><PixelRects art={BODY_ORCA} fill="#8a2d45" dx={-0.25} /></g>
                                <g opacity={0.6}><PixelRects art={BODY_ORCA} fill="#2d7f86" dx={0.25} /></g>
                                <PixelRects art={BODY_ORCA} />
                            </svg>
                        </div>
                    </div>
                )}
                {!reducedMotion && bursts.map((burst, burstIndex) => (
                    <div key={burstIndex} className="orca-burst" style={{ left: `${burst.left * state.scale.x}px` }}>
                        {burst.columns.map((column) => (
                            <div key={column.left} className="orca-burst-col" style={{ left: column.left, width: column.width, height: column.height, animationDelay: column.delay }} />
                        ))}
                        {burst.drops.map((drop, i) => (
                            <div key={i} className="orca-burst-pos" style={{ left: drop.left, transform: `scaleX(${drop.flip})` }}>
                                <div className="orca-burst-drop" style={{ width: drop.width, height: drop.height, animationDelay: drop.delay }}>
                                    <i style={{ width: drop.size, height: drop.size, background: drop.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <button
                    type="button"
                    className="orca-hit"
                    aria-label="Poke xelu"
                    onClick={poke}
                />
                {state.pets > 0 && <p className="orca-pets">PETS: {state.pets}</p>}
            </div>
            {fx && <Splash />}
        </>
    )
}

export default memo(BigOrca)
