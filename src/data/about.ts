export const ABOUT_INTRO = 'xelulabs is a passion-driven cybersecurity organization from the Philippines. We learn by doing: building projects, competing in CTFs, and growing a community that shares what it knows.'

export const ABOUT_NEOFETCH = [
    { key: 'xelu', value: '@xelulabs', color: '#7fd3d8' },
    { key: '-------------', value: '', color: '#4a4a52' },
    { key: 'org: ', value: 'xelulabs', color: '#7fd3d8' },
    { key: 'est: ', value: '2026', color: '#7fd3d8' },
    { key: 'base: ', value: 'philippines', color: '#7fd3d8' },
    { key: 'focus: ', value: 'projects, ctf, community', color: '#7fd3d8' },
    { key: 'mascot: ', value: 'xelu (orca)', color: '#7fd3d8' },
    { key: 'status: ', value: 'recruiting', color: '#7fd3d8' },
]

export const ABOUT_SWATCHES = ['#0c0c0d', '#8a2d45', '#2d7f86', '#7fd3d8', '#c9a85b', '#4a4a52', '#b8b8bc', '#f2f2ef']

export const ABOUT_PILLARS = [
    { dir: 'projects/', text: 'Tools, labs and writeups we build together, from recon scripts to full web apps.', files: 'tools/  labs/  writeups/' },
    { dir: 'ctf/', text: 'We compete as a team, learn the tricks the hard way, and share how we solved it.', files: 'web/  crypto/  forensics/  pwn/' },
    { dir: 'community/', text: 'Events, talks and a space where no question is too basic to ask.', files: 'events/  talks/  members/' },
]

export const ABOUT_COMMITS = [
    { hash: 'a1f3c2e', message: 'init: xelulabs founded', when: '2026, PHILIPPINES', dot: '#7fd3d8' },
    { hash: '3d9b0f7', message: 'feat: first crew assembled', when: '2026', dot: '#4a4a52' },
    { hash: '7e21c4a', message: 'wip: first ctf and first project', when: 'IN PROGRESS', dot: '#4a4a52' },
    { hash: 'HEAD', message: 'you, maybe?', when: 'NEXT', dot: '#f2f2ef' },
]

export const ABOUT_CHECKS = [
    { tag: '[ ok ]', text: 'curiosity detected', color: '#7fd3d8' },
    { tag: '[ ok ]', text: 'willing to learn', color: '#7fd3d8' },
    { tag: '[ ok ]', text: 'likes breaking things, responsibly', color: '#7fd3d8' },
    { tag: '[ ok ]', text: 'beginner friendly', color: '#7fd3d8' },
    { tag: '[ .. ]', text: 'waiting for you', color: '#c9a85b' },
]

export const ABOUT_MARQUEE = 'WEB / CRYPTO / FORENSICS / PWN / OSINT / REVERSING / MISC / '
export const ABOUT_BACKGROUND_WORDS = {
    hero: 'WHO WE ARE',
    join: 'JOIN US!',
} as const
export const ABOUT_SECTIONS = [
    { id: 'who-we-are', label: 'WHO WE ARE' },
    { id: 'what-we-do', label: 'WHAT WE DO' },
    { id: 'our-story', label: 'OUR STORY' },
    { id: 'join', label: 'JOIN' },
]

export const ABOUT_TIMING = {
    fade: 0.7,
    heroEyebrow: 0.2,
    heroFirstLetter: 0.35,
    heroSecondLine: 0.9,
    letterStep: 0.09,
    letterDuration: 0.55,
    heroCommand: 1.2,
    introStart: 1.5,
    introStep: 0.012,
    terminal: 0.6,
    body: 1,
    head: 1.1,
    neoStart: 1.2,
    neoStep: 0.16,
    swatches: 2.5,
    sectionCommand: 0.05,
    sectionTitle: 0.15,
    sectionDescription: 0.25,
    pillarStart: 0.3,
    pillarStep: 0.18,
    timeline: 0.2,
    commitStart: 0.35,
    commitStep: 0.5,
    joinTitle: 0.25,
    joinActions: 0.45,
    joinWindow: 0.5,
    checkStart: 0.8,
    checkStep: 0.3,
    terminalLineDuration: 0.25,
    cardFishDuration: 1.4,
    marqueeDuration: 40,
    bodyDriftDuration: 12,
    bodyWigDuration: 0.34,
    diveDuration: 2.4,
    lineDuration: 1.6,
    riseDuration: 1.4,
    bobDuration: 4.5,
    hintDuration: 1.2,
    caretBlinkDuration: 1,
    charRevealDuration: 0.01,
    dotTransitionDuration: 0.25,
    scrollLockDuration: 1400,
    wheelGestureGap: 180,
    wheelMinimumDelta: 5,
} as const
