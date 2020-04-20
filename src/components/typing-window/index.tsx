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
                    let className = 'letter '
                    if (isActive) {
                        className += 'active '
                        if (character !== ' ') {
                            className += 'underline '
                        }
                    }

                    if (success) {
                        className += 'success '
                    } else if(success === false) {
                        className += 'failure '
                    }
                    return <span className={className}>{character === ' ' ? '␣' : character}</span>
                })
            }
        </div>
    )
}