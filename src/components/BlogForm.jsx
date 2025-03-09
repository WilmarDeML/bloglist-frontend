import { useState, useRef } from 'react'

import blogService from '../services/blogs'

import Togglable from './Togglable'

const BlogForm = ({ blogs, setBlogs, showNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const noteFormRef = useRef(null)

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    
    const blog = {
      title, author, url
    }

    try {
      const createdBlog = await blogService.create(blog)
  
      noteFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(createdBlog))
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
    <Togglable buttonLabel="new blog" ref={noteFormRef}>
      <form onSubmit={handleBlogSubmit}>
        <h2>create new</h2>
        <div style={{display: 'flex', gap: .5 +'em'}}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            value={title}
            name="Username"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        
        <div style={{display: 'flex', gap: .5 +'em'}}>
          <label htmlFor="author">author</label>
          <input
            type="text"
            value={author}
            name="Username"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        
        <div style={{display: 'flex', gap: .5 +'em'}}>
          <label htmlFor="url">url</label>
          <input
            type="text"
            value={url}
            name="Username"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm