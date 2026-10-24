import type { Pixels } from '../data/orcaArt'

type Props = { art: Pixels; from?: number; to?: number; fill?: string; dx?: number }

function PixelRects({ art, from = 0, to = Infinity, fill, dx = 0 }: Props) {
    return art.rows.flatMap((row, y) =>
        [...row].map((key, x) => {
            const color = art.palette[key]
            if (!color || x < from || x >= to) return null
            return <rect key={`${x}-${y}`} x={x + dx} y={y} width={1} height={1} fill={fill ?? color} />
        }),
    )
}

export default PixelRects
