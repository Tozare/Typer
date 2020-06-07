import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Practice } from 'components/lessons/practice'
import { Link } from 'react-router-dom'
import './lessons.less'
import { ExerciseResult, LessonsManagement, StateData }  from '@domain/lessons/lessons'
import { useObservable } from '@commons/react-hooks/use-observable'

export const LessonsPage = () => {
    const { levelID } = useParams()
    const lessonsManagement = new LessonsManagement(1,levelID)
    const lessonsData = useObservable<StateData | undefined>(lessonsManagement.lessons, lessonsManagement.stateData)

    if (lessonsData === undefined){
        return null
    }

    const [currentExercise, setCurrentExercise] = useState({
        lessonIndex: 0,
        exerciseIndex: 0
    })
    const [isPracticePage, setIsPracticePage] = useState(false)

    const getNextExerciseText = () => {
        const { lessonIndex, exerciseIndex } = currentExercise
        if (exerciseIndex === lessonsData[lessonIndex].exercises.length-1){
            setCurrentExercise({
                    lessonIndex: lessonIndex+1,
                    exerciseIndex: 0
            })
           return lessonsData[lessonIndex+1].exercises[0].text
         } else {
             setCurrentExercise({
                        lessonIndex: lessonIndex,
                       exerciseIndex: exerciseIndex+1
                })
             return lessonsData[lessonIndex].exercises[exerciseIndex+1].text
        }
    }

    const addResult = (exerciseId: string, result: ExerciseResult) => {
        lessonsManagement.addExerciseResult(exerciseId, result)
    }


    const finishExercise = () => {
        setIsPracticePage(false)
    }

    const isExerciseAvailable = (lessonIndex: number, exerciseIndex: number): boolean => {
        if (lessonIndex === 0 && exerciseIndex === 0){
            return true
        } else if (exerciseIndex === 0){
            const exercisesLength = lessonsData[lessonIndex-1].exercises.length
            const exercise = lessonsData[lessonIndex-1].exercises[exercisesLength-1]
            if (exercise.result){
                return true
            } else {
                return false
            }
        } else {
            const exercise = lessonsData[lessonIndex].exercises[exerciseIndex-1]
            if (exercise.result){
                return true
            } else {
                return false
            }
        }
    }

    const isLessonAvailable = (lessonIndex: number): boolean => {
        return isExerciseAvailable(lessonIndex, 0)
    }

    const startAvailableExercise = (lessonIndex: number): void => {
        setIsPracticePage(true)
        lessonsData[lessonIndex].exercises.forEach((exercise, exerciseIndex) => {
            if (exercise.result === undefined && exerciseIndex === 0){
                setCurrentExercise({
                    lessonIndex: lessonIndex,
                    exerciseIndex: exerciseIndex
                })
                return
            } else if (exercise.result === undefined && lessonsData[lessonIndex].exercises[exerciseIndex-1].result) {
                setCurrentExercise({
                    lessonIndex: lessonIndex,
                    exerciseIndex: exerciseIndex
                })
                return
            } else if (exercise.result && exerciseIndex === lessonsData[lessonIndex].exercises.length-1){
                setCurrentExercise({
                    lessonIndex: lessonIndex,
                    exerciseIndex: 0
                })
                return
            }
        })

    }

    return (
        <div className='lessons-container'>
            <div className='link-to-level-selection'>
                <Link to={'/study'}>Back to level selection</Link>
            </div>
            { !isPracticePage ?
                <div className='lessons'>
                    {lessonsData?.map((lessonData, lessonDataIndex) => {
                        const isAvailable = isLessonAvailable(lessonDataIndex)
                        const lessonClassName = 'lesson'
                        // const lessonLength = lessonsData[lessonDataIndex].exercises.length
                        // const lastExercise = lessonsData[lessonDataIndex].exercises[lessonLength-1]
                        // if (lastExercise.result){
                        //     lessonClassName += ' successful'
                        // } else if (isAvailable){
                        //     lessonClassName += ' available'
                        // }
                        return (
                            <div className={lessonClassName} key={lessonData.lesson.id}>
                                <div className='title'>{lessonData.lesson.name}</div>
                                {isAvailable && <div className='start-btn' onClick={() => startAvailableExercise(lessonDataIndex)}>
                                    start
                                </div>}
                                <div className='exercises'>
                                    {lessonData.exercises.map((exercise, exerciseIndex) => {
                                        const isAvailable = isExerciseAvailable(lessonDataIndex, exerciseIndex)
                                        let exerciseClassName = 'exercise'
                                        if (exercise.result){
                                            exerciseClassName += ' successful'
                                        } else if (isAvailable){
                                            exerciseClassName += ' available'
                                        }
                                        return (
                                            <div className={exerciseClassName} key={exercise.id}>
                                                {exercise.text}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <Practice
                    lessonsData={lessonsData}
                    currentExercise={currentExercise}
                    getNextExerciseText={getNextExerciseText}
                    finishExercise={finishExercise}
                    addResult={addResult}
                />
            }
        </div>
    )
}