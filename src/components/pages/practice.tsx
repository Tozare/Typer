import React, { useState } from 'react'
import { TypingAnalyzer } from '@domain/typing/analyzer'
import { TypingStream } from '@domain/typing/stream'
import { TypingWindow } from 'components/typing-window'
import { finalize } from 'rxjs/operators'
import { randomInteger } from '@commons/random-number'
import './practice.less'

const texts = [
    'It’s a remarkable feat for a company that faced a devastating setback in 2014, when its VSS Enterprise spaceplane experienced a catastrophic failure in the middle of a flight leading to the death of one of the vehicle’s copilots.',
    'Richard Branson began his spaceflight company, Virgin Galactic, 14 years ago.',
    'In all that time, the company has experienced several highs, and some crushing lows, but it has never actually gone into space.',
    'SpaceShipTwo is part of a two-part launch system pioneered by Virgin Galactic since its inception',
    'WhiteKnightTwo carries SpaceShipTwo into high altitude, and the latter separates and undergoes a massive thruster burn to head into suborbital space for a short duration.',
]

export const PracticePage = () => {
    const [typingAnalyzer, initNewTypingAnalyzer] = useState(
        new TypingAnalyzer(TypingStream.shared().characters, texts[randomInteger(0, texts.length - 1)])
    )

    const restartPractice = () =>
        initNewTypingAnalyzer(new TypingAnalyzer(TypingStream.shared().characters, texts[randomInteger(0, texts.length - 1)]))

    const typingAnalyzerState = typingAnalyzer.state.pipe(
        finalize(restartPractice)
    )

    return (
        <div className='typing-practice'>
            <div className='window'>
                <TypingWindow typingAnalyzeState={typingAnalyzerState}/>
            </div>
        </div>

    )
}