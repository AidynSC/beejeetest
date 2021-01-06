import React, { useContext } from 'react'
import { TaskListContext } from '../context/TaskListContext'

export const Pagination = () => {
    const { totalTaskCount, changeCurrentPage } = useContext(TaskListContext)

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalTaskCount / 3); i++) {
        pageNumbers.push(i)
    }

    return (
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="waves-effect">
                        <button onClick={() => changeCurrentPage(number)} className="page-link waves-teal btn-flat">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
    )
}