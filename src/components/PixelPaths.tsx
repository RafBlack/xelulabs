import type { Pixels } from '../data/orcaArt'

type Props = { art: Pixels; from?: number; to?: number; fill?: string }

function PixelPaths({ art, from = 0, to = Infinity, fill }: Props) {
    const paths: Record<string, string> = {}
    art.rows.forEach((row, y) =>
        [...row].forEach((key, x) => {
            const color = art.palette[key]
            if (!color || x < from || x >= to) return
            const c = fill ?? color
            paths[c] = `${paths[c] ?? ''}M${x} ${y}h1v1h-1z`
        }),
    )
    return Object.entries(paths).map(([c, d]) => <path key={c} fill={c} d={d} />)
}

export default PixelPaths
