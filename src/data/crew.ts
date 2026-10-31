export interface CrewMember {
    handle: string
    role: string
    bio?: string
    tags: string[]
    joinHash: string
    status: 'active' | 'afk'
}

export const CREW_MEMBERS: CrewMember[] = [
    {
        handle: 'cyu',
        role: 'member @ xelulabs',
        tags: ['ctf', 'dev', 'fullstack', 'red team', 'AI'],
        joinHash: '7c4e1a2',
        status: 'active',
    },
    {
        handle: 'p0ch174',
        role: 'member @ xelulabs',
        tags: ['OSINT', 'Red team', 'Blue Team', 'AI'],
        joinHash: '3d9b0f7',
        status: 'active',
    },
    {
        handle: 'Ater',
        role: 'member @ xelulabs',
        tags: ['GRC', 'IAM', 'OSINT', 'Red Team', 'Blue Team'],
        joinHash: 'a1f3c2e',
        status: 'active',
    },
    {
        handle: 'eun',
        role: 'member @ xelulabs',
        tags: ['CTF', 'OSINT', 'GRC', 'Design'],
        joinHash: 'e5b2d90',
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
    bodyDriftDuration: 12,
    bodyWigDuration: 0.34,
} as const
