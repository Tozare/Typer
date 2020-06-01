import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.less'

export const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/practice'>Practice</NavLink>
                </li>
                <li>
                    <NavLink to='/study'>Lessons</NavLink>
                </li>
            </ul>
        </nav>
    )
}