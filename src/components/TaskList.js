import React, { useContext, useEffect, useState } from 'react'
import { TaskListContext } from '../context/TaskListContext'
import Task from './Task'

const TaskList = () => {
    const [taskList, setTaskList] = useState([])
    const {tasks} = useContext(TaskListContext)

    useEffect(() => {
        setTaskList(tasks)
    }, [tasks])

    return (
        <div>
            {taskList.length ? (
            <ul className="collection">
                {taskList.map((task) => {
                    return <Task task={task} key={task.id}/>
                })}
            </ul>
            ) : (
                <div className="no-tasks">Задач нет</div>
            )}
        </div>
    )
}

export default TaskList
