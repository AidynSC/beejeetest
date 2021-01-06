import React, { useContext, useState, useEffect } from 'react'
import { TaskListContext } from '../context/TaskListContext'
import { useMessage } from '../hooks/message.hook'

const TaskForm = () => {
    const { addTask, editItem, editTask, token } = useContext(TaskListContext)
    const message = useMessage()

    const [form, setForm] = useState({
        username: '', email: '', text: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(!form.email.match(mailformat)) return message('Email невалидный')

        if(!editItem) {
            addTask(form)
            setForm({
                username: '', email: '', text: ''
            })
            message('Задача добавлена!')
        } 
        if (editItem && token) {
            const data = {
                text: form.text + ' (отредактировано администратором)', token
            }
            editTask(editItem.id, data)
            clearForm()
        }
    }

    const disableInputs = (bool) => {
        document.querySelector('#inputUsername').disabled = bool
        document.querySelector('#inputEmail').disabled = bool
    }

    useEffect(() => {
        if(editItem) {
            setForm(editItem)
            disableInputs(true)
        } else {
            setForm({
                username: '', email: '', text: ''
            })
        }
    }, [editItem])

    const clearForm = () => {
        setForm({
            username: '', email: '', text: ''
        })
        disableInputs(false)
    }

    return (
        <div className="row">
            <form onSubmit={handleSubmit} className="col s12">
                <div className="row">
                    <input
                        onChange={changeHandler}
                        value={form.username}
                        name="username"
                        type="text"
                        placeholder="Username"
                        required
                        id="inputUsername"
                    />
                    <input
                        onChange={changeHandler}
                        value={form.email}
                        name="email"
                        type="text"
                        placeholder="Email"
                        required
                        id="inputEmail"
                    />
                    <input
                        onChange={changeHandler}
                        value={form.text}
                        name="text"
                        type="text"
                        placeholder="Text"
                        required
                    />

                    <div className="buttons">
                        <button type="submit" className="btn">
                            {editItem ? 'Edit Task' : 'Add Task' }
                        </button>
                        <button onClick={clearForm} className="btn">
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TaskForm
