import React from 'react'
import { Link } from 'react-router-dom'
import './lessons-level-select.less'

export const LessonsLevelSelectPage = () => {
    return (
        <div className='lessons-level-select-container'>
            <div className='title'>Available levels:</div>
            <ul>
                <li>
                    <Link to={'study/beginner'}>Beginner</Link>
                </li>
                <li>
                    <Link to={'study/intermediate'}>Intermediate</Link>
                </li>
                <li>
                    <Link to={'study/advanced'}>Advanced</Link>
                </li>
            </ul>
        </div>
    )
}