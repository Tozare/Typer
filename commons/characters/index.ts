// TODO: Write tests
const englishLowercaseLetters = [
    'a','b','c','d','e','f','g','h','i','j','k','l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]

type EnglishLowercaseLetter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l'
    | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

const englishUppercaseLetters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

type EnglishUppercaseLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L'
    | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

type EnglishLetter = EnglishLowercaseLetter | EnglishUppercaseLetter

const isEnglishLowercaseLetter = (character: string) =>
    englishLowercaseLetters.indexOf(character) >= 0

const isEnglishUppercaseLetter = (character: string) =>
    englishUppercaseLetters.indexOf(character) >= 0

const isEnglishLetter = (character: string) =>
    isEnglishLowercaseLetter(character) || isEnglishUppercaseLetter(character)

const numbers = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

type NumberCharacter = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

const isNumber = (character: string) =>
    numbers.indexOf(character) >= 0

const supportedSymbols = [
    ',', '.', '<', '>', '/', '?', '|', '\\', '"', '\'', '{', '}',
    '[', ']', '`', '~', '=', '+', '-', '_', '(', ')', ':', ';',
    '*', '&', '^', '%', '$', '#', '@', '!', '±', '§', ' '
]

type SupportedSymbol =
    ',' | '.' | '<' | '>' | '/' | '?' | '|' | '\\' | '"' | '\'' | '{' | '}' |
    '[' | ']' | '`' | '~' | '=' | '+' | '-' | '_' | '(' | ')' | ':' | ';' |
    '*' | '&' | '^' | '%' | '$' | '#' | '@' | '!' | '±' | '§' | ' '

const isSupportedSymbol = (character: string) =>
    supportedSymbols.indexOf(character) >= 0

export type SupportedCharacter = SupportedSymbol | NumberCharacter | EnglishLetter
export const isSupportedCharacter = (character: string) =>
    isNumber(character) || isSupportedSymbol(character) || isEnglishLetter(character)
