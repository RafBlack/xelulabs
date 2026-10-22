export const LOGO_VIEWBOX = '460 260 1140 1000'

export const LOGO_PATHS = [
    {
        id: 'main',
        cls: '',
        d: 'M1328,415 C1240,610 1100,900 950,1150 C930,1188 898,1212 868,1160 C760,980 650,800 552,662 C522,615 556,612 600,628 C780,680 960,770 1475,1035',
    },
    { id: 'a', cls: 'logo-a', d: 'M855,325 C900,452 935,522 980,580' },
    { id: 'b', cls: 'logo-b', d: 'M1505,490 C1462,620 1430,690 1380,760' },
]

export const EXTRUSION = [
    { dx: 15, dy: 21, color: '#141517' },
    { dx: 12, dy: 17, color: '#1d1e21' },
    { dx: 9, dy: 13, color: '#27282c' },
    { dx: 6, dy: 9, color: '#34363a' },
    { dx: 3, dy: 4, color: '#4a4c51' },
]

export const GHOSTS = [
    { cls: 'logo-rgb1', dx: -7, color: '#ff3b6b' },
    { cls: 'logo-rgb2', dx: 7, color: '#33e1ff' },
]

export const GLOSS_STOPS: [number, string][] = [
    [0, '#ffffff'],
    [0.3, '#d6d8dc'],
    [0.55, '#7d8087'],
    [0.75, '#f4f4f2'],
    [1, '#9a9da3'],
]

export const BRISTLES = [
    { lag: 'logo-lag1', dx: 14, dy: -9, width: 12, opacity: 0.55 },
    { lag: 'logo-lag2', dx: -13, dy: 10, width: 9, opacity: 0.45 },
    { lag: 'logo-lag3', dx: 22, dy: 6, width: 5, opacity: 0.3 },
]
