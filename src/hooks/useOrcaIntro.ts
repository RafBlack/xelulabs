import { useEffect, useState } from 'react'
import { INTRO } from '../data/timeline'

export type Phase = 'enter' | 'idle' | 'leap' | 'gone'

export type IntroState = {
    phase: Phase
    entering: boolean
    typed: number
    open: boolean
    smile: boolean
}

type Step = [number, Partial<IntroState>]

const START: IntroState = { phase: 'enter', entering: true, typed: 0, open: false, smile: false }

function steps(): Step[] {
    const letters = Array.from({ length: INTRO.letters }, (_, k): Step[] => {
        const i = k + 1
        const offset = i * INTRO.letterStep
        return [
            [INTRO.mouthOpen + offset, { open: true }],
            [INTRO.spawn + offset, { typed: i }],
            [INTRO.mouthClose + offset, { open: false }],
        ]
    }).flat()
    return [
        [INTRO.landed, { phase: 'idle' }],
        [INTRO.splashDone, { entering: false }],
        ...letters,
        [INTRO.smile, { smile: true }],
        [INTRO.leap, { phase: 'leap' }],
        [INTRO.gone, { phase: 'gone' }],
    ]
}

export function useOrcaIntro() {
    const [state, setState] = useState<IntroState>(START)

    useEffect(() => {
        const timers = steps().map(([ms, patch]) =>
            setTimeout(() => setState((s) => ({ ...s, ...patch })), ms),
        )
        return () => timers.forEach(clearTimeout)
    }, [])

    return state
}
