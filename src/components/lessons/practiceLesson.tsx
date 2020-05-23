import React, {useEffect, useState} from 'react'
import { TypingAnalyzer } from '@domain/typing/analyzer'
import { TypingStream } from '@domain/typing/stream'

import { zip } from 'rxjs'
import { finalize, take } from 'rxjs/operators'


import { TypingAnalytics } from 'components/typing-analytics'
import { TypingWindow } from 'components/typing-window'
import { Keyboard } from 'components/keyboard/keyboard'
import { lessonsType } from 'components/lessons/lessons'

type Props = {
    lessons: lessonsType,
    continueStudy: () => void,
    currentExercise: {
        lessonIndex: number,
        exerciseIndex: number
    }
}

export const PracticeLessonPage = (props: Props) => {
    const { lessons, continueStudy, currentExercise } = props
    const { lessonIndex, exerciseIndex } = currentExercise
    const text: string = lessons[lessonIndex].exercises[exerciseIndex].text

    const [typingAnalyzer, initNewTypingAnalyzer] = useState()

    const [state, setState] = useState({
        typingSpeed: 0,
        typingAccuracy: 100,
    })
    const [practice, setPractice] = useState(true)

    useEffect(() => {
        initNewTypingAnalyzer(new TypingAnalyzer(TypingStream.shared().characters, text))
        setPractice(true)
    }, [text])

    const finishExercise = () => {
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
            setPractice(false)
            debugger
        })
    }

    const typingAnalyzerState = typingAnalyzer.state.pipe(
        finalize(finishExercise)
    )

    const { typingSpeed, typingAccuracy } = state
    if (typingAnalyzer === undefined)
        return null
    return (
        <div className='typing-practice'>
            <div className='window'>
                <TypingWindow typingAnalyzeState={typingAnalyzerState} />
                <Keyboard typingAnalyzeState={typingAnalyzerState}/>
            </div>
            <div className='window'>
                {
                    typingSpeed === 0
                        ? null
                        :  <TypingAnalytics
                            typingAccuracy={typingAccuracy}
                            typingAccuracyMeasure={'%'}
                            typingSpeed={Math.ceil(typingSpeed/7)}
                            typingSpeedMeasure={'wpm'}/>
                }
                <button onClick={() => {
                    continueStudy()
                    setPractice(true)
                }}
                >
                    continue
                </button>
                <button>again</button>
                <button>stop</button>
            </div>
        </div>

    )
}