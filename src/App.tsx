import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Crew from './pages/Crew'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import PageTransition from './components/PageTransition'

function App() {
    return (
        <PageTransition>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/crew" element={<Crew />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </PageTransition>
    )
}

export default App
