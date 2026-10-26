import './About.css'
import Header from '../components/Header'

function About() {
    return (
        <div className="about-page">
            <div className="about-header"><Header /></div>
            <main className="about-scroller">
                <div className="about-surface">
                    <div className="about-container">
                        <section className="about-section" id="who-we-are" aria-label="Who we are" />
                        <section className="about-section" id="what-we-do" aria-label="What we do" />
                        <section className="about-section" id="our-story" aria-label="Our story" />
                        <section className="about-section" id="join" aria-label="Join" />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default About
