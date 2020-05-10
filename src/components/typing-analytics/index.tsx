import React from 'react'
import './index.less'

type Props = {
    typingSpeed: number
    typingAccuracy: number
    typingSpeedMeasure: 'wpm' | 'characters'
    typingAccuracyMeasure: '%'
    errors?: number
}

export const TypingAnalytics = (props: Props) => {
    const {
        typingSpeed,
        typingAccuracy,
        typingSpeedMeasure,
        typingAccuracyMeasure
    } = props

    return (
        <div className='typing-analytics'>
            <span>Your speed for previous screen was </span>
            <b>{typingSpeed}{typingSpeedMeasure} </b>
            <span>with</span>
            <br/>
            <b>{typingAccuracy}{typingAccuracyMeasure} </b>
            <span>accuracy.</span>
        </div>
    )
}