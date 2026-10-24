export const RIPPLE = { speed: 1.1, max: 1000, band: 30, strength: 0.45 }

export const SWIM = { start: 300, duration: 1900, drop: 450 }

export const SPLASH_END = 5500

export const TYPE = { cmdStart: 1800, cmdDuration: 800, descStart: 2700, charMs: 25 }

export const REACTION_DURATIONS = {
    swim: '6.5s',
    breach: '2.7s',
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
    spout: 2400,
    dive: 2400,
    glitch: 2400,
    tilt: 2400,
    talk: 2400,
    hack: 3400,
    shiny: 3000,
} as const

export const HACK_WINDOW = 1800

export const REACTION_WEIGHTS = {
    talk: 30,
    tilt: 15,
    spout: 15,
    glitch: 15,
    dive: 10,
    swim: 8,
    breach: 7,
} as const

export type RandomReaction = keyof typeof REACTION_WEIGHTS

export function pickReaction(last: RandomReaction | null, withoutBubble: number, random = Math.random): RandomReaction {
    const body = last === 'swim' || last === 'breach'
    const pool = (Object.keys(REACTION_WEIGHTS) as RandomReaction[]).filter((reaction) =>
        reaction !== last &&
        (!body || (reaction !== 'swim' && reaction !== 'breach')) &&
        (withoutBubble < 2 || reaction === 'talk' || reaction === 'tilt'),
    )
    const total = pool.reduce((sum, reaction) => sum + REACTION_WEIGHTS[reaction], 0)
    let choice = random() * total
    for (const reaction of pool) {
        choice -= REACTION_WEIGHTS[reaction]
        if (choice < 0) return reaction
    }
    return pool[pool.length - 1]
}

