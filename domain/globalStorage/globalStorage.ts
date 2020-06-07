import { lessonsDataForLocalStorage } from 'components/lessons/config'

export class GlobalStorage {
    static store(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static get(key: string): any {
        const elements: string | null = localStorage.getItem(key)
        if (elements === null){
            return null
        }
        return JSON.parse(elements)
    }
}

export const addLessonsDataToLocalStorage = () => {
    if (localStorage.getItem('exercises') === null){
        localStorage.setItem('exercises', JSON.stringify(lessonsDataForLocalStorage.exercises))
        localStorage.setItem('lessons', JSON.stringify(lessonsDataForLocalStorage.lessons))
    }
}