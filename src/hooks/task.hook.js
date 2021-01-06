import { useCallback, useState, useEffect } from 'react'
import { useAuth } from './auth.hook'
import { useHttp } from './http.hook'
import { useMessage } from './message.hook'

export const useTask = () => {
    const { request } = useHttp()
    const { checkAuth } = useAuth()
    const message = useMessage()
    const [editItem, setEditItem] = useState(null)
    const [tasks, setTasks] = useState([])
    const [totalTaskCount, setTotalTaskCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortField, setSortField] = useState('id')
    const [sortDirection, setSortDirection] = useState('asc')
    const [editedTasks, setEditedTasks] = useState([])

    const getTasks = useCallback(async () => {
        const fetched = await request('', 'GET', null, '&sort_field=' + sortField + '&sort_direction=' + sortDirection + '&page=' + currentPage)
        if (fetched.status === 'ok') {
            setTasks(fetched.message.tasks)
            setTotalTaskCount(fetched.message.total_task_count)
            return fetched
        }
        return message('Не удалось получить список задач')
    }, [request, sortField, sortDirection, currentPage, message])

    const addTask = useCallback(async body => {
        const newTask = await request('create', 'POST', body)
        if (newTask.status === 'ok') {
            getTasks()
        } else {
            return message('Не удалось создать задачу')
        }
    }, [request, getTasks, message])

    
    const findItem = id => {
        const item = tasks.find(task => task.id === id)
        setEditItem(item)
    } 


    const editTask = useCallback(async (id, body) => {
        const token = checkAuth()
        if (token) {
            const response = await request('edit/' + id, 'POST', body)
            setEditItem(null)
            getTasks()
            if (response.status === 'ok') {
                setEditedTasks([...editedTasks, id])
                return message('Задача изменена!')
            }
            return message('Что-то пошло не так')
        } else {
            return message('Авторизуйтесь')
        }
       
    }, [request, getTasks, checkAuth, message, setEditedTasks, editedTasks])


    const changeCurrentPage = useCallback(pageNumber => {
        setCurrentPage(pageNumber)
    }, [])

    const sortTasksByValue = useCallback(sortValue => {
        setSortField(sortValue)
    }, [])

    const sortTasksByOrder = useCallback(sortOrder => {
        setSortDirection(sortOrder)
    }, [])


    useEffect(() => {
        async function fetchData() {
            const response = await getTasks()
            setTasks(response.message.tasks)
        }
        fetchData()
    }, [getTasks, addTask, editTask, changeCurrentPage])

    return { tasks, addTask, findItem, editItem, editTask, totalTaskCount, changeCurrentPage, sortTasksByValue, sortTasksByOrder, editedTasks }
}