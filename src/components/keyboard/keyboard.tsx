import React, { useState } from 'react'
import { Observable } from 'rxjs'
import { TypingAnalyzerState } from '@domain/typing/analyzer'
import { useObservable } from '@commons/react-hooks/use-observable'
import { isCharacterRequiredShift } from '@commons/characters'

import './keyboard.less';
import {leftShiftKeys} from "./keyboardCharacteristics";
import {keyboardKeys} from "./keyboardCharacteristics";

type Props = {
    typingAnalyzeState: Observable<TypingAnalyzerState>
}
//TODO: ask whether it is correct
type KeyComponentProps = {
    character: string | undefined,
    keyClass: string,
    keyContent1: string,
    keyContent2: string|undefined,
    isShiftActive: boolean|undefined
}


const KeyComponent = (props: KeyComponentProps) => {
    // TODO: optimize logic
    const {character, keyClass, keyContent1, keyContent2, isShiftActive} = props;

    if (keyContent1==='shift') {
        if (keyClass==="left"){
            if (character && leftShiftKeys.includes(character)){
                return (
                    <div className={`key ${isShiftActive ? 'active' : ''}`}>
                        <div className={keyClass}>{keyContent1}</div>
                    </div>
                )
            }
        } else if (keyClass==='right'){
            if (character && !leftShiftKeys.includes(character)){
                return (
                    <div className={`key ${isShiftActive ? 'active' : ''}`}>
                        <div className={keyClass}>{keyContent1}</div>
                    </div>
                )
            }
        }
    }

    if (keyContent2===undefined){
        return (
            <div className={`key ${character === keyContent1.toLowerCase() || character===keyContent1 ? 'active' : ''}`}>
                {console.log(character)}
                <div className={keyClass}>{keyContent1}</div>
            </div>
        )
    }
    return (
        <div className={`key ${character === keyContent1 || character === keyContent2 ? 'active' : ''}`}>
            <div className={keyClass}>{keyContent1}</div>
            <div className={keyClass}>{keyContent2}</div>
        </div>
    )
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
                            { rowKeys.map(keyCharacteristics =>
                                <KeyComponent key={keyCharacteristics.keyContent1} character={character}
                                              keyClass={keyCharacteristics.keyClass}
                                              keyContent1={keyCharacteristics.keyContent1}
                                              keyContent2={keyCharacteristics.keyContent2}
                                              isShiftActive={isShiftActive}
                                />
                            )}
                        </div>
                    )
                }
            )}
        </div>
    )

}