import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword, error, notificationMessage }) => (
  <form onSubmit={handleLogin}>
    <h2>log in to application</h2>

    <Notification message={notificationMessage} err={error} />

    <div style={{ display: 'flex', gap: .5 +'em' }}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div style={{ display: 'flex', gap: .5 +'em' }}>
      <label htmlFor="password">password</label>
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  error: PropTypes.bool,
  notificationMessage: PropTypes.string,
}

export default LoginForm