import React, { useState } from 'react'
import { TypingAnalyzer } from '@domain/typing/analyzer'
import { TypingStream } from '@domain/typing/stream'
import { zip } from 'rxjs'
import { finalize, take } from 'rxjs/operators'
import { TypingAnalytics } from 'components/typing-analytics'
import { TypingWindow } from 'components/typing-window'
import { Keyboard } from 'components/keyboard/keyboard'
import './practice.less'
import { ExerciseResult, StateData } from '@domain/lessons/lessons'

type Props = {
    lessonsData: StateData
    currentExercise: {
        lessonIndex: number,
        exerciseIndex: number
    }
    getNextExerciseText: () => string
    finishExercise: () => void
    addResult: (exerciseId: string, result: ExerciseResult) => void
}

export const Practice = (props: Props) => {
    const { lessonsData, currentExercise, getNextExerciseText, finishExercise, addResult } = props

    const { lessonIndex, exerciseIndex } = currentExercise
    let text = lessonsData[lessonIndex].exercises[exerciseIndex].text
    const [typingAnalyzer, initNewTypingAnalyzer] = useState(new TypingAnalyzer(TypingStream.shared().characters, text))
    const [state, setState] = useState({
        typingSpeed: 0,
        typingAccuracy: 100,
    })
    const [isMenu, setIsMenu] = useState(false)
    const isContinue = lessonIndex !== lessonsData.length-1 || exerciseIndex !== lessonsData[lessonIndex].exercises.length-1

    const finalizeExercise = () => {
        zip(
            typingAnalyzer.typingSpeedInAmountOfCharactersPerMinute(),
            typingAnalyzer.typingAccuracyInPercents()
        ).pipe(
            take(1)
        ).subscribe(([typingSpeed, typingAccuracy]) => {
            setState({
                typingSpeed,
                typingAccuracy
            })
            addResult(lessonsData[lessonIndex].exercises[exerciseIndex].id, {
                errorsAmount: 5,
                time: 4
            })
            setIsMenu(true)
        })
    }

    const startNextExercise = () => {
        text = getNextExerciseText()
        initNewTypingAnalyzer(new TypingAnalyzer(TypingStream.shared().characters, text))
        setIsMenu(false)
    }

    const startExerciseAgain = () => {
        initNewTypingAnalyzer(new TypingAnalyzer(TypingStream.shared().characters, text))
        setIsMenu(false)
    }

    const typingAnalyzerState = typingAnalyzer.state.pipe(
        finalize(finalizeExercise)
    )

    const { typingSpeed, typingAccuracy } = state

    return (
        <div className='practice-container'>
            <div className='title'>{lessonsData[lessonIndex].lesson.name}: {exerciseIndex+1} exercise</div>
            {
                isMenu ?
                    <div className='menu'>
                        {
                            typingSpeed === 0
                                ? null
                                :  <TypingAnalytics
                                    typingAccuracy={typingAccuracy}
                                    typingAccuracyMeasure={'%'}
                                    typingSpeed={Math.ceil(typingSpeed/7)}
                                    typingSpeedMeasure={'wpm'}/>
                        }
                        {isContinue && <div className='btn' onClick={startNextExercise}>
                            continue
                        </div>}
                        <div className='btn' onClick={startExerciseAgain}>again</div>
                        <div className='btn' onClick={finishExercise}>stop</div>
                    </div>
                    :
                    <div>
                        <div className='typing-container'>
                            <TypingWindow typingAnalyzeState={typingAnalyzerState} />
                        </div>
                        <div className='keyboard-container'>
                            <Keyboard typingAnalyzeState={typingAnalyzerState}/>
                        </div>
                    </div>
            }
        </div>
    )
}