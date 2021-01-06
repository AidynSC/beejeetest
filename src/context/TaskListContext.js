import { createContext } from 'react'

function noop() {}

export const TaskListContext = createContext({
    token: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    tasks: [],
    addTask: noop,
    findItem: noop,
    editTask: noop, 
    editItem: noop,
    totalTaskCount: null,
    changeCurrentPage: noop,
    editedTasks: []
})
