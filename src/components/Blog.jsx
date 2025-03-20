import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'
import { useNotificationWithTime } from '../NotificationContext'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const queryClient = useQueryClient()
  const notificationWithTime = useNotificationWithTime()

  const handleError = (error) => {
    const errorMessage = error.response?.data?.error ?? 'error in server, try again later'
    notificationWithTime({ message: errorMessage, error: true }, 5000)
    console.error(error.response?.data?.error ?? error.message)
  }

  const updateLikesInState = (updatedBlog) => {
    const blogs = queryClient.getQueryData(['blogs'])
    queryClient.setQueryData(['blogs'], blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }
  
  const deleteBlogInState = () => {
    const blogs = queryClient.getQueryData(['blogs'])
    const updatedBlogs = blogs.filter(b => b.id !== blog.id)
    queryClient.setQueryData(['blogs'], updatedBlogs)
    notificationWithTime({ message: `blog '${blog.title}' removed`, error: false }, 5000)
  }
  
  const updateLikesMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: updateLikesInState,
    onError: handleError
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: deleteBlogInState,
    onError: handleError
  })

  const handleUpdateLikes = () => updateLikesMutation.mutate({id: blog.id, blog: { likes: blog.likes + 1 }})
  const handleRemoveBlog = () => {
    if (window.confirm(`are you sure you want to remove blog '${blog.title}'?`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))

  const showButtonRemove = { display: user?.username === blog.user?.username ? '' : 'none' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className='blog-complement'>
        {blog.url} <br />
        likes: {blog.likes} <button onClick={handleUpdateLikes}>like</button> <br />
        {blog.user?.name ?? 'anonymous'} <br />
        <button style={showButtonRemove} className='button-remove' onClick={handleRemoveBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog