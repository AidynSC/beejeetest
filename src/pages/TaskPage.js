import React from 'react'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import { Pagination } from '../components/Pagination'
import { Sorting } from '../components/Sorting'

const TaskPage = () => {
    return (
        <div>
            <div className="container">
                <TaskForm />
                <Sorting />
                <TaskList />
                <Pagination />
            </div>
        </div>
    )
}

export default TaskPage
