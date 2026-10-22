import './HeroTitle.css'
import type { Ref } from 'react'
import Orca from './Orca'
import WaterFx from './WaterFx'
import type { IntroState } from '../hooks/useOrcaIntro'

type Props = {
    intro: IntroState
    titleRef: Ref<HTMLHeadingElement>
    orcaRef: Ref<HTMLSpanElement>
}

const letters = ['X', 'E', 'L', 'U']

function HeroTitle({ intro, titleRef, orcaRef }: Props) {
    const leaping = intro.phase === 'leap' || intro.phase === 'gone'
    return (
        <h1 ref={titleRef} className="hero-title" aria-label="XELU LABS">
            <span className="hero-xelu" aria-hidden="true">
                <Orca ref={orcaRef} phase={intro.phase} typed={intro.typed} open={intro.open} smile={intro.smile} />
                <WaterFx entering={intro.entering} leaping={leaping} />
                {letters.map((ch, i) => (
                    <span key={ch} className="hero-letter">
                        <span className="hero-slot">{ch}</span>
                        {i < intro.typed && (
                            <>
                                <span className={`hero-spit hero-spit-${i}`}>{ch}</span>
                                {[1, 2, 3, 4].map((n) => (
                                    <span key={n} className={`hero-puff hero-puff-${n}`} />
                                ))}
                            </>
                        )}
                    </span>
                ))}
            </span>
            <span className="hero-labs">LABS</span>
        </h1>
    )
}

export default HeroTitle
