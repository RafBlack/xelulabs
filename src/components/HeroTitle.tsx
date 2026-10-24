import './HeroTitle.css'

function HeroTitle() {
    return (
        <h1 className="hero-title" aria-label="XELU LABS">
            <span className="hero-xelu" aria-hidden="true">
                XELU
            </span>
            <span className="hero-labs" aria-hidden="true">
                LABS
            </span>
        </h1>
    )
}

export default HeroTitle
