import '../css/app.css';
import React from "react"
import ReactDOM from "react-dom"
import App from "./Components/App"
import {BrowserRouter as Router} from "react-router-dom"
import {TaskProvider} from "./Components/TaskContext"

ReactDOM.render(
    <Router>
        <TaskProvider>
            <App/>
        </TaskProvider>
    </Router>, document.getElementById("root"))