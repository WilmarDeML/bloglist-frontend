import { useState, useEffect } from 'react'

import { useNotificationWithTime } from './NotificationContext'

import loginService from './services/login'

import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const notificationWithTime = useNotificationWithTime()
  
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      notificationWithTime({ message: errorMessage, error: true }, 5000)
      console.error(err.response?.data?.error ?? err.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleCreateBlog = async (blog, blogFormRef) => {
    try {
      const createdBlog = await blogService.create(blog)

      blogFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(createdBlog))
      notificationWithTime({ message: `a new blog '${blog.title}' added` }, 5000)
      return true
    } catch (error) {
      const errorMessage = error.response?.data?.error ?? 'error saving the blog'
      notificationWithTime({ message: errorMessage, error: true }, 5000)
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
      notificationWithTime({ message: errorMessage, error: true }, 5000)
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
      notificationWithTime({ message: errorMessage, error: true }, 5000)
      console.error(error.response?.data?.error ?? error.message)
    }
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
    <BlogList blogs={blogs.sort((a, b) => b.likes - a.likes)}
      createBlog={handleCreateBlog}
      logout={handleLogout}
      name={user.name}
      removeBlog={handleRemoveBlog}
      setBlogs={setBlogs}
      updateLikes={handleUpdateLikes}
    />
  )
}

export default App