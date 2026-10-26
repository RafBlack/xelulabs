import './About.css'
import Header from '../components/Header'
import AboutHero from '../components/about/AboutHero'
import AboutWork from '../components/about/AboutWork'
import AboutStory from '../components/about/AboutStory'
import AboutJoin from '../components/about/AboutJoin'

function About() {
    return (
        <div className="about-page">
            <div className="about-header"><Header /></div>
            <main className="about-scroller">
                <div className="about-surface">
                    <div className="about-container">
                        <AboutHero />
                        <AboutWork seen />
                        <AboutStory seen />
                        <AboutJoin seen />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default About
