import React, {useState, useContext} from "react"
import {TaskContext} from "../Components/TaskContext"
import {Link} from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import {Formik} from "formik"
import * as yup from "yup"

function Create(props) {
    const [showSuccess, setShowSuccess] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const {setTaskList} = useContext(TaskContext)

    const schema = yup.object({
        title: yup.string()
                .required("Task is required.")
                .max(255, "Task can't be more than 255 characters.")
                .trim("There is white space in the field.")
    })

    return (
        <>
            <h2>Create a New Task</h2>
            <Formik
                validationSchema={schema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    setSubmitting(true)
                    
                    setIsDisabled(true)
                    fetch("http://localhost/tasks", {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    })
                    .then(response => response.json())
                    .then(response => {
                            if (response.success) {
                                setTaskList(prevList => [...prevList, response.task])
                                setShowSuccess(true)
                                resetForm()
                            }
                            setIsDisabled(false)
                            setSubmitting(false)
                        }
                    )
                }}
                initialValues={{
                  title: ""
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        {
                            showSuccess ? (
                                <Alert dismissible variant="success" onClose={() => setShowSuccess(false)}>
                                    The task was created successfully.
                                </Alert>
                            ) : null
                        }
                        <Form.Group controlId="taskTitle" onSubmit={handleSubmit}>
                            <Form.Label>Task</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="title" 
                                placeholder="Enter Task Title"
                                value={values.title}
                                onChange={handleChange}
                                className={touched.title && errors.title ? "error" : null}
                            />
                            {touched.title && errors.title ? (
                                <div className="error-message">{errors.title}</div>
                            ) : null}
                        </Form.Group>

                        <Button disabled={isDisabled} variant="primary" type="submit" style={{margin: "5px"}}>Save</Button>
                        <Button as={Link} to="/" variant="dark" style={{margin: "5px"}}>Back to Home</Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default Create