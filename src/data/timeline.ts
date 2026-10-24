export const LOOP_MS = 11000

export const LOGO_HITS = [
    { at: 1980, x: 1822, y: 776 },
    { at: 2750, x: 1397, y: 385 },
    { at: 3300, x: 1741, y: 540 },
]

// Same stroke ends mapped onto the portrait logo box (left -20, top 420, width 440 vs 950, 110, 980)
const PORTRAIT_K = 440 / 980
export const LOGO_HITS_PORTRAIT = LOGO_HITS.map((h) => ({
    at: h.at,
    x: -20 + (h.x - 950) * PORTRAIT_K,
    y: 420 + (h.y - 110) * PORTRAIT_K,
}))

export const RIPPLE = { speed: 1.1, max: 1000, band: 30, strength: 0.45 }

export const INTRO = {
    landed: 860,
    splashDone: 1700,
    letters: 4,
    letterStep: 200,
    mouthOpen: 950,
    spawn: 990,
    mouthClose: 1110,
    smile: 2250,
    leap: 3700,
    gone: 4900,
}
