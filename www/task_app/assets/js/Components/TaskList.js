import React, {useContext} from "react"
import {TaskContext} from "./TaskContext"
import Task from "./Task"

function TaskList(props) {
    const {taskList, setTaskList} = useContext(TaskContext)
    
    const toggleCompleted = (id) => {
        setTaskList(prevList => {
            return prevList.map(data => {
                if (data.id === id) {
                    return {
                        ...data,
                        isComplete: !data.isComplete
                    }
                }

                return data
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
        />
    ))
    return (
        <>
            {tasks}
        </>
    )
}

export default TaskList