import './Home.css'
import { useState } from 'react'
import type { MouseEvent } from 'react'
import Header from '../components/Header'
import HeroTitle from '../components/HeroTitle'
import Description from '../components/Description'
import AnimatedLogo from '../components/AnimatedLogo'
import DotGrid from '../components/DotGrid'
import RedrawButton from '../components/RedrawButton'
import { toStage, useMousePosition } from '../hooks/useMousePosition'
import { useRipples } from '../hooks/useRipples'
import { useOrcaIntro } from '../hooks/useOrcaIntro'
import { useCutouts } from '../hooks/useCutouts'

function Home() {
    const [run, setRun] = useState(0)
    const intro = useOrcaIntro(run)
    const { stageRef, titleRef, descRef, orcaRef, holes } = useCutouts(intro.phase)
    const { pos, onMouseMove, onMouseLeave } = useMousePosition()
    const { waves, addRipple } = useRipples(run)

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
            <AnimatedLogo key={`logo-${run}`} />
            <Header />
            <main className="hero">
                <HeroTitle key={`title-${run}`} intro={intro} titleRef={titleRef} orcaRef={orcaRef} />
                <Description ref={descRef} />
            </main>
            <RedrawButton onClick={() => setRun((r) => r + 1)} />
        </div>
    )
}

export default Home
