export const leftShiftKeys = [
    '!','Q','A','Z',
    '@','W','S','X',
    '#','E','D','C',
    '$','R','F','V',
    '%','T','G','B',
    '~','^'
]


type KeyboardKey = {
    align: 'center' | 'right' | 'left'
    content: string
    minorContent?: string
}

export const keyboardKeys: KeyboardKey[][] = [
    [
        { align: 'center', content: '~', minorContent: '~' },
        { align: 'center', content: '!', minorContent: '1' },
        { align: 'center', content: '@', minorContent: '2' },
        { align: 'center', content: '#', minorContent: '3' },
        { align: 'center', content: '$', minorContent: '4' },
        { align: 'center', content: '%', minorContent: '5' },
        { align: 'center', content: '^', minorContent: '6' },
        { align: 'center', content: '&', minorContent: '7' },
        { align: 'center', content: '*', minorContent: '8' },
        { align: 'center', content: '(', minorContent: '9' },
        { align: 'center', content: ')', minorContent: '0' },
        { align: 'center', content: '_', minorContent: '-' },
        { align: 'center', content: '+', minorContent: '+' },
        { align: 'right', content: 'delete' }
    ],
    [
        { align: 'left', content: 'tab' },
        { align: 'center', content: 'Q' },
        { align: 'center', content: 'W' },
        { align: 'center', content: 'E' },
        { align: 'center', content: 'R' },
        { align: 'center', content: 'T' },
        { align: 'center', content: 'Y' },
        { align: 'center', content: 'U' },
        { align: 'center', content: 'I' },
        { align: 'center', content: 'O' },
        { align: 'center', content: 'P' },
        { align: 'center', content: '{', minorContent: '[' },
        { align: 'center', content: '}', minorContent: ']' },
        { align: 'center', content: '|', minorContent: '\\' }
    ],
    [
        { align: 'left', content: 'caps lock' },
        { align: 'center', content: 'A' },
        { align: 'center', content: 'S' },
        { align: 'center', content: 'D' },
        { align: 'center', content: 'F' },
        { align: 'center', content: 'G' },
        { align: 'center', content: 'H' },
        { align: 'center', content: 'J' },
        { align: 'center', content: 'K' },
        { align: 'center', content: 'L' },
        { align: 'center', content: ':', minorContent: ';' },
        { align: 'center', content: '', minorContent: "'" },
        { align: 'right', content: 'return' }
    ],
    [
        { align: 'left', content: 'shift' },
        { align: 'center', content: 'Z' },
        { align: 'center', content: 'X' },
        { align: 'center', content: 'C' },
        { align: 'center', content: 'V' },
        { align: 'center', content: 'B' },
        { align: 'center', content: 'N' },
        { align: 'center', content: 'M' },
        { align: 'center', content: '<', minorContent: ',' },
        { align: 'center', content: '>', minorContent: '.' },
        { align: 'center', content: '?', minorContent: '/' },
        { align: 'right', content: 'shift' }
    ],
    [
        { align: 'left', content: 'ctrl' },
        { align: 'left', content: 'alt' },
        { align: 'left', content: 'cmd' },
        { align: 'center', content: ' ' },
        { align: 'right', content: 'cmd' },
        { align: 'right', content: 'alt' },
        { align: 'right', content: 'ctrl' },
    ]
]
