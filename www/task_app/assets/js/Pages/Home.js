import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import TaskList from "../Components/TaskList"
import {Link} from "react-router-dom"

function Home(props) {
    return (
        <>
            <Row className="space">
                <Col xs={{span: 6, offset: 6}} md={{span: 4, offset: 8}}>
                    <Button as={Link} to="/create" variant="success">Create Task</Button>
                </Col>
            </Row>
            <Row className="space">
                <Col xs={1}>Done</Col>
                <Col xs={5} md={7}>Description</Col>
                <Col xs={6} md={4}>Actions</Col>
            </Row>
            <TaskList />
        </>
    )
}

export default Home