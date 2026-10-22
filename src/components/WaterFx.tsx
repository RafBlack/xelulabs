import './WaterFx.css'

function Splash({ className }: { className: string }) {
    return (
        <span className={`water ${className}`}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
                <span key={n} className={`drop drop-${n}`} />
            ))}
            <span className="ring" />
        </span>
    )
}

function Bubbles({ set, count }: { set: 'enter' | 'leap'; count: number }) {
    return (
        <span className="water bubbles">
            {Array.from({ length: count }, (_, i) => (
                <span key={i} className={`bub bub-${set}-${i + 1}`} />
            ))}
        </span>
    )
}

function WaterFx({ entering, leaping }: { entering: boolean; leaping: boolean }) {
    return (
        <>
            {entering && (
                <>
                    <Splash className="splash-land" />
                    <Bubbles set="enter" count={4} />
                </>
            )}
            {leaping && (
                <>
                    <Splash className="splash-takeoff" />
                    <Splash className="splash-far" />
                    <Bubbles set="leap" count={7} />
                </>
            )}
        </>
    )
}

export default WaterFx
