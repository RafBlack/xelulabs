import './Orca.css'
import type { Ref } from 'react'
import {
    ORCA_BELLY,
    ORCA_BODY,
    ORCA_CELL,
    ORCA_DARK,
    ORCA_MASK,
    ORCA_ROWS,
    ORCA_SMILE,
} from '../data/orcaArt'
import type { Phase } from '../hooks/useOrcaIntro'

type Props = {
    ref?: Ref<HTMLSpanElement>
    phase: Phase
    typed: number
    open: boolean
    smile: boolean
}

function shapes(open: boolean, smile: boolean) {
    const palette: Record<string, string | null> = {
        F: ORCA_BODY,
        T: ORCA_BODY,
        B: ORCA_BODY,
        W: ORCA_BELLY,
        E: ORCA_DARK,
        K: ORCA_MASK,
        O: open ? null : ORCA_BODY,
        Q: open ? null : ORCA_DARK,
    }
    const grid = ORCA_ROWS.map((row) => row.split(''))
    if (smile && !open) ORCA_SMILE.forEach(([x, y]) => (grid[y][x] = 'E'))
    const paths: Record<string, string> = {}
    grid.forEach((row, y) =>
        row.forEach((key, x) => {
            const fill = palette[key]
            if (fill) paths[fill] = `${paths[fill] ?? ''}M${x} ${y}h1v1h-1z`
        }),
    )
    return Object.entries(paths)
}

function motionClass(phase: Phase, typed: number) {
    if (phase === 'enter') return 'orca-swimin'
    if (phase === 'leap' || phase === 'gone') return 'orca-swim'
    return typed % 2 ? 'orca-gulp-a' : 'orca-gulp-b'
}

function Orca({ ref, phase, typed, open, smile }: Props) {
    const cols = ORCA_ROWS[0].length
    const rows = ORCA_ROWS.length
    return (
        <span ref={ref} className={`orca ${motionClass(phase, typed)}`}>
            <svg
                className="orca-bob"
                width={cols * ORCA_CELL}
                height={rows * ORCA_CELL}
                viewBox={`0 0 ${cols} ${rows}`}
                shapeRendering="crispEdges"
            >
                {shapes(open, smile).map(([fill, d]) => (
                    <path key={fill} fill={fill} d={d} />
                ))}
            </svg>
        </span>
    )
}

export default Orca
