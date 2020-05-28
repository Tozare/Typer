import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PracticePage } from 'components/pages/practice'
import { StudyPage } from 'components/pages/study'


export const MainPage = () => {
    return (
        <div>
            <Switch>
                <Route path='/practice'>
                    <PracticePage/>
                </Route>
                <Route path='/study'>
                    <StudyPage/>
                </Route>
                <Route path='/'>
                    <h1>home</h1>
                </Route>
            </Switch>
        </div>
    )
}