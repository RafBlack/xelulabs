import { SMALL_ORCA } from './orcaArt'

export const ORCA_GAME_WIDTH = 640
export const ORCA_GAME_HEIGHT = 320
export const ORCA_SURFACE_Y = 26
export const ORCA_FLOOR_Y = ORCA_GAME_HEIGHT - 18
export const ORCA_SCALE = 3
export const ORCA_WIDTH = SMALL_ORCA.rows[0].length * ORCA_SCALE
export const ORCA_HEIGHT = SMALL_ORCA.rows.length * ORCA_SCALE
export const ORCA_X = 84
export const ORCA_HIGH_SCORE_KEY = 'xelulabs_orca_hi'

export const ORCA_GAME = {
    framesPerSecond: 60,
    maxCatchUpFrames: 5,
    enterDuration: 0.2,
    startHeight: 0.45,
    firstSpawnFrames: 75,
    startSpeed: 3.2,
    maxSpeed: 6.4,
    acceleration: 0.0014,
    boostThreshold: -2.6,
    boostImpulse: 1.5,
    lift: 0.46,
    gravity: 0.24,
    maxVerticalSpeed: 5.2,
    drag: 0.94,
    boundaryBounce: 0.3,
    tailWagSpeed: 0.28,
    tailWagAmplitude: 1.5,
    maxTilt: 0.38,
    tiltSpeed: 0.06,
    trailInterval: 4,
    scoreUpdateInterval: 6,
    spriteFrames: 7,
    spritePadding: 2,
    firewallChance: 0.55,
    startGap: 112,
    minGap: 84,
    gapDifficulty: 0.012,
    firewallSpawnMinimum: 58,
    firewallSpawnFrames: 96,
    firewallSpawnSpeedFactor: 5,
    mineSpawnMinimum: 44,
    mineSpawnFrames: 76,
    mineSpawnSpeedFactor: 4,
    mineBobSpeed: 0.07,
    mineBobAmplitude: 18,
    packetBobSpeed: 0.12,
    packetBobOffset: 0.05,
    packetBobAmplitude: 3,
    firewallPacketChance: 0.75,
    minePacketChance: 0.65,
    shinyChance: 0.2,
    obstaclePoints: 10,
    packetPoints: 25,
    shinyPacketPoints: 50,
    distancePoints: 0.08,
    flagScore: 250,
} as const
