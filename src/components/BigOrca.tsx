import './BigOrca.css'
import PixelRects from './PixelRects'
import Splash from './Splash'
import { BIG_ORCA, BIG_ORCA_GLITCH } from '../data/orcaArt'

const cols = BIG_ORCA.rows[0].length
const rows = BIG_ORCA.rows.length

const DRIPS = [
    { left: '17.5%', top: '25%' },
    { left: '20%', top: '37%' },
    { left: '25%', top: '53%' },
    { left: '30%', top: '65%' },
]

function BigOrca({ play }: { play: boolean }) {
    return (
        <>
            <div className="big-orca" aria-hidden="true">
                <div className="big-orca-rise">
                    <svg className="big-orca-bob" viewBox={`0 0 ${cols} ${rows}`} shapeRendering="crispEdges">
                        {BIG_ORCA_GLITCH.map((g) => (
                            <g key={g.color} opacity={0.6}>
                                <PixelRects art={BIG_ORCA} fill={g.color} dx={g.dx} />
                            </g>
                        ))}
                        <PixelRects art={BIG_ORCA} />
                    </svg>
                    {play &&
                        DRIPS.map((d, i) => (
                            <i key={i} className="drip" style={{ ...d, animationDelay: `${3.2 + i * 0.35}s` }} />
                        ))}
                </div>
            </div>
            {play && <Splash />}
        </>
    )
}

export default BigOrca
