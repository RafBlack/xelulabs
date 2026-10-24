export const WIPE_DURATION = 1700
export const WIPE_COVER_START = 0.38
export const WIPE_COVER_END = 0.62

export const WIPE_EDGE = [] as { x: number; y: number; w: number; h: number; c: string }[]
for (let r = 0; r < 38; r++) {
    const y = r * 24
    const w = 36 + ((r * 37) % 5) * 16
    WIPE_EDGE.push({ x: 0, y, w, h: 24, c: '#10292e' })
    WIPE_EDGE.push({ x: w, y, w: 16, h: 24, c: '#1b4a52' })
    WIPE_EDGE.push({ x: w + 16, y, w: 8, h: 24, c: '#7fd3d8' })
    if (r % 3 === 0) WIPE_EDGE.push({ x: w + 36, y: y + 6, w: 10, h: 10, c: '#cfe9ec' })
    if (r % 5 === 2) WIPE_EDGE.push({ x: w + 56, y: y + 4, w: 6, h: 6, c: '#cfe9ec' })
}
