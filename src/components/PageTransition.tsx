import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageTransitionContext } from '../hooks/usePageTransition'
import PageWipe from './PageWipe'

function PageTransition({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const busy = useRef(false)
    const [target, setTarget] = useState<{ to: string; path: string } | null>(null)

    const go = (to: string, nextPath: string) => {
        if (busy.current) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            navigate(to)
            window.scrollTo(0, 0)
            return
        }
        busy.current = true
        setTarget({ to, path: nextPath })
    }

    const covered = () => {
        if (target) navigate(target.to)
        window.scrollTo(0, 0)
    }

    const finish = () => {
        busy.current = false
        setTarget(null)
    }

    return (
        <PageTransitionContext.Provider value={go}>
            {children}
            {target && <PageWipe path={target.path} onCovered={covered} onComplete={finish} />}
        </PageTransitionContext.Provider>
    )
}

export default PageTransition
