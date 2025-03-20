import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import Notification from './Notification'

const LoginForm = () => {
  const {reset:resetUsername, ...username} = useField('text', 'username')
  const {reset:resetPass, ...password} = useField('password', 'password')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username: username.value, password: password.value }))
    resetUsername('')
    resetPass('')
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>  
      <Notification />  
      <div style={{ display: 'flex', gap: .5 +'em' }}>
        <label htmlFor="username">username</label>
        <input id='username' {...username} data-testid="username" autoComplete='true' />
      </div>
      <div style={{ display: 'flex', gap: .5 +'em' }}>
        <label htmlFor="password">password</label>
        <input id='password' {...password} data-testid="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
