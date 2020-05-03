// minimumNumber included
// maximumNumber included
export const randomInteger = (minimumNumber: number, maximumNumber: number): number =>
    Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) + minimumNumber
