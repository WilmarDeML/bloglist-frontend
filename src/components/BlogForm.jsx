import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'

import { useField } from '../hooks'

import blogService from '../services/blogs'
import { useNotificationWithTime } from '../NotificationContext'

import Togglable from './Togglable'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const notificationWithTime = useNotificationWithTime()

  const {reset:resetTitle, ...title} = useField('text', 'title')
  const {reset:resetAuthor, ...author} = useField('text', 'author')
  const {reset:resetUrl, ...url} = useField('text', 'url')

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
    resetTitle('')
    resetAuthor('')
    resetUrl('')
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: addNewBlogInState,
    onError: handleError
  })

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ 
      title: title.value, 
      author: author.value, 
      url: url.value 
    })
  }

  const styleDiv = { display: 'flex', gap: `${.5}em` }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={handleBlogSubmit}>
        <h2>create new</h2>
        <div style={styleDiv}>
          <label htmlFor="title">title</label>
          <input id='title' {...title} placeholder="write a title..." />
        </div>
        <div style={styleDiv}>
          <label htmlFor="author">author</label>
          <input id='author' {...author} placeholder="write an author..." />
        </div>
        <div style={styleDiv}>
          <label htmlFor="url">url</label>
          <input id='url' {...url} placeholder="write a url..." />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