export const SWIM_PATH = [
    { at: 0, x: 1206, y: 944, rotate: 40, flip: -1 },
    { at: 0.62, x: 1200, y: 924, rotate: 40, flip: -1 },
    { at: 1.47, x: 1194, y: 896, rotate: 40, flip: -1 },
    { at: 2.48, x: 1187, y: 863, rotate: 40, flip: -1 },
    { at: 3.59, x: 1178, y: 827, rotate: 40, flip: -1 },
    { at: 4.73, x: 1166, y: 791, rotate: 40, flip: -1 },
    { at: 5.85, x: 1151, y: 756, rotate: 40, flip: -1 },
    { at: 6.92, x: 1131, y: 727, rotate: 40, flip: -1 },
    { at: 7.92, x: 1106, y: 704, rotate: 34.3, flip: -1 },
    { at: 8.97, x: 1075, y: 688, rotate: 22.3, flip: -1 },
    { at: 10.11, x: 1038, y: 676, rotate: 14.7, flip: -1 },
    { at: 11.36, x: 997, y: 668, rotate: 9.4, flip: -1 },
    { at: 12.7, x: 953, y: 662, rotate: 5.8, flip: -1 },
    { at: 14.11, x: 906, y: 659, rotate: 3.4, flip: -1 },
    { at: 15.58, x: 856, y: 656, rotate: 2, flip: -1 },
    { at: 17.08, x: 806, y: 655, rotate: 1.4, flip: -1 },
    { at: 18.58, x: 756, y: 654, rotate: 0, flip: -1 },
    { at: 20.15, x: 703, y: 655, rotate: -3.1, flip: -1 },
    { at: 21.85, x: 647, y: 660, rotate: -5.8, flip: -1 },
    { at: 23.63, x: 587, y: 667, rotate: -7, flip: -1 },
    { at: 25.45, x: 527, y: 675, rotate: -7, flip: -1 },
    { at: 27.25, x: 467, y: 682, rotate: -5.8, flip: -1 },
    { at: 28.98, x: 409, y: 687, rotate: -3.1, flip: -1 },
    { at: 30.6, x: 355, y: 688, rotate: 1.4, flip: -1 },
    { at: 32.06, x: 306, y: 684, rotate: 7.6, flip: -1 },
    { at: 33.44, x: 260, y: 675, rotate: 13, flip: -1 },
    { at: 34.83, x: 216, y: 663, rotate: 17.3, flip: -1 },
    { at: 36.18, x: 173, y: 648, rotate: 21.6, flip: -1 },
    { at: 37.48, x: 133, y: 630, rotate: 26.3, flip: -1 },
    { at: 38.7, x: 97, y: 611, rotate: 31.7, flip: -1 },
    { at: 39.81, x: 67, y: 589, rotate: 38.6, flip: -1 },
    { at: 40.79, x: 43, y: 567, rotate: 40, flip: -1 },
    { at: 41.63, x: 26, y: 544, rotate: 40, flip: -1 },
    { at: 42.45, x: 16, y: 519, rotate: 40, flip: -1 },
    { at: 43.32, x: 12, y: 490, rotate: 40, flip: -1 },
    { at: 44.26, x: 13, y: 458, rotate: -40, flip: 1 },
    { at: 45.24, x: 20, y: 426, rotate: -40, flip: 1 },
    { at: 46.27, x: 33, y: 394, rotate: -40, flip: 1 },
    { at: 47.32, x: 52, y: 364, rotate: -40, flip: 1 },
    { at: 48.41, x: 76, y: 337, rotate: -40, flip: 1 },
    { at: 49.53, x: 106, y: 314, rotate: -31.1, flip: 1 },
    { at: 50.81, x: 145, y: 295, rotate: -22.1, flip: 1 },
    { at: 52.32, x: 192, y: 279, rotate: -16.5, flip: 1 },
    { at: 54.02, x: 248, y: 265, rotate: -12.7, flip: 1 },
    { at: 55.85, x: 308, y: 253, rotate: -10.1, flip: 1 },
    { at: 57.76, x: 371, y: 243, rotate: -8.1, flip: 1 },
    { at: 59.68, x: 435, y: 235, rotate: -6.4, flip: 1 },
    { at: 61.55, x: 497, y: 229, rotate: -5.1, flip: 1 },
    { at: 63.31, x: 556, y: 224, rotate: -3.8, flip: 1 },
    { at: 65.04, x: 614, y: 221, rotate: -2.6, flip: 1 },
    { at: 66.85, x: 675, y: 219, rotate: -1.2, flip: 1 },
    { at: 68.69, x: 736, y: 218, rotate: 0.5, flip: 1 },
    { at: 70.51, x: 797, y: 220, rotate: 2.6, flip: 1 },
    { at: 72.27, x: 856, y: 224, rotate: 5.3, flip: 1 },
    { at: 73.94, x: 912, y: 230, rotate: 9, flip: 1 },
    { at: 75.48, x: 962, y: 240, rotate: 14.1, flip: 1 },
    { at: 76.84, x: 1006, y: 254, rotate: 20.4, flip: 1 },
    { at: 78.07, x: 1044, y: 271, rotate: 26.8, flip: 1 },
    { at: 79.21, x: 1077, y: 290, rotate: 33.5, flip: 1 },
    { at: 80.29, x: 1106, y: 312, rotate: 40, flip: 1 },
    { at: 81.34, x: 1130, y: 336, rotate: 40, flip: 1 },
    { at: 82.39, x: 1152, y: 365, rotate: 40, flip: 1 },
    { at: 83.49, x: 1169, y: 397, rotate: 40, flip: 1 },
    { at: 84.66, x: 1184, y: 433, rotate: 40, flip: 1 },
    { at: 85.92, x: 1196, y: 474, rotate: 40, flip: 1 },
    { at: 87.43, x: 1203, y: 524, rotate: 40, flip: 1 },
    { at: 89.25, x: 1205, y: 585, rotate: -40, flip: -1 },
    { at: 91.27, x: 1203, y: 653, rotate: -40, flip: -1 },
    { at: 93.37, x: 1198, y: 723, rotate: -40, flip: -1 },
    { at: 95.42, x: 1191, y: 791, rotate: -40, flip: -1 },
    { at: 97.29, x: 1185, y: 854, rotate: -40, flip: -1 },
    { at: 98.86, x: 1179, y: 906, rotate: -40, flip: -1 },
    { at: 100, x: 1176, y: 944, rotate: -40, flip: -1 },
] as const

export const BREACH_PATH = [
    { at: 0, x: 916, y: 944, rotate: 75, flip: -1 },
    { at: 4.62, x: 907, y: 885, rotate: 75, flip: -1 },
    { at: 9.01, x: 898, y: 828, rotate: 75, flip: -1 },
    { at: 13.16, x: 889, y: 775, rotate: 75, flip: -1 },
    { at: 17.09, x: 880, y: 724, rotate: 75, flip: -1 },
    { at: 20.78, x: 871, y: 677, rotate: 75, flip: -1 },
    { at: 24.25, x: 862, y: 633, rotate: 75, flip: -1 },
    { at: 27.48, x: 853, y: 592, rotate: 75, flip: -1 },
    { at: 30.49, x: 844, y: 554, rotate: 75, flip: -1 },
    { at: 33.27, x: 835, y: 519, rotate: 75, flip: -1 },
    { at: 35.83, x: 826, y: 486, rotate: 73.6, flip: -1 },
    { at: 38.16, x: 817, y: 458, rotate: 71.8, flip: -1 },
    { at: 40.26, x: 808, y: 432, rotate: 69.8, flip: -1 },
    { at: 42.15, x: 799, y: 409, rotate: 67.1, flip: -1 },
    { at: 43.82, x: 790, y: 389, rotate: 63.8, flip: -1 },
    { at: 45.29, x: 781, y: 372, rotate: 59.5, flip: -1 },
    { at: 46.55, x: 772, y: 358, rotate: 53.6, flip: -1 },
    { at: 47.62, x: 763, y: 348, rotate: 45.5, flip: -1 },
    { at: 48.52, x: 754, y: 340, rotate: 34.1, flip: -1 },
    { at: 49.3, x: 745, y: 336, rotate: 18.7, flip: -1 },
    { at: 50, x: 736, y: 334, rotate: 0, flip: -1 },
    { at: 50.7, x: 727, y: 336, rotate: -18.7, flip: -1 },
    { at: 51.48, x: 718, y: 340, rotate: -34.1, flip: -1 },
    { at: 52.38, x: 709, y: 348, rotate: -45.5, flip: -1 },
    { at: 53.45, x: 700, y: 358, rotate: -53.6, flip: -1 },
    { at: 54.71, x: 691, y: 372, rotate: -59.5, flip: -1 },
    { at: 56.18, x: 682, y: 389, rotate: -63.8, flip: -1 },
    { at: 57.85, x: 673, y: 409, rotate: -67.1, flip: -1 },
    { at: 59.74, x: 664, y: 432, rotate: -69.8, flip: -1 },
    { at: 61.84, x: 655, y: 458, rotate: -71.8, flip: -1 },
    { at: 64.17, x: 646, y: 486, rotate: -73.6, flip: -1 },
    { at: 66.73, x: 637, y: 519, rotate: -75, flip: -1 },
    { at: 69.51, x: 628, y: 554, rotate: -75, flip: -1 },
    { at: 72.52, x: 619, y: 592, rotate: -75, flip: -1 },
    { at: 75.75, x: 610, y: 633, rotate: -75, flip: -1 },
    { at: 79.22, x: 601, y: 677, rotate: -75, flip: -1 },
    { at: 82.91, x: 592, y: 724, rotate: -75, flip: -1 },
    { at: 86.84, x: 583, y: 775, rotate: -75, flip: -1 },
    { at: 90.99, x: 574, y: 828, rotate: -75, flip: -1 },
    { at: 95.38, x: 565, y: 885, rotate: -75, flip: -1 },
    { at: 100, x: 556, y: 944, rotate: -75, flip: -1 },
] as const
