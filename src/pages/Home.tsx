import './Home.css'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import HeroTitle from '../components/HeroTitle'
import Description from '../components/Description'
import DotGrid from '../components/DotGrid'
import BigOrca from '../components/BigOrca'
import { toStage, useMousePosition } from '../hooks/useMousePosition'
import { useRipples } from '../hooks/useRipples'
import { useCutouts } from '../hooks/useCutouts'

function Home() {
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
            className="stage stage-home"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={burst}
        >
            <DotGrid pos={pos} waves={waves} holes={holes} />
            <Header />
            <main ref={heroRef} className="hero container">
                <HeroTitle />
                <Description />
                <div className="hero-actions">
                    <Link className="btn btn-fill" to="/contact">
                        Join XeluLabs
                    </Link>
                    <Link className="btn btn-line" to="/about">
                        See our projects
                    </Link>
                </div>
                <p className="hero-est">Est. 2026, Philippines</p>
            </main>
            <BigOrca />
        </div>
    )
}

export default Home
