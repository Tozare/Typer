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
    currentExercise: {
        lessonIndex: number,
        exerciseIndex: number
    }
    continueStudy: () => string,
    finishExercise: () => void
}

export const PracticeLessonPage = (props: Props) => {
    const { lessons, currentExercise, continueStudy, finishExercise } = props
    const { lessonIndex, exerciseIndex } = currentExercise

    let text = lessons[lessonIndex].exercises[exerciseIndex].text

    const [typingAnalyzer, initNewTypingAnalyzer] = useState(new TypingAnalyzer(TypingStream.shared().characters, text))

    const [state, setState] = useState({
        typingSpeed: 0,
        typingAccuracy: 100,
    })
    const [showMenu, setShowMenu] = useState(false)

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
            setShowMenu(true)
        })
    }

    const startNextExercise = () => {
        text = continueStudy()
        initNewTypingAnalyzer(new TypingAnalyzer(TypingStream.shared().characters, text))
        setShowMenu(false)
    }

    const startExerciseAgain = () => {
        initNewTypingAnalyzer(new TypingAnalyzer(TypingStream.shared().characters, text))
        setShowMenu(false)
    }

    const typingAnalyzerState = typingAnalyzer.state.pipe(
        finalize(finalizeExercise)
    )

    const { typingSpeed, typingAccuracy } = state
    if (typingAnalyzer === undefined)
        return null
    return (
        <div className='typing-practice'>
            <h1>{lessons[lessonIndex].name} and {exerciseIndex+1} exercise</h1>
            {
                showMenu ?
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
                        <hr/>
                        <button onClick={startNextExercise}>
                            continue
                        </button>
                        <button onClick={startExerciseAgain}>again</button>
                        <button onClick={finishExercise}>stop</button>
                    </div>
                    :
                    <div className='window'>
                        <TypingWindow typingAnalyzeState={typingAnalyzerState} />
                        <Keyboard typingAnalyzeState={typingAnalyzerState}/>
                    </div>
            }

        </div>

    )
}