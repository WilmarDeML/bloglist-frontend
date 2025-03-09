import { useState, useEffect } from 'react'

import loginService from './services/login'

import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    const getAll = async () => {
      setBlogs( await blogService.getAll() )
    }
    getAll()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (err) {
      const errorMessage = err.response?.data?.error ?? 'server error, please try again'
      showNotification(errorMessage, err)
      console.error(err.response?.data?.error ?? err.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const showNotification = (message, err) => {
    setNotificationMessage(message)
    setError(err)
    setTimeout(() => setNotificationMessage(''), 5000)
  }

  if (!user) {
    return (
      <LoginForm handleLogin={handleLogin}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
        error={error}
        notificationMessage={notificationMessage}
      />
    )
  }

  return (
    <BlogList logout={handleLogout}
      blogs={blogs.sort((a, b) => b.likes - a.likes)} setBlogs={setBlogs}
      name={user.name}
      showNotification={showNotification}
      error={error}
      notificationMessage={notificationMessage}
    />
  )
}

export default App