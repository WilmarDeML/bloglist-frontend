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

  const handleCreateBlog = async (blog, blogFormRef) => {
    try {
      const createdBlog = await blogService.create(blog)

      blogFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(createdBlog))
      showNotification(`a new blog '${blog.title}' added`)
      return true
    } catch (error) {
      const errorMessage = error.response?.data?.error ?? 'error saving the blog'
      showNotification(errorMessage, error)
      console.error(error.response?.data?.error ?? error.message)
      return false
    }
  }

  const handleUpdateLikes = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 })
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    } catch (error) {
      const errorMessage = error.response?.data?.error ?? 'error updating likes'
      showNotification(errorMessage, error)
      console.error(error.response?.data?.error ?? error.message)
    }
  }

  const handleRemoveBlog = async (blog) => {
    if (!window.confirm(`remove blog '${blog.title}'?`)) {
      return
    }

    try {
      await blogService.remove(blog.id)
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs)
    } catch (error) {
      const errorMessage = error.response?.data?.error ?? 'error removing blog'
      showNotification(errorMessage, error)
      console.error(error.response?.data?.error ?? error.message)
    }
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
    <BlogList blogs={blogs.sort((a, b) => b.likes - a.likes)}
      createBlog={handleCreateBlog}
      error={error}
      logout={handleLogout}
      name={user.name}
      notificationMessage={notificationMessage}
      removeBlog={handleRemoveBlog}
      setBlogs={setBlogs}
      showNotification={showNotification}
      updateLikes={handleUpdateLikes}
    />
  )
}

export default App