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

  useEffect(() => {
    const getAll = async () => {
      setBlogs( await blogService.getAll() )
    }
    getAll()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username, password,
    })
    setUser(user)
    setUsername('')
    setPassword('')
  }

  if (!user) {
    return (
      <LoginForm handleLogin={handleLogin} 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword}
      />
    )
  }

  return (
    <BlogList blogs={blogs} name={user.name} />
  )
}

export default App