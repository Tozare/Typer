import { isSupportedCharacter } from './index'

test('English letters have to be supported', () => {
    const englishLetters = 'abcdefghijklmnopqrstuvwxyz'

    expect(englishLetters.length).toBe(26)

    englishLetters
        .split('')
        .forEach((letter) => {
            expect(isSupportedCharacter(letter)).toBeTruthy()
            expect(isSupportedCharacter(letter.toUpperCase())).toBeTruthy()
        })
})