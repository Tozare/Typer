import React, { useState } from 'react'
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
        exerciseIndex: 1
    })
    const [practice, setPractice] = useState(false)
    const [practiceChoice, setPracticeChoice] = useState(false)

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
        setPractice(true)
    }

    const continueStudy = () => {
        const { lessonIndex, exerciseIndex } = currentExercise
        if (exerciseIndex === lessons[lessonIndex].exercises.length){
            setPractice(false)
        } else {
            setCurrentExercise({
                lessonIndex: lessonIndex,
                exerciseIndex: exerciseIndex+1
            })
        }
        // setPracticeChoice(false)
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
                    <PracticeLessonPage lessons={lessons} continueStudy={continueStudy} currentExercise={currentExercise}/>
                    {/*{ !practiceChoice ?*/}
                    {/*    <PracticeLessonPage lessons={lessons} continueStudy={() => setPracticeChoice(true)} currentExercise={currentExercise}/> :*/}
                    {/*    <div>*/}
                    {/*        <button onClick={continueStudy}>continue</button>*/}
                    {/*        <button onClick={() => setPracticeChoice(false)}>again</button>*/}
                    {/*        <button onClick={() => {*/}
                    {/*            setPracticeChoice(false)*/}
                    {/*            setPractice(false)*/}
                    {/*        }}>stop</button>*/}
                    {/*    </div>*/}

                    {/*}*/}
                </div>
             }
        </div>
    )
}