import './AnimatedLogo.css'
import { BRISTLES, EXTRUSION, GHOSTS, GLOSS_STOPS, LOGO_PATHS, LOGO_VIEWBOX } from '../data/logoPaths'

const line = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

function Strokes({ extra = '' }: { extra?: string }) {
    return LOGO_PATHS.map((p) => (
        <path key={p.id} className={`logo-stroke ${p.cls} ${extra}`} pathLength={1} d={p.d} />
    ))
}

function AnimatedLogo() {
    return (
        <div className="logo-tilt">
            <svg className="logo-svg" role="img" aria-label="XeluLabs logo" viewBox={LOGO_VIEWBOX}>
                <defs>
                    <linearGradient id="logo-gloss" x1="0" y1="0" x2="1" y2="1">
                        {GLOSS_STOPS.map(([offset, color]) => (
                            <stop key={offset} offset={offset} stopColor={color} />
                        ))}
                    </linearGradient>
                    <radialGradient id="logo-bloom-fill">
                        <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <g {...line} strokeWidth={58}>
                    {EXTRUSION.map((e) => (
                        <g key={e.color} transform={`translate(${e.dx},${e.dy})`} stroke={e.color}>
                            <Strokes />
                        </g>
                    ))}
                </g>
                {GHOSTS.map((g) => (
                    <g
                        key={g.color}
                        {...line}
                        className={g.cls}
                        transform={`translate(${g.dx},0)`}
                        stroke={g.color}
                        strokeWidth={58}
                        opacity={0.45}
                    >
                        <Strokes />
                    </g>
                ))}
                <g {...line} stroke="url(#logo-gloss) #e8e8e6">
                    <g strokeWidth={58}>
                        <Strokes />
                    </g>
                    {BRISTLES.map((b) => (
                        <g
                            key={b.lag}
                            className="logo-bristles"
                            transform={`translate(${b.dx},${b.dy})`}
                            strokeWidth={b.width}
                            opacity={b.opacity}
                        >
                            <Strokes extra={b.lag} />
                        </g>
                    ))}
                </g>
                <g className="logo-tips" fill="none" stroke="#ffffff" strokeWidth={44} strokeLinecap="round">
                    {LOGO_PATHS.map((p) => (
                        <path key={p.id} className={`logo-tip ${p.cls}`} pathLength={1} d={p.d} />
                    ))}
                </g>
                <circle className="logo-bloom" cx="1030" cy="760" r="520" fill="url(#logo-bloom-fill)" />
                <path
                    className="logo-glint"
                    pathLength={1}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={14}
                    strokeLinecap="round"
                    d={LOGO_PATHS[0].d}
                />
            </svg>
            <div className="logo-scan" />
        </div>
    )
}

export default AnimatedLogo
