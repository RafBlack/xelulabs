import './OrcaMinigame.css'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { ORCA_GAME, ORCA_GAME_HEIGHT as HEIGHT, ORCA_GAME_WIDTH as WIDTH, ORCA_SURFACE_Y as SURFACE_Y, ORCA_FLOOR_Y as FLOOR_Y, ORCA_SCALE, ORCA_WIDTH as ORCA_W, ORCA_HEIGHT as ORCA_H, ORCA_X, ORCA_HIGH_SCORE_KEY as HI_KEY } from '../data/orcaGame'
import { SMALL_ORCA, SMALL_ORCA_TAIL } from '../data/orcaArt'

type Obstacle =
    | { kind: 'firewall'; x: number; gapY: number; gapH: number; width: number; passed: boolean }
    | { kind: 'mine'; x: number; baseY: number; phase: number; size: number; passed: boolean }

type Packet = { x: number; y: number; taken: boolean; shiny: boolean }
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string }
type Popup = { x: number; y: number; text: string; life: number; color: string }

function readHighScore() {
    try {
        const score = Number(window.localStorage.getItem(HI_KEY))
        return Number.isSafeInteger(score) && score > 0 ? score : 0
    } catch {
        return 0
    }
}

function saveHighScore(score: number) {
    try {
        window.localStorage.setItem(HI_KEY, String(score))
    } catch {
        return
    }
}

function createOrcaSprites() {
    return Array.from({ length: ORCA_GAME.spriteFrames }, (_, index) => {
        const sprite = document.createElement('canvas')
        sprite.width = ORCA_W + 1
        sprite.height = ORCA_H + ORCA_GAME.spritePadding * 2
        const ctx = sprite.getContext('2d')
        if (!ctx) return sprite
        const wag = (index / (ORCA_GAME.spriteFrames - 1) * 2 - 1) * ORCA_GAME.tailWagAmplitude
        SMALL_ORCA.rows.forEach((row, r) => {
            for (let c = 0; c < row.length; c++) {
                const key = row[c]
                if (key === '.') continue
                const dy = c < SMALL_ORCA_TAIL ? Math.round(wag * ((SMALL_ORCA_TAIL - c) / SMALL_ORCA_TAIL)) : 0
                const px = c * ORCA_SCALE
                const py = r * ORCA_SCALE + dy + ORCA_GAME.spritePadding
                ctx.fillStyle = '#2d7f86'
                ctx.fillRect(px + 1, py, ORCA_SCALE, ORCA_SCALE)
                ctx.fillStyle = SMALL_ORCA.palette[key] ?? '#f2f2ef'
                ctx.fillRect(px, py, ORCA_SCALE, ORCA_SCALE)
            }
        })
        return sprite
    })
}

function drawOrca(ctx: CanvasRenderingContext2D, sprites: HTMLCanvasElement[], x: number, y: number, vy: number, tick: number) {
    const angle = Math.max(-ORCA_GAME.maxTilt, Math.min(ORCA_GAME.maxTilt, vy * ORCA_GAME.tiltSpeed))
    ctx.save()
    ctx.translate(Math.round(x + ORCA_W / 2), Math.round(y + ORCA_H / 2))
    ctx.rotate(angle)
    ctx.translate(-Math.round(ORCA_W / 2), -Math.round(ORCA_H / 2))

    const index = Math.round((Math.sin(tick * ORCA_GAME.tailWagSpeed) + 1) / 2 * (sprites.length - 1))
    ctx.drawImage(sprites[index], 0, -ORCA_GAME.spritePadding)
    ctx.restore()
}

