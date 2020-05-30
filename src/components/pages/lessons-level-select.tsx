import React from 'react'
import { Link } from 'react-router-dom'

export const LessonsLevelSelectPage = () => {
    return (
        <div>
            <h1>please, select your level</h1>
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