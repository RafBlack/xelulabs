import type { Pixels } from '../data/orcaArt'

export function pixelPaths(art: Pixels, from = 0, to = Infinity, fill?: string, dx = 0) {
    const paths = new Map<string, string>()
    art.rows.forEach((row, y) => {
        let x = Math.max(0, from)
        while (x < row.length && x < to) {
            const color = art.palette[row[x]]
            if (!color) {
                x++
                continue
            }
            let end = x + 1
            while (end < row.length && end < to && (fill ? art.palette[row[end]] : art.palette[row[end]] === color)) end++
            const key = fill ?? color
            paths.set(key, `${paths.get(key) ?? ''}M${x + dx} ${y}h${end - x}v1h${x - end}z`)
            x = end
        }
    })
    return paths
}
