import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, showNotification }) => {
  const [isVisible, setIsVisible] = useState(false)

  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const handleUpdateLikes = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 })
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    } catch (error) {
      const errorMessage = error.response?.data?.error ?? 'error updating likes'
      showNotification(errorMessage, error)
      console.error(error.response?.data?.error ?? error.message)
    }
  }

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes: {blog.likes} <button onClick={handleUpdateLikes}>like</button> <br />
        {blog.user?.name ?? 'anonymous'} <br />
      </div>
    </div>
  )
}

export default Blog