// TODO: Write tests
const englishLowercaseLetters = {
    'a': true, 'b': true, 'c': true, 'd': true, 'e': true, 'f': true, 'g': true, 'h': true, 'i': true,
    'j': true, 'k': true, 'l': true, 'm': true, 'n': true, 'o': true, 'p': true, 'q': true, 'r': true,
    's': true, 't': true, 'u': true, 'v': true, 'w': true, 'x': true, 'y': true, 'z': true
}

type EnglishLowercaseLetter = keyof typeof englishLowercaseLetters

const englishUppercaseLetters = {
    'A': true, 'B': true, 'C': true, 'D': true, 'E': true, 'F': true, 'G': true, 'H': true, 'I': true,
    'J': true, 'K': true, 'L': true, 'M': true, 'N': true, 'O': true, 'P': true, 'Q': true, 'R': true,
    'S': true, 'T': true, 'U': true, 'V': true, 'W': true, 'X': true, 'Y': true, 'Z': true
}

type EnglishUppercaseLetter = keyof typeof englishUppercaseLetters

type EnglishLetter = EnglishLowercaseLetter | EnglishUppercaseLetter

const isEnglishLowercaseLetter = (character: string) =>
    englishLowercaseLetters[character as keyof typeof englishLowercaseLetters]

const isEnglishUppercaseLetter = (character: string) =>
    englishUppercaseLetters[character as keyof typeof englishUppercaseLetters]

const isEnglishLetter = (character: string) =>
    isEnglishLowercaseLetter(character) || isEnglishUppercaseLetter(character)

const numbers = {
    '0': true, '1': true, '2': true, '3': true, '4': true, '5': true, '6': true, '7': true, '8': true, '9': true
}

type NumberCharacter = keyof typeof numbers

const isNumber = (character: string) => numbers[character as keyof typeof numbers]

const supportedSymbols = {
    ',': true, '.': true, '<': true, '>': true, '/': true, '?': true, '|': true, '\\': true, '"': true,
    '\'': true, '{': true, '}': true, '[': true, ']': true, '`': true, '~': true, '=': true, '+': true,
    '-': true, '_': true, '(': true, ')': true, ':': true, ';': true, '*': true, '&': true, '^': true,
    '%': true, '$': true, '#': true, '@': true, '!': true, '±': true, '§': true, ' ': true
}

type SupportedSymbol = keyof typeof supportedSymbols

const isSupportedSymbol = (character: string) => supportedSymbols[character as keyof typeof supportedSymbols]

export type SupportedCharacter = SupportedSymbol | NumberCharacter | EnglishLetter
export const isSupportedCharacter = (character: string) =>
    isNumber(character) || isSupportedSymbol(character) || isEnglishLetter(character)

const charactersRequiredShift: {[key in SupportedCharacter]?: boolean} = {
    ...englishUppercaseLetters,
    ...supportedSymbols,
    ',': false, '.': false, '/': false, '\\': false, '\'': false, '[': false, ']': false, '§': false, '`': false,
    '=': false, '-': false, ' ': false
}

export const isCharacterRequiredShift = (character: SupportedCharacter): boolean =>
    !!charactersRequiredShift[character as keyof typeof charactersRequiredShift]