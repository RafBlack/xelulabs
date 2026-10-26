import { ABOUT_HEAD, BIG_ORCA, BODY_ORCA, SMALL_ORCA, SMALL_ORCA_TAIL } from '../data/orcaArt.ts'
import type { Pixels } from '../data/orcaArt.ts'
import { pixelPaths } from './pixelPaths.ts'

function source(art: Pixels, from: number, to: number, fill?: string) {
    const out: string[] = []
    art.rows.forEach((row, y) => [...row].forEach((key, x) => {
        const color = art.palette[key]
        if (color && x >= from && x < to) out.push(`${x},${y},${fill ?? color}`)
    }))
    return out.sort()
}

function drawn(paths: Map<string, string>) {
    const out: string[] = []
    for (const [color, d] of paths) {
        for (const [, x, y, w] of d.matchAll(/M(-?\d+) (\d+)h(\d+)v1h-\d+z/g)) {
            for (let i = 0; i < +w; i++) out.push(`${+x + i},${y},${color}`)
        }
    }
    return out.sort()
}

const cases: [string, Pixels, number, number, string?][] = [
    ['small', SMALL_ORCA, 0, Infinity],
    ['small head', SMALL_ORCA, SMALL_ORCA_TAIL, Infinity],
    ['small tail', SMALL_ORCA, 0, SMALL_ORCA_TAIL],
    ['body', BODY_ORCA, 0, Infinity],
    ['body ghost', BODY_ORCA, 0, Infinity, '#8a2d45'],
    ['big', BIG_ORCA, 0, Infinity],
    ['about head', ABOUT_HEAD, 0, Infinity],
]

for (const [name, art, from, to, fill] of cases) {
    const want = source(art, from, to, fill)
    const got = drawn(pixelPaths(art, from, to, fill))
    if (want.join() !== got.join()) throw new Error(`${name}: ${got.length} pixels drawn, expected ${want.length}`)
}
console.log(`pixelPaths ok (${cases.length} cases)`)
