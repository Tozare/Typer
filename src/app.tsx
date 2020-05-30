import React from 'react'
import ReactDOM from 'react-dom'
import './app.less'
import { Services } from 'services/index'
import * as serviceWorker from './service-worker'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from 'components/nav/nav'
import { PracticePage } from 'components/pages/practice'
import { LessonsLevelSelectPage } from 'components/pages/lessons-level-select'
import { LessonsPage } from 'components/pages/lessons'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Services />
            <NavBar/>
            <Switch>
                <Route path='/practice' component={PracticePage} />
                <Route path='/study/:levelID' component={LessonsPage} />
                <Route path='/study' component={LessonsLevelSelectPage} />
                <Route path='/'>
                    <h1>home</h1>
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
