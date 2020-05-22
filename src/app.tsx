import React from 'react'
import ReactDOM from 'react-dom'
import './app.less'
import { PracticePage } from 'components/pages/practice'
import { Services } from 'services/index'
import * as serviceWorker from './service-worker'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavBar } from "components/nav/nav"
import { MainPage } from "components/pages/main"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Services />
            <NavBar/>
            <MainPage/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
