import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'

import { useField } from '../hooks'

import blogService from '../services/blogs'
import { useNotificationWithTime } from '../NotificationContext'

import Togglable from './Togglable'

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
    newCommentMutation.mutate({ 
      blogId,
      text: comment.value
    })
  }

  const styleDiv = { display: 'flex', gap: `${.5}em` }

  return (
    <Togglable buttonLabel="add comment" ref={commentFormRef}>
      <form onSubmit={handleBlogSubmit}>
        <h2>create new comment</h2>
        <div style={styleDiv}>
          <label htmlFor="comment">comment</label>
          <input id='comment' {...comment} placeholder="write a comment..." />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default CommentForm
