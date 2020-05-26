import React from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { Lessons } from 'components/lessons/lessons'

export const StudyPage = () => {
    const { path, url } = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route exact path={path}>
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
                </Route>
                <Route exact path={`${path}/:levelID`}>
                    <Link to={url}>Back to choice level</Link>
                    <Lessons/>
                </Route>
            </Switch>
        </div>
    )
}