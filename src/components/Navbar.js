import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { TaskListContext } from '../context/TaskListContext'

const Navbar = () => {
    const { logout, isAuthenticated } = useContext(TaskListContext)
    const logoutHandler = event => {
        event.preventDefault()
        logout()
    }

    return (
        <nav>
            <div className="nav-wrapper">
            <NavLink className="brand-logo" to="/"><span>Задачник</span></NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {isAuthenticated ? (
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                ) : (
                    <li><NavLink to="/login"><span>Login</span></NavLink></li>
                )}
            </ul>
            </div>
        </nav>
    )
}

export default Navbar
