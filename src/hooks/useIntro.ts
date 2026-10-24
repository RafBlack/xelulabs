import { useEffect, useState } from 'react'

const KEY = 'xelu-intro-played'

function firstVisit() {
    try {
        if (sessionStorage.getItem(KEY)) return false
        sessionStorage.setItem(KEY, '1')
        return true
    } catch {
        return true
    }
}

let pending = !matchMedia('(prefers-reduced-motion: reduce)').matches && firstVisit()

export function useIntro() {
    const [play] = useState(pending)
    useEffect(() => {
        pending = false
    }, [])
    return play
}
