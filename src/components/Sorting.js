import React, { useContext } from 'react'
import { TaskListContext } from '../context/TaskListContext'

export const Sorting = () => {
    const { sortTasksByValue, sortTasksByOrder } = useContext(TaskListContext)

    const sortValueHandler = e => {
        sortTasksByValue(e.target.value)
    }

    const sortOrderHandler = e => {
        sortTasksByOrder(e.target.value)
    }
    

    return (
        <div className="sorting">
            <span>Сортировать по</span>
            <form action="#" onChange={sortValueHandler}>
                <p>
                <label>
                    <input name="group1" value="username" type="radio" />
                    <span>Имени пользователя</span>
                </label>
                </p>
                <p>
                <label>
                    <input name="group1" value="email" type="radio" />
                    <span>Email</span>
                </label>
                </p>
                <p>
                <label>
                    <input name="group1" value="status" type="radio" />
                    <span>Статусу</span>
                </label>
                </p>
            </form>
            <form action="#" onChange={sortOrderHandler}>
                {/* <span>Сортировать по</span> */}
                <p>
                <label>
                    <input name="group2" value="asd" type="radio" />
                    <span>Возрастанию</span>
                </label>
                </p>
                <p>
                <label>
                    <input name="group2" value="desc" type="radio" />
                    <span>Убыванию</span>
                </label>
                </p>
            </form>
        </div>
        

    )
}