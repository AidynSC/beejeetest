import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/auth.hook'
import AuthPage from '../pages/AuthPage'
import TaskPage from '../pages/TaskPage'
import { TaskListContext } from '../context/TaskListContext'
import { useTask } from '../hooks/task.hook'
import Navbar from './Navbar'
import 'materialize-css'

function App() {
  const { token, login, logout } = useAuth()
  const { tasks, addTask, findItem, editTask, editItem, totalTaskCount, changeCurrentPage, sortTasksByValue, sortTasksByOrder } = useTask()
  const isAuthenticated = !!token
  
  return (
    <TaskListContext.Provider value={{
      token, login, logout, isAuthenticated, tasks, addTask, findItem, editTask, editItem, totalTaskCount, changeCurrentPage, sortTasksByValue, sortTasksByOrder
    }}>
      <Router>
        <Navbar />
        <Switch>
            <Route path="/login" exact>
                <AuthPage />
            </Route>
            <Route path="/" exact>
                <TaskPage />
            </Route>
            <Redirect to="/" />
        </Switch>
      </Router>
    </TaskListContext.Provider>
  );
}

export default App;
