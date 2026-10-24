export const RIPPLE = { speed: 1.1, max: 1000, band: 30, strength: 0.45 }

export const SWIM = { start: 300, duration: 1900, drop: 450 }

export const SPLASH_END = 5500

export const TYPE = { cmdStart: 1800, cmdDuration: 800, descStart: 2700, charMs: 25 }

export const REACTION_DURATIONS = {
    swim: '6.5s',
    breach: '2.7s',
    chase: '5.2s',
    spout: '1.2s',
    dive: '1.6s',
    glitch: '0.6s',
    tilt: '1.4s',
    talk: '1s',
    hack: '0.8s',
    shiny: '1.2s',
} as const

export const REACTION_HOLDS = {
    swim: 6600,
    breach: 2800,
    chase: 5300,
    spout: 2400,
    dive: 2400,
    glitch: 2400,
    tilt: 2400,
    talk: 2400,
    hack: 3400,
    shiny: 3000,
} as const

export const HACK_WINDOW = 1800

export const SWIM_PATH = [
    { x: 1206, y: 944, rotate: 40, flip: -1 },
    { x: 1106, y: 704, rotate: 34, flip: -1 },
    { x: 756, y: 654, rotate: 0, flip: -1 },
    { x: 409, y: 687, rotate: -3, flip: -1 },
    { x: 12, y: 490, rotate: 40, flip: 1 },
    { x: 106, y: 314, rotate: -31, flip: 1 },
    { x: 756, y: 218, rotate: 0, flip: 1 },
    { x: 1106, y: 312, rotate: 40, flip: 1 },
    { x: 1205, y: 585, rotate: -40, flip: -1 },
    { x: 1176, y: 944, rotate: -40, flip: -1 },
] as const

export const BREACH_PATH = [
    { x: 916, y: 944, rotate: 75, flip: -1 },
    { x: 808, y: 432, rotate: 70, flip: -1 },
    { x: 736, y: 334, rotate: 0, flip: -1 },
    { x: 664, y: 432, rotate: -70, flip: -1 },
    { x: 556, y: 944, rotate: -75, flip: -1 },
] as const
