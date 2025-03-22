import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'

import { useField } from '../hooks'

import blogService from '../services/blogs'
import { useNotificationWithTime } from '../NotificationContext'

import Togglable from './Togglable'
import { ContainerForm, Container, Subtitle, Input, Button } from '../styles/global'

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

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <ContainerForm onSubmit={handleBlogSubmit}>
        <Subtitle>create new</Subtitle>
        <Container>
          <label htmlFor="title">title</label>
          <Input id='title' {...title} placeholder="write a title..." />
        </Container>
        <Container>
          <label htmlFor="author">author</label>
          <Input id='author' {...author} placeholder="write an author..." />
        </Container>
        <Container>
          <label htmlFor="url">url</label>
          <Input id='url' {...url} placeholder="write a url..." />
        </Container>
        <Button type="submit">create</Button>
      </ContainerForm>
    </Togglable>
  )
}

export default BlogForm
