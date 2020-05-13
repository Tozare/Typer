export const leftShiftKeys = [
    '!','Q','A','Z',
    '@','W','S','X',
    '#','E','D','C',
    '$','R','F','V',
    '%','T','G','B',
    '~','^'
]


type KeyboardKey = { 
    coloring: string,
    align: 'center' | 'right' | 'left'
    content: string
    minorContent?: string
}



export const keyboardKeys: KeyboardKey[][] = [
    [
        { coloring: '#FFFFFF', align: 'center', content: '~', minorContent: '`' },
        { coloring: '#78e2aa', align: 'center', content: '!', minorContent: '1' },
        { coloring: '#78e2aa', align: 'center', content: '@', minorContent: '2' },
        { coloring: '#63e3ff', align: 'center', content: '#', minorContent: '3' },
        { coloring: '#f69ec4', align: 'center', content: '$', minorContent: '4' },
        { coloring: '#ffc07e', align: 'center', content: '%', minorContent: '5' },
        { coloring: '#ffc07e', align: 'center', content: '^', minorContent: '6' },
        { coloring: '#ffef7e', align: 'center', content: '&', minorContent: '7' },
        { coloring: '#f69ec4', align: 'center', content: '*', minorContent: '8' },
        { coloring: '#63e3ff', align: 'center', content: '(', minorContent: '9' },
        { coloring: '#78e2aa', align: 'center', content: ')', minorContent: '0' },
        { coloring: '#78e2aa', align: 'center', content: '_', minorContent: '-' },
        { coloring: '#78e2aa', align: 'center', content: '+', minorContent: '+' },
        { coloring: '#FFFFFF', align: 'right', content: 'delete' }
    ],
    [
        { coloring: '', align: 'left', content: 'tab' },
        { coloring: '#78e2aa', align: 'center', content: 'Q' },
        { coloring: '#63e3ff', align: 'center', content: 'W' },
        { coloring: '#f69ec4', align: 'center', content: 'E' },
        { coloring: '#ffc07e', align: 'center', content: 'R' },
        { coloring: '#ffc07e', align: 'center', content: 'T' },
        { coloring: '#ffef7e', align: 'center', content: 'Y' },
        { coloring: '#ffef7e', align: 'center', content: 'U' },
        { coloring: '#f69ec4', align: 'center', content: 'I' },
        { coloring: '#63e3ff', align: 'center', content: 'O' },
        { coloring: '#78e2aa', align: 'center', content: 'P' },
        { coloring: '#78e2aa', align: 'center', content: '{', minorContent: '[' },
        { coloring: '#78e2aa', align: 'center', content: '}', minorContent: ']' },
        { coloring: '#FFFFFF', align: 'center', content: '|', minorContent: '\\' }
    ],
    [
        { coloring: '#FFFFFF', align: 'left', content: 'caps lock' },
        { coloring: '#78e2aa', align: 'center', content: 'A' },
        { coloring: '#63e3ff', align: 'center', content: 'S' },
        { coloring: '#f69ec4', align: 'center', content: 'D' },
        { coloring: '#ffc07e', align: 'center', content: 'F' },
        { coloring: '#ffc07e', align: 'center', content: 'G' },
        { coloring: '#ffef7e', align: 'center', content: 'H' },
        { coloring: '#ffef7e', align: 'center', content: 'J' },
        { coloring: '#f69ec4', align: 'center', content: 'K' },
        { coloring: '#63e3ff', align: 'center', content: 'L' },
        { coloring: '#78e2aa', align: 'center', content: ':', minorContent: ';' },
        { coloring: '#78e2aa', align: 'center', content: '', minorContent: "'" },
        { coloring: '#FFFFFF', align: 'right', content: 'return' }
    ],
    [
        { coloring: '#FFFFFF', align: 'left', content: 'shift' },
        { coloring: '#78e2aa', align: 'center', content: 'Z' },
        { coloring: '#63e3ff', align: 'center', content: 'X' },
        { coloring: '#f69ec4', align: 'center', content: 'C' },
        { coloring: '#ffc07e', align: 'center', content: 'V' },
        { coloring: '#ffc07e', align: 'center', content: 'B' },
        { coloring: '#ffef7e', align: 'center', content: 'N' },
        { coloring: '#ffef7e', align: 'center', content: 'M' },
        { coloring: '#f69ec4', align: 'center', content: '<', minorContent: ',' },
        { coloring: '#63e3ff', align: 'center', content: '>', minorContent: '.' },
        { coloring: '#78e2aa', align: 'center', content: '?', minorContent: '/' },
        { coloring: '#FFFFFF', align: 'right', content: 'shift' }
    ],
    [
        { coloring: '#FFFFFF', align: 'left', content: 'ctrl' },
        { coloring: '#FFFFFF', align: 'left', content: 'alt' },
        { coloring: '#FFFFFF', align: 'left', content: 'cmd' },
        { coloring: '#FFFFFF', align: 'center', content: ' ' },
        { coloring: '#FFFFFF', align: 'right', content: 'cmd' },
        { coloring: '#FFFFFF', align: 'right', content: 'alt' },
        { coloring: '#FFFFFF', align: 'right', content: 'ctrl' },
    ]
]
