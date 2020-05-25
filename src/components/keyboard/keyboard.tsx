import React, { useState } from 'react'
import { Observable } from 'rxjs'
import { TypingAnalyzerState } from '@domain/typing/analyzer'
import { useObservable } from '@commons/react-hooks/use-observable'
import { isCharacterRequiredShift } from '@commons/characters'

import './keyboard.less'
import { leftShiftKeys, keyboardKeys } from "./keyboardCharacteristics"
import { Key } from "components/keyboard/key"

type Props = {
    typingAnalyzeState: Observable<TypingAnalyzerState>
}

export const Keyboard = (props: Props) => {
    const { typingAnalyzeState } = props
    const state = useObservable<TypingAnalyzerState | undefined>(typingAnalyzeState)
   // const character =  state?.data[state?.pointer].character
    const character =  state && state.data[state.pointer].character
    const isShiftActive = character && isCharacterRequiredShift(character)
    const [isColoring, setIsColoring] = useState(false)

    return (
        <div>
            <label>
                Coloring:
                <input id='coloring' type='checkbox' checked={isColoring} onChange={() => setIsColoring(!isColoring)}/>
            </label>
            <div className='keyboard'>
                {keyboardKeys.map((rowKeys, index) => {
                    return (
                        <div key={index+1} className={`row-container row${index + 1}`}>
                            {
                                rowKeys.map((keyCharacteristics, index) => {
                                    const { align, content, minorContent } = keyCharacteristics
                                    let isActive = character === content || character === content.toLowerCase() || character === minorContent
                                    if (content === 'shift' && isShiftActive){
                                        if (align === 'left'){
                                            isActive= character!==undefined && !leftShiftKeys.includes(character)
                                        } else {
                                            isActive= character!==undefined && leftShiftKeys.includes(character)
                                        }
                                    }

                                    return (
                                        <Key key={index} isColoring={isColoring} isActive={isActive} {...keyCharacteristics} />
                                    )
                                })
                            }
                        </div>
                    )
                    }
                )}
            </div>
        </div>
    )
}