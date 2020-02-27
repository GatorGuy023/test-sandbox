import '../../css/app.css'
import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TaskList from "./TaskList"
import {Switch, Route} from "react-router-dom"
import Home from "../Pages/Home"
import Create from "../Pages/Create"
import Edit from "../Pages/Edit"

function App(props) {
    return (
        <div>
            <header>
                <h1 className="text-center">Task App</h1>
            </header>
            <main>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs md={10} className="border white round">
                            <Switch>
                                <Route path="/" exact><Home /></Route>
                                <Route path="/create"><Create /></Route>
                                <Route path="/edit/:id"><Edit /></Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>Developed by Richard Perez</footer>
        </div>
    )
}

export default App