import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { lessonsData } from './config'
import { PracticeLessonPage } from 'components/lessons/practiceLesson'

export type lessonsType = {
   id: string,
   name: string,
   exercises: {
       id: string,
       text: string
   }[]
}[]

export const Lessons = () => {
    const [currentExercise, setCurrentExercise] = useState({
        lessonIndex: 0,
        exerciseIndex: 0
    })
    const [practice, setPractice] = useState(false)
    const { levelID } = useParams()


    let lessons: lessonsType = lessonsData.beginnerLessons
    if (levelID === 'beginner'){
        lessons = lessonsData.beginnerLessons
    } else if (levelID === 'intermediate'){
        lessons = lessonsData.intermediateLessons
    } else if (levelID === 'advanced'){
        lessons = lessonsData.advancedLessons
    }
    useEffect(()=> {
        setPractice(false)
    }, [lessons])

    const choicePracticeText = (lessonIndex: number, exerciseIndex: number) => {
        setCurrentExercise({
            lessonIndex,
            exerciseIndex
        })
        setPractice(true)
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
        setPractice(false)
    }

    return (
        <div>
            { !practice ?
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
                    <PracticeLessonPage
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