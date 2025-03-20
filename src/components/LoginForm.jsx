import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { useLogin } from '../UserContext'
import { useNotificationWithTime } from '../NotificationContext'

import loginService from '../services/login'

import Notification from './Notification'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notificationWithTime = useNotificationWithTime()
  const login = useLogin()  

  const handleError = (error) => {
    const errorMessage = error.response?.data?.error ?? 'error in server, try again later'
    notificationWithTime({ message: errorMessage, error: true }, 5000)
    console.error(error.response?.data?.error ?? error.message)
  }

  const loginUserInState = (user) => {
    login(user)
    setUsername('')
    setPassword('')
  }

  const userLoginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: loginUserInState,
    onError: handleError
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    userLoginMutation.mutate({ username, password })
  }

  return (
  <form onSubmit={handleLogin}>
    <h2>log in to application</h2>

    <Notification />

    <div style={{ display: 'flex', gap: .5 +'em' }}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        data-testid="username"
      />
    </div>
    <div style={{ display: 'flex', gap: .5 +'em' }}>
      <label htmlFor="password">password</label>
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        data-testid="password"
      />
    </div>
    <button type="submit">login</button>
  </form>
)}

export default LoginForm
