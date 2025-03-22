import { Input, Button, ContainerForm, Container } from '../styles/global'
import { useMutation } from '@tanstack/react-query'

import { useLogin } from '../UserContext'
import { useNotificationWithTime } from '../NotificationContext'

import { useField } from '../hooks'

import loginService from '../services/login'

import Notification from './Notification'

const LoginForm = () => {
  const {reset:resetUsername, ...username} = useField('text', 'username')
  const {reset:resetPass, ...password} = useField('password', 'password')

  const notificationWithTime = useNotificationWithTime()
  const login = useLogin()  

  const handleError = (error) => {
    const errorMessage = error.response?.data?.error ?? 'error in server, try again later'
    notificationWithTime({ message: errorMessage, error: true }, 5000)
    console.error(error.response?.data?.error ?? error.message)
  }

  const loginUserInState = (user) => {
    login(user)
    resetUsername('')
    resetPass('')
  }

  const userLoginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: loginUserInState,
    onError: handleError
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    userLoginMutation.mutate({ username: username.value, password: password.value })
  }


  return (
    <ContainerForm onSubmit={handleLogin}>
      <h2>Log in to application</h2>  
      <Notification />  
      <Container>
        <label htmlFor="username">username</label>
        <Input id='username' {...username} data-testid="username" autoComplete='true' />
      </Container>
      <Container>
        <label htmlFor="password">password</label>
        <Input id='password' {...password} data-testid="password" />
      </Container>
      <Button type="submit">Login</Button>
    </ContainerForm>
)}

export default LoginForm
