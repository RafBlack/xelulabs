import './PageWipe.css'
import { useEffect, useRef } from 'react'
import { BODY_ORCA } from '../data/orcaArt'
import { WIPE_COVER_END, WIPE_COVER_START, WIPE_DURATION, WIPE_EDGE } from '../data/wipe'
import PixelRects from './PixelRects'

type Props = { path: string; onCovered: () => void; onComplete: () => void }

function WipeEdge({ trailing = false }: { trailing?: boolean }) {
    return (
        <svg className={`page-wipe-edge${trailing ? ' page-wipe-edge-trailing' : ''}`} viewBox="0 0 140 900" preserveAspectRatio="none" shapeRendering="crispEdges">
            {WIPE_EDGE.map((e, index) => <rect key={index} x={e.x} y={e.y} width={e.w} height={e.h} fill={e.c} />)}
        </svg>
    )
}

function PageWipe({ path, onCovered, onComplete }: Props) {
    const wave = useRef<HTMLDivElement>(null)
    const covered = useRef(false)

    useEffect(() => {
        let frame: number
        const check = () => {
            const time = wave.current?.getAnimations()[0]?.currentTime
            if (time !== null && time !== undefined && Number(time) >= WIPE_DURATION * (WIPE_COVER_START + WIPE_COVER_END) / 2) {
                if (!covered.current) {
                    covered.current = true
                    onCovered()
                }
                return
            }
            frame = window.requestAnimationFrame(check)
        }
        frame = window.requestAnimationFrame(check)
        return () => window.cancelAnimationFrame(frame)
    }, [onCovered])

    return (
        <div className="page-wipe" aria-hidden="true">
            <div ref={wave} className="page-wipe-wave" style={{ animationDuration: `${WIPE_DURATION}ms` }} onAnimationEnd={(event) => {
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
                <p className="page-wipe-text" style={{ animationDuration: `${WIPE_DURATION}ms` }}><span>$ </span>cd {path}</p>
            </div>
        </div>
    )
}

export default PageWipe
