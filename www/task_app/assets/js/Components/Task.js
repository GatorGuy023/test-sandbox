import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import {Link} from "react-router-dom"

function Task(props) {
    return (
        <Row className="space">
            <Col xs={1}>
                <input 
                    type="checkbox" 
                    checked={props.isComplete} 
                    onChange={() => props.toggleCompleted(props.id)}
                />
            </Col>
            <Col xs={5} md={7}>{props.title}</Col>
            <Col xs={6} md={4}>
                <ButtonGroup aria-label="Task Actions">
                    <Button as={Link} to={`/edit/${props.id}`} variant="info">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </ButtonGroup>
            </Col>
        </Row>
    )
}

export default Task