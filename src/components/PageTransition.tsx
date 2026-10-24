import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { WIPE_COVER_END, WIPE_COVER_START, WIPE_DURATION } from '../data/wipe'
import { PageTransitionContext } from '../hooks/usePageTransition'
import PageWipe from './PageWipe'

function PageTransition({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const busy = useRef(false)
    const timer = useRef<number | undefined>(undefined)
    const [path, setPath] = useState<string | null>(null)

    useEffect(() => () => window.clearTimeout(timer.current), [])

    const go = (to: string, nextPath: string) => {
        if (busy.current) return
        busy.current = true
        setPath(nextPath)
        timer.current = window.setTimeout(() => {
            navigate(to)
            window.scrollTo(0, 0)
        }, WIPE_DURATION * (WIPE_COVER_START + WIPE_COVER_END) / 2)
    }

    const finish = () => {
        busy.current = false
        setPath(null)
    }

    return (
        <PageTransitionContext.Provider value={go}>
            {children}
            {path && <PageWipe path={path} onComplete={finish} />}
        </PageTransitionContext.Provider>
    )
}

export default PageTransition
