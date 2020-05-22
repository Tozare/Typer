import React from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

export const StudyPage = () => {
    let { path, url } = useRouteMatch();

    return (
        <div>
            <ul>
                <li>
                    <Link to={`${url}/beginner`}>Beginner</Link>
                </li>
                <li>
                    <Link to={`${url}/intermediate`}>Intermediate</Link>
                </li>
                <li>
                    <Link to={`${url}/advanced`}>Advanced</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path}>
                    <h3>Please select your level.</h3>
                </Route>
                <Route path={`${path}/:levelID`}>
                    <h1>lessons according to the level should be here</h1>
                </Route>
            </Switch>
        </div>
    )
}