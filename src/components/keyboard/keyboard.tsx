import React, { useState } from 'react'
import { Observable } from 'rxjs'
import { TypingAnalyzerState } from '@domain/typing/analyzer'
import { useObservable } from '@commons/react-hooks/use-observable'
import { isCharacterRequiredShift } from '@commons/characters'

import './keyboard.less';
import { leftShiftKeys, keyboardKeys } from "./keyboardCharacteristics";
import { Key } from "components/keyboard/key";

type Props = {
    typingAnalyzeState: Observable<TypingAnalyzerState>
}

export const Keyboard = (props: Props) => {
    const { typingAnalyzeState } = props
    const state = useObservable<TypingAnalyzerState | undefined>(typingAnalyzeState)
    const character = state?.data[state?.pointer].character
    const isShiftActive = character && isCharacterRequiredShift(character)



    return (
        <div className='keyboard'>
            {keyboardKeys.map((rowKeys,index) => {
                    return (
                        <div key={index+1} className={`row-container row${index + 1}`}>
                            { rowKeys.map(keyCharacteristics => {
                                const { align, content, minorContent } = keyCharacteristics;
                                let isActive = character === content || character === content.toLowerCase() || character === minorContent
                                if (content === 'shift' && isShiftActive){
                                    if (align === 'left'){
                                        isActive= character!==undefined && !leftShiftKeys.includes(character)
                                    } else {
                                        isActive= character!==undefined && leftShiftKeys.includes(character)
                                    }
                                }
                                return (
                                    <Key
                                        key={content}
                                        align={align}
                                        isActive={isActive}
                                        content={content}
                                        minorContent={minorContent}
                                    />
                                )

                            }

                            )}
                        </div>
                    )
                }
            )}
        </div>
    )

}