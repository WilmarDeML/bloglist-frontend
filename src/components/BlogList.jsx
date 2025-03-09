import { useState } from 'react'

import blogService from '../services/blogs'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogList = ({ logout, blogs, setBlogs, name, showNotification, error, notificationMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    
    const blog = {
      title, author, url
    }

    try {
      await blogService.create(blog)
  
      setBlogs(await blogService.getAll())
      setTitle('')
      setAuthor('')
      setUrl('')
      showNotification(`a new blog '${blog.title}' added`)
    } catch (error) {
      const errorMessage = error.response?.data?.error ?? 'error saving the blog'
      showNotification(errorMessage, error)
      console.error(error.response?.data?.error ?? error.message)
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} err={error} />

      <p>{name} logged in <button onClick={logout}>logout</button></p>

      <BlogForm addBlog={handleBlogSubmit}
        title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList