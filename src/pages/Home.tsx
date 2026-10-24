import './Home.css'
import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import HeroTitle from '../components/HeroTitle'
import Terminal from '../components/Terminal'
import DotGrid from '../components/DotGrid'
import BigOrca from '../components/BigOrca'
import { toStage, useMousePosition } from '../hooks/useMousePosition'
import { useRipples } from '../hooks/useRipples'
import { useCutouts } from '../hooks/useCutouts'

function Home() {
    const [play] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches)
    const { stageRef, heroRef, holes } = useCutouts()
    const { pos, onMouseMove, onMouseLeave } = useMousePosition()
    const { waves, addRipple } = useRipples()

    const burst = (e: MouseEvent<HTMLDivElement>) => {
        const p = toStage(e)
        addRipple(p.x, p.y)
    }

    return (
        <div
            ref={stageRef}
            className={`stage stage-home${play ? ' intro' : ''}`}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={burst}
        >
            <DotGrid pos={pos} waves={waves} holes={holes} />
            <Header />
            <main ref={heroRef} className="hero container">
                <p className="hero-eyebrow">
                    <span aria-hidden="true" />
                    Projects / CTF / Community
                </p>
                <HeroTitle play={play} />
                <Terminal />
                <div className="hero-actions">
                    <Link className="btn btn-fill" to="/contact">
                        Join XeluLabs
                    </Link>
                    <Link className="btn btn-line" to="/about">
                        See our projects
                    </Link>
                </div>
                <p className="hero-est">EST. 2026, PHILIPPINES</p>
            </main>
            <BigOrca play={play} />
        </div>
    )
}

export default Home
