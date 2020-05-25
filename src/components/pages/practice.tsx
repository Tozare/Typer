import React, { useState } from 'react'
import { TypingAnalyzer } from '@domain/typing/analyzer'
import { TypingStream } from '@domain/typing/stream'
import { TypingWindow } from 'components/typing-window'
import { TypingAnalytics } from 'components/typing-analytics'
import { zip } from 'rxjs'
import { finalize, take } from 'rxjs/operators'
import { randomInteger } from '@commons/random-number'
import './practice.less'
import { Keyboard } from "components/keyboard/keyboard"

const texts = [
    "a"
    // 'He liked to play with words in the bathtub.',
    // 'He decided to live his life by the big beats manifesto.',
    // 'He wore the surgical mask in public not to keep from catching a virus, but to keep people away from him.',
    // 'This is the last random sentence I will be writing and I am going to stop mid-sent',
    // 'Everyone was busy, so I went to the movie alone.',
    // 'He set out for a short walk, but now all he could see were mangroves and water were for miles.',
    // 'The tour bus was packed with teenage girls heading toward their next adventure.',
    // 'Dan took the deep dive down the rabbit hole.',
    // 'As you consider all the possible ways to improve yourself and the world, you notice John Travolta seems fairly unhappy.',
    // 'The river stole the gods.',
    // 'I covered my friend in baby oil.',
    // 'Tom got a small piece of pie.',
    // 'I want more detailed information.',
    // 'Grape jelly was leaking out the hole in the roof.',
    // 'Eating eggs on Thursday for choir practice was recommended.',
    // 'When nobody is around, the trees gossip about the people who have walked under them.',
    // 'Love is not like pizza.',
    // 'One small action would change her life, but whether it would be for better or for worse was yet to be determined.',
    // 'He wondered why at 18 he was old enough to go to war, but not old enough to buy cigarettes.',
    // 'He went back to the video to see what had been recorded and was shocked at what he saw.',
    // 'Please wait outside of the house.',
    // 'He poured rocks in the dungeon of his mind.',
    // 'He learned the hardest lesson of his life and had the scars, both physical and mental, to prove it.',
]

export const PracticePage = () => {
    // TODO: Remove instance of TypingAnalyzer from state
    const [typingAnalyzer, initNewTypingAnalyzer] = useState(
        new TypingAnalyzer(TypingStream.shared().characters, texts[randomInteger(0, texts.length - 1)])
    )

    const [state, setState] = useState({
        typingSpeed: 0,
        typingAccuracy: 100,
    })

    const restartPractice = () => {
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
            initNewTypingAnalyzer(new TypingAnalyzer(TypingStream.shared().characters, texts[randomInteger(0, texts.length - 1)]))
        })
    }

    const typingAnalyzerState = typingAnalyzer.state.pipe(
        finalize(restartPractice)
    )

    const { typingSpeed, typingAccuracy } = state

    return (
        <div className='typing-practice'>
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
                <TypingWindow typingAnalyzeState={typingAnalyzerState} />
            </div>
            <div className='keyboard-container'>
                <Keyboard typingAnalyzeState={typingAnalyzerState}/>
            </div>
        </div>
    )
}