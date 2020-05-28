import React from 'react'
import { Link } from 'react-router-dom'
import './nav.less'

export const NavBar = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/practice'>Practice</Link>
                </li>
                <li>
                    <Link to='/study'>Study</Link>
                </li>
            </ul>
            <hr />
        </div>
    )
}