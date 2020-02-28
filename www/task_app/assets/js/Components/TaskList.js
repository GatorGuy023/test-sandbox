import React, {useContext} from "react"
import {TaskContext} from "./TaskContext"
import Task from "./Task"

function TaskList(props) {
    const {taskList, setTaskList} = useContext(TaskContext)
    
    const deleteTask = (id) => {
        if(confirm("Are you sure you want to delete this?")) {
            fetch(`http://localhost/tasks/${id}`,{
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    setTaskList(prevList => {
                        return prevList.filter(data => data.id !== id)
                    })
                }
            })
        }
    }

    const toggleCompleted = (id) => {
        const data = taskList.find(val => val.id === id)
        const newData = {
            ...data,
            isComplete: !data.isComplete
        }
        fetch(`http://localhost/tasks/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then(response => response.json())
        .then(response => {
            setTaskList(prevTaskList => {
                return prevTaskList.map(data => {
                    if (data.id === id) {
                        return response.task
                    }
                    return data
                })
            })
        })
    }

    const tasks = taskList.map(data => (
        <Task 
            key={data.id} 
            id={data.id} 
            title={data.title} 
            isComplete={data.isComplete} 
            toggleCompleted={toggleCompleted}
            deleteTask={deleteTask}
        />
    ))
    return (
        <>
            {tasks}
        </>
    )
}

export default TaskList