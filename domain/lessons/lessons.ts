import { Observable, Subject } from 'rxjs'
import { GlobalStorage } from '@domain/globalStorage/globalStorage'

export type Lesson = {
    id: string,
    name: string,
    level: string
}

export type Exercise = {
    id: string,
    lessonId: string,
    text: string,
    result?: ExerciseResult
}

export type ExerciseResult = {
    errorsAmount: number,
    time: number
}

export type StateData = {
    lesson: Lesson,
    exercises: Exercise[]
}[]

export class LessonsManagement {
    stateData: StateData
    private lessonsStream: Subject<StateData> = new Subject()
    lessons: Observable<StateData | undefined>

    constructor(usedId: number, level: 'beginner' | 'intermediate' | 'advanced') {
        this.stateData = this.getInitialState(level)
        this.lessons = this.lessonsStream.asObservable()
    }

    private getInitialState(level: 'beginner' | 'intermediate' | 'advanced'): StateData {
        const lessons: Lesson[] = this.getLessons(level)
        return lessons.map(lesson => {
            return {
                lesson: lesson,
                exercises: this.getExercises(lesson.id)
            }
        })
    }

    private getLessons(level: 'beginner' | 'intermediate' | 'advanced'): Lesson[]{
        const allLessons: Lesson[] = GlobalStorage.get('lessons')
        return allLessons.filter(lesson => lesson.level === level)
    }

    private getExercises(lessonId: string): Exercise[] {
        const allExercises: Exercise[] = GlobalStorage.get('exercises')
        return allExercises.filter(exercise => exercise.lessonId === lessonId)
    }

    addExerciseResult(exerciseId: string, result: ExerciseResult): void {
        const allExercises: Exercise[] = GlobalStorage.get('exercises')
        const exercises: Exercise[] = allExercises.map(exercise => {
            if (exercise.id === exerciseId){
                exercise.result = result
                this.stateData = this.stateData.map(element => {
                    if (element.lesson.id === exercise.lessonId) {
                        element.exercises = element.exercises.map(oldExercise => {
                            if (exercise.id === oldExercise.id) {
                                oldExercise = exercise
                            }
                            return oldExercise
                        })
                    }
                    return element
                })

            }
            return exercise
        })
        this.lessonsStream.next(this.stateData)
        GlobalStorage.store('exercises', exercises)
    }
}