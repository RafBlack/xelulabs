export type Pixels = { rows: string[]; palette: Record<string, string> }

export const SMALL_ORCA: Pixels = {
    rows: [
        '..........KK........',
        '.........KKK........',
        '......KKKKKKKKK.....',
        'KK...KKKKKKKKKKWWK..',
        'KKK.KKKGGKKKKKKWEKK.',
        '.KKKKKKKKKKKKKKKKKKK',
        '.KKKKKKWWWWWWWWWKKK.',
        'KKK.KKKKWWWWWWWKKK..',
        'KK....KKKKKKKKK.....',
        '........KK..........',
    ],
    palette: { K: '#3d3f45', G: '#6b6d72', W: '#f2f2ef', E: '#0b0b0c' },
}

export const SMALL_ORCA_TAIL = 4
