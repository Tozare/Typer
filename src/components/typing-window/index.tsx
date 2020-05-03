import React, { useState } from 'react'
import { Observable } from 'rxjs'
import { TypingAnalyzerState } from '@domain/typing/analyzer'
import { useObservable } from '@commons/react-hooks/use-observable'
import './index.less'
import { SupportedCharacter } from '@commons/characters'

type Props = {
    typingAnalyzeState: Observable<TypingAnalyzerState>
}

export const TypingWindow = (props: Props) => {
    const { typingAnalyzeState } = props
    const state = useObservable<TypingAnalyzerState | undefined>(typingAnalyzeState)

    if (state === undefined) {
        // TODO: Return placeholder
        return null
    }

    const { data, pointer } = state
    const words = data.reduce((words, it, index ) => {
        words[words.length - 1].push({
            ...it,
            active: index === pointer
        })
        if (it.character === ' ') {
            words.push([])
        }

        return words
    // TODO: Fix typing
    }, [[]] as { character: SupportedCharacter, success?: boolean, active: boolean }[][])

    return (
        <div className='typing-window'>
            {
                words.map((word) => {
                    return (
                        <div className={'word'}>
                            {
                                word.map((wordItem) => {
                                    const { success, character, active } = wordItem
                                    let characterBoxClassName = 'character-box '
                                    let characterClassName = 'character '
                                    if (active) {
                                        characterBoxClassName += 'active '
                                        characterClassName += 'active '
                                    }

                                    if (success) {
                                        characterBoxClassName += 'success '
                                        characterClassName += 'success '
                                    } else if(success === false) {
                                        characterBoxClassName += 'failure '
                                        characterClassName += 'failure '
                                    }

                                    // TODO: Fix it
                                    if (character === ' ') {
                                        characterClassName += 'hotfix-set-transparent '
                                    }

                                    return (
                                        <div className={characterBoxClassName}>
                                            <span className={characterClassName}>{character === ' ' ? '␣' : character}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}