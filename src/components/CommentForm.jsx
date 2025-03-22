import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'

import { useField } from '../hooks'

import blogService from '../services/blogs'
import { useNotificationWithTime } from '../NotificationContext'

import Togglable from './Togglable'

import { ContainerForm, Button, Container } from '../styles/global'
import styled from 'styled-components'

const CommentForm = ({ blogId }) => {
  const queryClient = useQueryClient()
  const notificationWithTime = useNotificationWithTime()

  const {reset:resetComment, ...comment} = useField('text', 'comment')

  const commentFormRef = useRef(null)

  const handleError = (error) => {
    const errorMessage = error.response?.data?.error ?? 'error in server, try again later'
    notificationWithTime({ message: errorMessage, error: true }, 5000)
    console.error(error.response?.data?.error ?? error.message)
  }

  const addNewCommentInState = (newComment) => {
    const blogs = queryClient.getQueryData(['blogs'])
    const updatedBlogs = 
      blogs.map(b => b.id === newComment.blogId 
        ? {...b, comments: [...b.comments, newComment.text]} 
        : b
      )
    queryClient.setQueryData(['blogs'], updatedBlogs)
    commentFormRef.current.toggleVisibility()
    notificationWithTime({ message: `a new comment '${newComment.text}' added`, error: false }, 5000)
    resetComment('')
  }

  const newCommentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: addNewCommentInState,
    onError: handleError
  })

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    const text = comment.value?.trim()
    if (!text) return
    newCommentMutation.mutate({ blogId, text })
  }

  const styleDiv = { display: 'flex', gap: `${.5}em` }

  return (
    <Togglable buttonLabel="add comment" ref={commentFormRef}>
      <ContainerForm onSubmit={handleBlogSubmit}>
        <h2>create new comment</h2>
        <Container style={styleDiv}>
          <label htmlFor="comment">comment</label>
          <TextArea 
            id='comment' {...comment} 
            placeholder="write a comment..."
            rows={5}
            cols={30}
          />
        </Container>
        <Button type="submit">create</Button>
      </ContainerForm>
    </Togglable>
  )
}

export default CommentForm

const TextArea = styled.textarea`
  font-family: Krona One, sans-serif;
  font-size: .9em;
  border: 1px solid #03045e;
  border-radius: 0.7em;
  padding: 0.7em;
  background: #caf0f8;j
  max-height: 200px;
  resize: horizontal;
`
