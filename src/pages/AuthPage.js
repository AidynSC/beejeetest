import React, { useContext, useState, useEffect } from 'react'
import { TaskListContext } from '../context/TaskListContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useHistory } from 'react-router-dom'

const AuthPage = () => {
    const history = useHistory()
    const message = useMessage()
    const { login } = useContext(TaskListContext)
    const { request } = useHttp()
    const [form, setForm] = useState({
        username: '', password: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('login', 'POST', {...form})
            if(data.status === 'error') {
                if (form.username === '' || form.password === '') return message('Заполните все поля')
                return message(data.message.password)
            }
            login(data.message.token)
            history.push('/')
        } catch (e) {}
    }

    return (
        <div>
            <div className="row">
                <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                    <input id="username" name="username" value={form.username} type="text" onChange={changeHandler} />
                    <label htmlFor="username">Логин</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="password" name="password" value={form.password} type="password" onChange={changeHandler} />
                    <label htmlFor="password">Пароль</label>
                    </div>
                </div>
                </form>
            </div>

            <button className="btn" onClick={loginHandler}>
                Login
            </button>
        </div>
    )
}

export default AuthPage
