import { memo } from 'react'
import type { Pixels } from '../data/orcaArt'
import { pixelPaths } from './pixelPaths'

type Props = { art: Pixels; from?: number; to?: number; fill?: string; dx?: number }

function PixelRects({ art, from, to, fill, dx }: Props) {
    return [...pixelPaths(art, from, to, fill, dx)].map(([color, d]) => <path key={color} d={d} fill={color} />)
}

export default memo(PixelRects)
