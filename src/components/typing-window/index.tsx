import React, { useState, useEffect } from 'react'
import { Observable } from 'rxjs'
import { TypingAnalyzerState } from '@domain/typing/analyzer'
import './index.less'

type Props = {
    typingAnalyzeState: Observable<TypingAnalyzerState>
}

export const TypingWindow = (props: Props) => {
    const { typingAnalyzeState } = props
    const [state, setState] = useState<TypingAnalyzerState>()

    // TODO: double rendering ?
    useEffect(
        () => {
            const subscription = typingAnalyzeState.subscribe((state) => {
                console.log('setState', state)
                setState({ ...state })
            })
            return () => {
                subscription && subscription.unsubscribe()
            }
        },
        [typingAnalyzeState]
    )

    if (state === undefined) {
        // TODO: Return placeholder
        return null
    }

    const { data, pointer } = state

    return (
        <div className='typing-window'>
            {
                data.map((it, index) => {
                    const isActive = pointer === index
                    const { success, character } = it
                    let characterBoxClassName = 'character-box '
                    let characterClassName = 'character '
                    if (isActive) {
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
}