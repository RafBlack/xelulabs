import './Splash.css'
import type { CSSProperties } from 'react'

const COLORS = ['#ffffff', '#cfe9ec', '#7fd3d8']

const rand = (i: number, k: number) => {
    const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453
    return v - Math.floor(v)
}

const COLUMNS = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((x) => ({ x, h: 0.26 - Math.abs(x) * 0.045 + rand(x, 9) * 0.06 }))

const DROPS = Array.from({ length: 44 }, (_, i) => ({
    x: (rand(i, 1) - 0.5) * 0.3,
    dx: (i % 2 ? 1 : -1) * (0.08 + rand(i, 2) * 0.5),
    dy: 0.12 + rand(i, 3) * 0.36,
    delay: 2.35 + rand(i, 4) * 0.18,
    t: 0.9 + rand(i, 5) * 0.5,
    color: COLORS[i % 3],
}))

function Splash() {
    return (
        <div className="splash">
            {COLUMNS.map((c) => (
                <i
                    key={c.x}
                    className="splash-col"
                    style={{ '--x': c.x, '--h': c.h, '--c': COLORS[1 + (Math.abs(c.x) % 2)] } as CSSProperties}
                />
            ))}
            {DROPS.map((d, i) => (
                <i
                    key={i}
                    className="splash-drop"
                    style={
                        {
                            '--x': d.x,
                            '--dx': d.dx,
                            '--dy': d.dy,
                            background: d.color,
                            animationDelay: `${d.delay}s`,
                            animationDuration: `${d.t}s`,
                        } as CSSProperties
                    }
                />
            ))}
        </div>
    )
}

export default Splash
