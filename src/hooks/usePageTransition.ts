import { createContext, useContext } from 'react'

export const PageTransitionContext = createContext<(to: string, path: string) => void>(() => {})

export function usePageTransition() {
    return useContext(PageTransitionContext)
}
