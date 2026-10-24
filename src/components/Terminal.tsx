import './Terminal.css'
import { memo, useEffect, useState } from 'react'
import { TYPE } from '../data/timeline'

const CMD = 'man xelulabs'
const DESC =
    'A passion-driven cybersecurity organization focused on improvement and exposure through practical competition and projects.'
const TOTAL = CMD.length + DESC.length

const clamp = (v: number, max: number) => Math.min(max, Math.max(0, v))

function typedAt(ms: number) {
    const cmd = Math.floor(((ms - TYPE.cmdStart) / TYPE.cmdDuration) * CMD.length)
    const desc = Math.floor((ms - TYPE.descStart) / TYPE.charMs) + 1
    return clamp(cmd, CMD.length) + clamp(desc, DESC.length)
}

const Cursor = () => <span className="term-cursor" />

function Chars({ text, shown, cursorAt }: { text: string; shown: number; cursorAt: number }) {
    return [...text].map((ch, i) => (
        <span key={i} className={i < shown ? 'term-ch' : 'term-ch term-hidden'}>
            {ch}
            {i === cursorAt && <Cursor />}
        </span>
    ))
}

function Terminal() {
    const [n, setN] = useState(0)

    useEffect(() => {
        const start = performance.now()
        let frame = requestAnimationFrame(function tick(now) {
            const next = typedAt(now - start)
            setN(next)
            if (next < TOTAL) frame = requestAnimationFrame(tick)
        })
        return () => cancelAnimationFrame(frame)
    }, [])

    const cmdShown = Math.min(n, CMD.length)
    const descShown = Math.max(0, n - CMD.length)

    return (
        <div className={`terminal${n === TOTAL ? ' term-done' : ''}`}>
            <p className="term-cmd">
                <span className="term-prompt">
                    ${' '}
                    {n === 0 && <Cursor />}
                </span>
                <span aria-hidden="true">
                    <Chars text={CMD} shown={cmdShown} cursorAt={descShown ? -1 : cmdShown - 1} />
                </span>
                <span className="sr-only">{CMD}</span>
            </p>
            <p className="term-desc">
                <span aria-hidden="true">
                    <Chars text={DESC} shown={descShown} cursorAt={descShown - 1} />
                </span>
                <span className="sr-only">{DESC}</span>
            </p>
        </div>
    )
}

export default memo(Terminal)
