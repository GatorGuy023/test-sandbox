import React, {createContext, useState, useEffect} from "react"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"

const TaskContext = createContext()

function TaskProvider(props) {
    const [taskList, setTaskList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true)
        fetch("http://localhost/tasks")
            .then(response => response.json())
            .then(response => {
                setTaskList(response.task)
                setIsLoading(false)
            })
    }, [])

    return (
        <TaskContext.Provider value={{taskList, setTaskList}}>
            { isLoading ? (
                <Alert variant="info" className="text-center">
                    Loading...
                    <Spinner animation="border" variant="dark" />
                </Alert>
            ) : props.children }
        </TaskContext.Provider>
    )
}

export {TaskProvider, TaskContext}