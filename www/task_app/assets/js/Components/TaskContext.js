import React, {createContext, useState} from "react"
import tasks from "../tasksObj"

const TaskContext = createContext()

function TaskProvider(props) {
    const [taskList, setTaskList] = useState(tasks)

    return (
        <TaskContext.Provider value={{taskList, setTaskList}}>
            {props.children}
        </TaskContext.Provider>
    )
}

export {TaskProvider, TaskContext}