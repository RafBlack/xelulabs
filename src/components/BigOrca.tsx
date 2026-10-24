import './BigOrca.css'
import PixelPaths from './PixelPaths'
import { BIG_ORCA } from '../data/orcaArt'
import { GHOSTS } from '../data/logoPaths'

const cols = BIG_ORCA.rows[0].length
const rows = BIG_ORCA.rows.length

function BigOrca() {
    return (
        <div className="big-orca" aria-hidden="true">
            <div className="big-orca-rise">
                <svg className="big-orca-bob" viewBox={`0 0 ${cols} ${rows}`} shapeRendering="crispEdges">
                    {GHOSTS.map((color, i) => (
                        <g key={color} className={`big-orca-ghost big-orca-ghost-${i}`}>
                            <PixelPaths art={BIG_ORCA} fill={color} />
                        </g>
                    ))}
                    <PixelPaths art={BIG_ORCA} />
                </svg>
            </div>
        </div>
    )
}

export default BigOrca
