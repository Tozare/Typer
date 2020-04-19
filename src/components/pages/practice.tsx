import React, { Component } from 'react'
import { TypingAnalyzer, TypingAnalyzerState } from '@domain/typing/analyzer'
import { TypingStream } from '@domain/typing/stream'
import './practice.less'

export class PracticePage extends Component {
    state: TypingAnalyzerState  = {
        pointer: 0,
        data: []
    }

    componentDidMount() {
        const typingAnalyzer = new TypingAnalyzer(TypingStream.shared().characters, 'The self-study lessons in this section are written and organised according to the levels of the Common European Framework of Reference for languages (CEFR). There are different types of texts and interactive exercises that practise the reading skills you need to do well in your studies, to get ahead at work and to communicate in English in your free time.')
        typingAnalyzer.data.subscribe(({ data, pointer }) => {
            this.setState({
                data,
                pointer
            })
        })

    }

    componentWillUnmount() {
        // TODO: Unsubscribe
        // TODO: Keys stream as Service
    }

    render() {
        const { data, pointer } = this.state

        return (
            <div className='typing-practice'>
                {
                    data.map((it, index) => {
                        const isActive = pointer === index
                        const { success, character } = it
                        let className = ''
                        if (isActive) {
                            className += 'active '
                        }

                        if (success) {
                            className += 'success '
                        } else if(success === false) {
                            className += 'failure '
                        }
                        return <span className={className}>{character}</span>
                    })
                }
            </div>

        )
    }
}