import './HeroTitle.css'
import { useRef } from 'react'
import PixelPaths from './PixelPaths'
import { SMALL_ORCA, SMALL_ORCA_TAIL } from '../data/orcaArt'
import { useSwimIntro } from '../hooks/useSwimIntro'

const cols = SMALL_ORCA.rows[0].length
const rows = SMALL_ORCA.rows.length

function HeroTitle({ play }: { play: boolean }) {
    const lineRef = useRef<HTMLSpanElement>(null)
    const orcaRef = useRef<HTMLSpanElement>(null)
    useSwimIntro(lineRef, orcaRef)

    return (
        <h1 className="hero-title" aria-label="XELU LABS">
            <span ref={lineRef} className="hero-xelu" aria-hidden="true">
                {[...'XELU'].map((ch) => (
                    <span key={ch} className="hero-letter">
                        {ch}
                    </span>
                ))}
                {play && (
                    <span ref={orcaRef} className="swim-orca">
                        <svg viewBox={`0 0 ${cols} ${rows}`} shapeRendering="crispEdges">
                            <g className="swim-tail">
                                <PixelPaths art={SMALL_ORCA} to={SMALL_ORCA_TAIL} />
                            </g>
                            <PixelPaths art={SMALL_ORCA} from={SMALL_ORCA_TAIL} />
                        </svg>
                    </span>
                )}
            </span>
            <span className="hero-labs" aria-hidden="true">
                LABS
            </span>
        </h1>
    )
}

export default HeroTitle
