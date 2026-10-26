export interface CrewMember {
    handle: string
    role: string
    bio: string
    tags: string[]
    joinHash: string
    status: 'active' | 'afk'
}

export const CREW_MEMBERS: CrewMember[] = [
    {
        handle: 'RafBlack',
        role: 'Founder / Lead',
        bio: 'Started xelulabs from a dorm room and a dream about breaking things. Full-stack dev by day, CTF addict by night.',
        tags: ['web', 'pwn', 'fullstack'],
        joinHash: 'a1f3c2e',
        status: 'active',
    },
    {
        handle: 'p0ch174',
        role: 'Core / Frontend',
        bio: 'Pixel-perfect interfaces and clean commits. Turns Figma dreams into CSS reality.',
        tags: ['frontend', 'design', 'web'],
        joinHash: '3d9b0f7',
        status: 'active',
    },
    {
        handle: 'dcyuq',
        role: 'Core / Responsiveness',
        bio: 'If it doesn\'t look right on a 320px screen, it\'s not done. Mobile-first evangelist.',
        tags: ['css', 'responsive', 'a11y'],
        joinHash: '7c4e1a2',
        status: 'active',
    },
    {
        handle: '???',
        role: 'Next Recruit',
        bio: 'This could be you. We\'re always looking for curious minds who like breaking and building.',
        tags: ['you?', '???'],
        joinHash: 'HEAD',
        status: 'afk',
    },
]

export const CREW_STATS = [
    { key: 'members:', value: `${CREW_MEMBERS.length - 1}`, color: '#7fd3d8' },
    { key: 'status:', value: 'recruiting', color: '#c9a85b' },
    { key: 'base:', value: 'philippines', color: '#7fd3d8' },
    { key: 'focus:', value: 'cybersec / dev', color: '#7fd3d8' },
    { key: 'vibe:', value: '100%', color: '#7fd3d8' },
]

export const CREW_TIMING = {
    fade: 0.7,
    eyebrow: 0.15,
    titleFirstLine: 0.25,
    titleSecondLine: 0.55,
    letterStep: 0.08,
    letterDuration: 0.5,
    description: 0.4,
    statsWindow: 0.5,
    statStart: 0.7,
    statStep: 0.15,
    gridTitle: 0.2,
    cardStart: 0.25,
    cardStep: 0.12,
    cardFishDuration: 1.4,
    ctaDelay: 0.35,
    scrollHintDelay: 1.8,
    hintDuration: 1.2,
    bobDuration: 4.5,
} as const
