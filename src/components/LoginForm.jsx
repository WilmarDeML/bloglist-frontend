const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <form onSubmit={handleLogin}>
    <h2>log in to application</h2>
    <div style={{display: 'flex', gap: .5 +'em'}}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div style={{display: 'flex', gap: .5 +'em'}}>
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

export default LoginForm