function OrcaMinigame({ onClose }: { onClose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const spritesRef = useRef<HTMLCanvasElement[] | null>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [phase, setPhase] = useState<'playing' | 'gameover'>('playing')
    const [score, setScore] = useState(0)
    const [hiScore, setHiScore] = useState(readHighScore)
    const [cause, setCause] = useState('')
    const [runId, setRunId] = useState(0)

    const inputRef = useRef({ up: false, boost: false })

    const restart = useCallback(() => {
        inputRef.current = { up: false, boost: false }
        setScore(0)
        setCause('')
        setPhase('playing')
        setRunId((n) => n + 1)
        canvasRef.current?.focus()
    }, [])

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        dialog.showModal()
        canvasRef.current?.focus()
        return () => dialog.close()
    }, [])

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        const release = () => {
            inputRef.current = { up: false, boost: false }
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.code !== 'Space' || event.altKey || event.ctrlKey || event.metaKey) return
            if (event.target instanceof HTMLElement && event.target.closest('button')) return
            event.preventDefault()
            if (event.repeat) return
            if (phase === 'gameover') {
                restart()
                return
            }
            if (!inputRef.current.up) inputRef.current.boost = true
            inputRef.current.up = true
        }
        const onKeyUp = (event: KeyboardEvent) => {
            if (event.code === 'Space') inputRef.current.up = false
        }
        dialog.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        window.addEventListener('blur', release)
        document.addEventListener('visibilitychange', release)
        return () => {
            dialog.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
            window.removeEventListener('blur', release)
            document.removeEventListener('visibilitychange', release)
        }
    }, [phase, restart])

    useEffect(() => {
        if (phase !== 'playing') return
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d', { alpha: false })
        if (!canvas || !ctx) return
        ctx.imageSmoothingEnabled = false
        ctx.font = 'bold 12px "JetBrains Mono", monospace'
        const sprites = spritesRef.current ?? createOrcaSprites()
        spritesRef.current = sprites

        let frame = 0
        let tick = 0
        let distanceScore = 0
        let bonusScore = 0
        let lastDisplayedScore = 0
        let orcaY = HEIGHT * ORCA_GAME.startHeight
        let orcaVy = 0
        let nextSpawn: number = ORCA_GAME.firstSpawnFrames
        let finished = false
        const obstacles: Obstacle[] = []
        const packets: Packet[] = []
        const particles: Particle[] = []
        const popups: Popup[] = []

        const finishGame = (reason: string, finalScore: number) => {
            setScore(finalScore)
            setCause(reason)
            finished = true
            const best = Math.max(readHighScore(), finalScore)
            saveHighScore(best)
            setHiScore(best)
            setPhase('gameover')
        }

        const step = () => {
            tick += 1
            const speed = Math.min(ORCA_GAME.maxSpeed, ORCA_GAME.startSpeed + tick * ORCA_GAME.acceleration)

            if (inputRef.current.boost) {
                orcaVy = Math.min(orcaVy, ORCA_GAME.boostThreshold) - ORCA_GAME.boostImpulse
                inputRef.current.boost = false
                for (let i = 0; i < 3; i++) {
                    particles.push({
                        x: ORCA_X + 6,
                        y: orcaY + ORCA_H * 0.5 + (Math.random() - 0.5) * 10,
                        vx: -speed * 0.6 - Math.random() * 1.5,
                        vy: (Math.random() - 0.5) * 1.6,
                        life: 18,
                        color: '#7fd3d8',
                    })
                }
            }

            orcaVy += inputRef.current.up ? -ORCA_GAME.lift : ORCA_GAME.gravity

            orcaVy = Math.max(-ORCA_GAME.maxVerticalSpeed, Math.min(ORCA_GAME.maxVerticalSpeed, orcaVy * ORCA_GAME.drag))
            orcaY += orcaVy

            if (orcaY < SURFACE_Y) {
                orcaY = SURFACE_Y
                orcaVy = Math.max(0, orcaVy * ORCA_GAME.boundaryBounce)
            } else if (orcaY + ORCA_H > FLOOR_Y) {
                orcaY = FLOOR_Y - ORCA_H
                orcaVy = Math.min(0, orcaVy * ORCA_GAME.boundaryBounce)
            }

            if (tick % ORCA_GAME.trailInterval === 0) {
                particles.push({
                    x: ORCA_X + 4,
                    y: orcaY + ORCA_H * 0.55 + (Math.random() - 0.5) * 8,
                    vx: -speed * 0.4,
                    vy: -0.25 + (Math.random() - 0.5) * 0.4,
                    life: 24,
                    color: tick % 8 === 0 ? '#cfe9ec' : '#2d7f86',
                })
            }

            nextSpawn -= 1
            if (nextSpawn <= 0) {
                const isFirewall = Math.random() < ORCA_GAME.firewallChance
                if (isFirewall) {
                    const gapH = Math.max(ORCA_GAME.minGap, ORCA_GAME.startGap - Math.floor(tick * ORCA_GAME.gapDifficulty))
                    const minGapY = SURFACE_Y + 24
                    const maxGapY = FLOOR_Y - 24 - gapH
                    const gapY = minGapY + Math.random() * Math.max(10, maxGapY - minGapY)
                    obstacles.push({
                        kind: 'firewall',
                        x: WIDTH + 20,
                        gapY,
                        gapH,
                        width: 22,
                        passed: false,
                    })
                    if (Math.random() < ORCA_GAME.firewallPacketChance) {
                        packets.push({
                            x: WIDTH + 31,
                            y: gapY + gapH * 0.5,
                            taken: false,
                            shiny: Math.random() < ORCA_GAME.shinyChance,
                        })
                    }
                    nextSpawn = Math.max(ORCA_GAME.firewallSpawnMinimum, Math.floor(ORCA_GAME.firewallSpawnFrames - speed * ORCA_GAME.firewallSpawnSpeedFactor))
                } else {
                    const size = 22
                    const baseY = SURFACE_Y + 26 + Math.random() * (FLOOR_Y - SURFACE_Y - 52)
                    obstacles.push({
                        kind: 'mine',
                        x: WIDTH + 20,
                        baseY,
                        phase: Math.random() * Math.PI * 2,
                        size,
                        passed: false,
                    })
                    if (Math.random() < ORCA_GAME.minePacketChance) {
                        const packetY = baseY > HEIGHT * 0.5 ? baseY - 54 : baseY + 54
                        packets.push({
                            x: WIDTH + 20,
                            y: Math.max(SURFACE_Y + 18, Math.min(FLOOR_Y - 18, packetY)),
                            taken: false,
                            shiny: Math.random() < ORCA_GAME.shinyChance,
                        })
                    }
                    nextSpawn = Math.max(ORCA_GAME.mineSpawnMinimum, Math.floor(ORCA_GAME.mineSpawnFrames - speed * ORCA_GAME.mineSpawnSpeedFactor))
                }
            }

            const hitX1 = ORCA_X + 10
            const hitY1 = orcaY + 6
            const hitX2 = ORCA_X + ORCA_W - 6
            const hitY2 = orcaY + ORCA_H - 6

            for (let i = obstacles.length - 1; i >= 0; i--) {
                const obs = obstacles[i]
                obs.x -= speed
                if (!obs.passed && obs.x + 20 < ORCA_X) {
                    obs.passed = true
                    bonusScore += ORCA_GAME.obstaclePoints
                }
                if (obs.kind === 'firewall') {
                    const ox1 = obs.x
                    const ox2 = obs.x + obs.width
                    if (hitX2 > ox1 && hitX1 < ox2) {
                        if (hitY1 < obs.gapY || hitY2 > obs.gapY + obs.gapH) {
                            finishGame('segfault: clipped firewall barrier', Math.floor(distanceScore) + bonusScore)
                            return
                        }
                    }
                } else {
                    const my = obs.baseY + Math.sin(tick * ORCA_GAME.mineBobSpeed + obs.phase) * ORCA_GAME.mineBobAmplitude
                    const half = obs.size * 0.5 - 3
                    if (hitX2 > obs.x - half && hitX1 < obs.x + half && hitY2 > my - half && hitY1 < my + half) {
                        finishGame('kernel panic: triggered sea-mine node', Math.floor(distanceScore) + bonusScore)
                        return
                    }
                }
                if (obs.x < -60) obstacles.splice(i, 1)
            }

            for (let i = packets.length - 1; i >= 0; i--) {
                const pkt = packets[i]
                pkt.x -= speed
                if (!pkt.taken) {
                    const intersects =
                        hitX2 > pkt.x - 10 &&
                        hitX1 < pkt.x + 10 &&
                        hitY2 > pkt.y - 10 &&
                        hitY1 < pkt.y + 10
                    if (intersects) {
                        pkt.taken = true
                        const pts = pkt.shiny ? ORCA_GAME.shinyPacketPoints : ORCA_GAME.packetPoints
                        bonusScore += pts
                        popups.push({
                            x: pkt.x,
                            y: pkt.y - 6,
                            text: `+${pts}`,
                            life: 28,
                            color: pkt.shiny ? '#f6e27a' : '#7fd3d8',
                        })
                        for (let p = 0; p < 8; p++) {
                            const ang = (Math.PI * 2 * p) / 8
                            particles.push({
                                x: pkt.x,
                                y: pkt.y,
                                vx: Math.cos(ang) * 2.2,
                                vy: Math.sin(ang) * 2.2,
                                life: 16,
                                color: pkt.shiny ? '#f6e27a' : '#7fd3d8',
                            })
                        }
                    }
                }
                if (pkt.taken || pkt.x < -30) packets.splice(i, 1)
            }

            distanceScore += speed * ORCA_GAME.distancePoints
            const currentTotal = Math.floor(distanceScore) + bonusScore
            if (currentTotal !== lastDisplayedScore && tick % ORCA_GAME.scoreUpdateInterval === 0) {
                lastDisplayedScore = currentTotal
                setScore(currentTotal)
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const pt = particles[i]
                pt.x += pt.vx
                pt.y += pt.vy
                pt.life -= 1
                if (pt.life <= 0) particles.splice(i, 1)
            }
            for (let i = popups.length - 1; i >= 0; i--) {
                const pop = popups[i]
                pop.y -= 0.7
                pop.life -= 1
                if (pop.life <= 0) popups.splice(i, 1)
            }
        }

        const render = () => {
            const speed = Math.min(ORCA_GAME.maxSpeed, ORCA_GAME.startSpeed + tick * ORCA_GAME.acceleration)

            ctx.fillStyle = '#0b0b0c'
            ctx.fillRect(0, 0, WIDTH, HEIGHT)

            const gridOffset = Math.floor(tick * speed * 0.5) % 28
            ctx.fillStyle = '#182428'
            for (let gx = -gridOffset; gx < WIDTH; gx += 28) {
                for (let gy = SURFACE_Y + 18; gy < FLOOR_Y; gy += 28) {
                    ctx.fillRect(gx, gy, 2, 2)
                }
            }

            ctx.fillStyle = '#2d7f86'
            for (let wx = 0; wx < WIDTH; wx += 8) {
                const wy = SURFACE_Y - 4 + Math.round(Math.sin((wx + tick * 2.5) * 0.06) * 2)
                ctx.fillRect(wx, wy, 6, 2)
            }

            ctx.fillStyle = '#16363b'
            ctx.fillRect(0, FLOOR_Y, WIDTH, HEIGHT - FLOOR_Y)
            ctx.fillStyle = '#2d7f86'
            for (let fx = -((tick * 2) % 16); fx < WIDTH; fx += 16) {
                ctx.fillRect(fx, FLOOR_Y, 10, 2)
            }

            for (const obs of obstacles) {
                if (obs.kind === 'firewall') {
                    const rx = Math.round(obs.x)
                    const topH = Math.max(0, Math.round(obs.gapY - SURFACE_Y))
                    const botY = Math.round(obs.gapY + obs.gapH)
                    const botH = Math.max(0, FLOOR_Y - botY)

                    ctx.fillStyle = '#4d1927'
                    ctx.fillRect(rx, SURFACE_Y, obs.width, topH)
                    ctx.fillRect(rx, botY, obs.width, botH)

                    ctx.fillStyle = '#8a2d45'
                    ctx.fillRect(rx + 2, SURFACE_Y, obs.width - 4, topH)
                    ctx.fillRect(rx + 2, botY, obs.width - 4, botH)

                    ctx.fillStyle = '#e06c88'
                    ctx.fillRect(rx, Math.round(obs.gapY) - 4, obs.width, 4)
                    ctx.fillRect(rx, botY, obs.width, 4)

                    for (let sy = SURFACE_Y + 6; sy < obs.gapY - 6; sy += 8) {
                        ctx.fillRect(rx + 5, sy, obs.width - 10, 2)
                    }
                    for (let sy = botY + 6; sy < FLOOR_Y - 4; sy += 8) {
                        ctx.fillRect(rx + 5, sy, obs.width - 10, 2)
                    }
                } else {
                    const mx = Math.round(obs.x)
                    const my = Math.round(obs.baseY + Math.sin(tick * ORCA_GAME.mineBobSpeed + obs.phase) * ORCA_GAME.mineBobAmplitude)
                    const r = Math.round(obs.size * 0.5)
                    ctx.fillStyle = '#f2f2ef'
                    ctx.fillRect(mx - r - 3, my - 2, (r + 3) * 2, 4)
                    ctx.fillRect(mx - 2, my - r - 3, 4, (r + 3) * 2)
                    ctx.fillStyle = '#8a2d45'
                    ctx.fillRect(mx - r + 2, my - r + 2, (r - 2) * 2, (r - 2) * 2)
                    ctx.fillStyle = tick % 16 < 8 ? '#f6e27a' : '#e06c88'
                    ctx.fillRect(mx - 3, my - 3, 6, 6)
                }
            }

            for (const pkt of packets) {
                const px = Math.round(pkt.x)
                const py = Math.round(pkt.y + Math.sin(tick * ORCA_GAME.packetBobSpeed + pkt.x * ORCA_GAME.packetBobOffset) * ORCA_GAME.packetBobAmplitude)
                const color = pkt.shiny ? '#f6e27a' : '#7fd3d8'
                ctx.fillStyle = color
                ctx.fillRect(px - 6, py - 4, 10, 8)
                ctx.fillRect(px + 4, py - 6, 4, 4)
                ctx.fillRect(px + 4, py + 2, 4, 4)
                ctx.fillStyle = '#0b0b0c'
                ctx.fillRect(px - 4, py - 2, 2, 2)
            }

            for (const pt of particles) {
                ctx.fillStyle = pt.color
                ctx.fillRect(Math.round(pt.x), Math.round(pt.y), 3, 3)
            }

            drawOrca(ctx, sprites, ORCA_X, orcaY, orcaVy, tick)

            for (const pop of popups) {
                ctx.fillStyle = pop.color
                ctx.fillText(pop.text, Math.round(pop.x - 10), Math.round(pop.y))
            }

        }

        let lastFrame = performance.now()
        let elapsed = 0
        const frameDuration = 1000 / ORCA_GAME.framesPerSecond
        const animate = (now: number) => {
            frame = 0
            if (document.hidden) return
            elapsed += Math.min(now - lastFrame, frameDuration * ORCA_GAME.maxCatchUpFrames)
            lastFrame = now
            let stepped = false
            while (elapsed >= frameDuration && !finished) {
                step()
                elapsed -= frameDuration
                stepped = true
            }
            if (stepped) render()
            if (!finished) frame = window.requestAnimationFrame(animate)
        }
        const onVisibilityChange = () => {
            window.cancelAnimationFrame(frame)
            frame = 0
            elapsed = 0
            lastFrame = performance.now()
            if (!document.hidden && !finished) frame = window.requestAnimationFrame(animate)
        }

        render()
        if (!document.hidden) frame = window.requestAnimationFrame(animate)
        document.addEventListener('visibilitychange', onVisibilityChange)
        return () => {
            window.cancelAnimationFrame(frame)
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [phase, runId])

    return createPortal(
        <dialog
            ref={dialogRef}
            className="orca-game-backdrop"
            style={{ '--orca-game-enter-duration': `${ORCA_GAME.enterDuration}s` } as CSSProperties}
            aria-label="Xelu Orca Runner Minigame"
            aria-describedby="orca-game-instructions"
            onMouseMove={(event) => event.stopPropagation()}
            onCancel={(event) => {
                event.preventDefault()
                onClose()
            }}
            onClick={(e) => {
                e.stopPropagation()
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div className="orca-game-modal" onClick={(e) => e.stopPropagation()}>
                <div className="orca-game-bar">
                    <div className="orca-game-title">
                        <span className="orca-game-prompt">$</span> ./xelu-runner --deep-sea
                    </div>
                    <div className="orca-game-stats">
                        <span className="orca-game-hi">HI: {String(hiScore).padStart(4, '0')}</span>
                        <span className="orca-game-score">SCORE: {String(score).padStart(4, '0')}</span>
                        <button type="button" className="orca-game-close" onClick={onClose} aria-label="Close minigame">
                            [ESC]
                        </button>
                    </div>
                </div>

                <div
                    className="orca-game-stage"
                    onPointerDown={(event) => {
                        if (phase === 'gameover' || event.button !== 0 || event.target !== canvasRef.current) return
                        canvasRef.current?.focus()
                        event.currentTarget.setPointerCapture(event.pointerId)
                        if (!inputRef.current.up) inputRef.current.boost = true
                        inputRef.current.up = true
                    }}
                    onPointerUp={() => {
                        inputRef.current.up = false
                    }}
                    onPointerCancel={() => {
                        inputRef.current.up = false
                    }}
                    onPointerLeave={() => {
                        inputRef.current.up = false
                    }}
                >
                    <canvas ref={canvasRef} className="orca-game-canvas" width={WIDTH} height={HEIGHT} tabIndex={0} aria-label="Orca runner playfield" aria-describedby="orca-game-instructions" />

                    {phase === 'gameover' && (
                        <div className="orca-game-overlay">
                            <p className="orca-game-heading">CONNECTION TERMINATED</p>
                            <p className="orca-game-sub">{cause || 'process exited'} — final score: {score}</p>
                            {score >= ORCA_GAME.flagScore ? (
                                <p className="orca-game-flag">flag&#123;x3lu_d33p_s34_r3fl3x&#125;</p>
                            ) : (
                                <p className="orca-game-sub">Reach {ORCA_GAME.flagScore} pts to decrypt the hidden flag.</p>
                            )}
                            <div className="orca-game-actions">
                                <button type="button" className="orca-game-btn" onClick={restart}>
                                    Play Again [Space]
                                </button>
                                <button type="button" className="orca-game-btn orca-game-btn-alt" onClick={onClose}>
                                    Exit
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="orca-game-footer" id="orca-game-instructions">
                    <span>Hold Space or touch to swim up. Release to sink.</span>
                    <span>Collect fish (+{ORCA_GAME.packetPoints}) · Dodge firewalls &amp; mines</span>
                </div>
            </div>
        </dialog>,
        document.body,
    )
}

export default memo(OrcaMinigame)
