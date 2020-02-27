import React, {useState} from "react"
import {Link} from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {Formik} from "formik"
import * as yup from "yup"

function Create(props) {
    const [showSuccess, setShowSuccess] = useState(false)

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
                    
                    setShowSuccess(true)

                    // Resets form after submission is complete
                    resetForm()
        
                    // Sets setSubmitting to false after form is reset
                    setSubmitting(false)
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

                        <Button variant="primary" type="submit">Save</Button>
                        <Button as={Link} to="/" variant="dark">Back to Home</Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default Create