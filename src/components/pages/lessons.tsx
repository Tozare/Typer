import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { lessonsData } from '../lessons/config'
import { Practice } from 'components/lessons/practice'
import { Link } from 'react-router-dom'
import './lessons.less'

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
        <div className='lessons-container'>
            <div className='link-to-level-selection'>
                <Link to={'/study'}>Back to level selection</Link>
            </div>
            { !isPracticePage ?
                <div className='lessons'>
                    {lessons.map((lesson, lessonIndex) =>
                        <div className='lesson' key={lesson.id}>
                            <div className='title'>{lesson.name}</div>
                            <div className='start-btn' onClick={() => choicePracticeText(lessonIndex, 0)}>
                                start
                            </div>
                            <div className='exercises'>
                                {lesson.exercises.map((exercise, exerciseIndex) =>
                                    <div className='exercise' key={exercise.id} onClick={() => choicePracticeText(lessonIndex, exerciseIndex)}>
                                        {exercise.text}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                :
                <Practice
                    lessons={lessons}
                    currentExercise={currentExercise}
                    continueStudy={continueStudy}
                    finishExercise={finishExercise}
                />
            }
        </div>
    )
}