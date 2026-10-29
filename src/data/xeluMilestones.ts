export const XELU_PETS_KEY = 'xelulabs_orca_pets'

export const XELU_PET_REWARD = {
    threshold: 1000,
    title: 'Certified Orca Botherer',
    farewell: 'No more milestones. You can stop now. ...Unless you just like hanging out.',
    saveDelay: 500,
    sparkIterations: 3,
} as const

export const XELU_MILESTONES = [
    { pets: 10, message: '10 pets already? Don\'t click too fast. I\'m an orca, not a stress ball! See you at 100.' },
    { pets: 100, message: '100 pets? We\'re friends now. Best friends unlock at 200.' },
    { pets: 200, message: 'Best friend status granted. Surely you won\'t reach 300.' },
    { pets: 300, message: 'You know there\'s a whole website behind me, right? Anyway... 400?' },
    { pets: 400, message: 'My productivity is zero. My happiness is maximum. Meet you at 500.' },
    { pets: 500, message: 'Halfway to something I probably shouldn\'t tell you about.' },
    { pets: 600, message: '600 pets. I\'m adding "professional distraction" to my resume. Next review: 700.' },
    { pets: 700, message: 'I told the crew about you. They said "let them cook." 800?' },
    { pets: 800, message: 'Two hundred more. No hints. My lawyer is a dolphin.' },
    { pets: 900, message: 'Okay. At 1000, I owe you something special.' },
    { pets: 1000, message: '1000 pets. You didn\'t find the Easter egg. You adopted it.' },
] as const

export function readPetCount() {
    try {
        const count = Number(window.localStorage.getItem(XELU_PETS_KEY))
        return Number.isSafeInteger(count) && count > 0 ? count : 0
    } catch {
        return 0
    }
}

export function savePetCount(count: number) {
    try {
        window.localStorage.setItem(XELU_PETS_KEY, String(count))
    } catch {
        return
    }
}
