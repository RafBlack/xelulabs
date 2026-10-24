import './PageWipe.css'
import { BODY_ORCA } from '../data/orcaArt'
import { WIPE_EDGE } from '../data/wipe'
import PixelRects from './PixelRects'

type Props = { path: string; onComplete: () => void }

function WipeEdge({ trailing = false }: { trailing?: boolean }) {
    return (
        <svg className={`page-wipe-edge${trailing ? ' page-wipe-edge-trailing' : ''}`} viewBox="0 0 140 900" preserveAspectRatio="none" shapeRendering="crispEdges">
            {WIPE_EDGE.map((e, index) => <rect key={index} x={e.x} y={e.y} width={e.w} height={e.h} fill={e.c} />)}
        </svg>
    )
}

function PageWipe({ path, onComplete }: Props) {
    return (
        <div className="page-wipe" aria-hidden="true">
            <div className="page-wipe-wave" onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) onComplete()
            }}>
                <WipeEdge />
                <WipeEdge trailing />
                <div className="page-wipe-rider">
                    <div className="page-wipe-wiggle">
                        <svg viewBox="0 0 48 22" width="240" height="110" shapeRendering="crispEdges">
                            <PixelRects art={BODY_ORCA} />
                        </svg>
                    </div>
                </div>
                <p className="page-wipe-text"><span>$ </span>cd {path}</p>
            </div>
        </div>
    )
}

export default PageWipe
