import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import loginService from './services/login'
import blogService from './services/blogs'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
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
      dispatch(setNotification({ message: errorMessage, error: true }, 5000))
      console.error(err.response?.data?.error ?? err.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  if (!user) {
    return (
      <LoginForm handleLogin={handleLogin}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
      />
    )
  }

  return (
    <BlogList
      logout={handleLogout}
      name={user.name}
    />
  )
}

export default App
