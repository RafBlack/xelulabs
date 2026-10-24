import './BigOrca.css'
import PixelPaths from './PixelPaths'
import Splash from './Splash'
import { BIG_ORCA } from '../data/orcaArt'
import { GHOSTS } from '../data/logoPaths'

const cols = BIG_ORCA.rows[0].length
const rows = BIG_ORCA.rows.length

const DRIPS = [
    { left: '6%', top: '58%' },
    { left: '22%', top: '70%' },
    { left: '14%', top: '64%' },
    { left: '34%', top: '78%' },
]

function BigOrca() {
    return (
        <div className="big-orca" aria-hidden="true">
            <div className="big-orca-body">
                <div className="big-orca-rise">
                    <svg className="big-orca-bob" viewBox={`0 0 ${cols} ${rows}`} shapeRendering="crispEdges">
                        {GHOSTS.map((color, i) => (
                            <g key={color} className={`big-orca-ghost big-orca-ghost-${i}`}>
                                <PixelPaths art={BIG_ORCA} fill={color} />
                            </g>
                        ))}
                        <PixelPaths art={BIG_ORCA} />
                    </svg>
                    {DRIPS.map((d, i) => (
                        <i key={i} className="drip" style={{ ...d, animationDelay: `${3.2 + i * 0.35}s` }} />
                    ))}
                </div>
            </div>
            <Splash />
        </div>
    )
}

export default BigOrca
