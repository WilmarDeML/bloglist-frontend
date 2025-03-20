import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef } from 'react'

import blogService from '../services/blogs'
import { useNotificationWithTime } from '../NotificationContext'

import Togglable from './Togglable'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const notificationWithTime = useNotificationWithTime()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef(null)

  const handleError = (error) => {
    const errorMessage = error.response?.data?.error ?? 'error in server, try again later'
    notificationWithTime({ message: errorMessage, error: true }, 5000)
    console.error(error.response?.data?.error ?? error.message)
  }

  const addNewBlogInState = (newBlog) => {
    const blogs = queryClient.getQueryData(['blogs'])
    queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    blogFormRef.current.toggleVisibility()
    notificationWithTime({ message: `a new blog '${newBlog.title}' added`, error: false }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: addNewBlogInState,
    onError: handleError
  })

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url })
  }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={handleBlogSubmit}>
        <h2>create new</h2>
        <div style={{ display: 'flex', gap: .5 +'em' }}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            value={title}
            name="Username"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write a title..."
          />
        </div>

        <div style={{ display: 'flex', gap: .5 +'em' }}>
          <label htmlFor="author">author</label>
          <input
            type="text"
            value={author}
            name="Username"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write an author..."
          />
        </div>

        <div style={{ display: 'flex', gap: .5 +'em' }}>
          <label htmlFor="url">url</label>
          <input
            type="text"
            value={url}
            name="Username"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write a url..."
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
