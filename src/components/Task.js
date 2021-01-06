import React, {useContext} from 'react'
import {TaskListContext} from '../context/TaskListContext'

const Task = ({task}) => {
    const { isAuthenticated, findItem, editTask, token } = useContext(TaskListContext)

    const statusHandler = e => {
        const newStatus = e.target.checked
        const data = {
            status: newStatus ? 10 : 0, token
        }
        editTask(task.id, data)
    }

    return (
        <li className="collection-item">
                <p>{task.username}<br/>
                    {task.email}
                </p>
                <span className="title">{task.text}</span>
                <div className="buttons">
                    {isAuthenticated ? (
                        <label onChange={statusHandler}>
                            {task.status === 10 ? (
                                <input type="checkbox" className="filled-in" defaultChecked="checked"/>
                            ) : (
                                <input type="checkbox" className="filled-in" />
                            )}    
                        <span>Завершено</span>
                        </label>
                    ) : (
                        <a href="#!" className="secondary-content">
                            <i className="material-icons">{task.status === 10 ? 'check' : 'close'}</i>
                        </a>
                    )}

                    {isAuthenticated && (
                        <a href="#!" onClick={() => findItem(task.id)} className="secondary-content">
                            <i className="material-icons">edit</i>
                        </a>
                    )}
                </div>
        </li>
    )
}

export default Task
