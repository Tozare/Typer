import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { lessonsData } from '../lessons/config'
import { Practice } from 'components/lessons/practice'
import { Link } from 'react-router-dom'

export type lessonsType = {
    id: string,
    name: string,
    exercises: {
        id: string,
        text: string
    }[]
}[]

export const LessonsPage = () => {
    const [currentExercise, setCurrentExercise] = useState({
        lessonIndex: 0,
        exerciseIndex: 0
    })
    const [isPracticePage, setIsPracticePage] = useState(false)
    const { levelID } = useParams()
    let lessons: lessonsType = lessonsData.beginnerLessons

    if (levelID === 'beginner'){
        lessons = lessonsData.beginnerLessons
    } else if (levelID === 'intermediate'){
        lessons = lessonsData.intermediateLessons
    } else if (levelID === 'advanced'){
        lessons = lessonsData.advancedLessons
    }

    const choicePracticeText = (lessonIndex: number, exerciseIndex: number) => {
        setCurrentExercise({
            lessonIndex,
            exerciseIndex
        })
        setIsPracticePage(true)
    }

    const continueStudy = () => {
        const { lessonIndex, exerciseIndex } = currentExercise
        if (exerciseIndex === lessons[lessonIndex].exercises.length-1){
            setCurrentExercise({
                lessonIndex: lessonIndex+1,
                exerciseIndex: 0
            })
            return lessons[lessonIndex+1].exercises[0].text
        } else {
            setCurrentExercise({
                lessonIndex: lessonIndex,
                exerciseIndex: exerciseIndex+1
            })
            return lessons[lessonIndex].exercises[exerciseIndex+1].text
        }
    }
    const finishExercise = () => {
        setIsPracticePage(false)
    }

    return (
        <div>
            <Link to={'/study'}>Back to selection typing lessons level</Link>
            { !isPracticePage ?
                <div>
                    {lessons.map((lesson, lessonIndex) =>
                        <div key={lesson.id}>
                            <h3>{lesson.name}</h3>
                            <button onClick={() => choicePracticeText(lessonIndex, 0)}>
                                start
                            </button>
                            <div>
                                {lesson.exercises.map((exercise, exerciseIndex) =>
                                    <div key={exercise.id} onClick={() => choicePracticeText(lessonIndex, exerciseIndex)}>
                                        {exercise.text}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                :
                <div>
                    <Practice
                        lessons={lessons}
                        currentExercise={currentExercise}
                        continueStudy={continueStudy}
                        finishExercise={finishExercise}
                    />
                </div>
            }
        </div>
    )
}