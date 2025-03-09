import { useState } from 'react'

import blogService from '../services/blogs'

import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({ blogs, name, logout, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    
    const blog = {
      title, author, url
    }

    await blogService.create(blog)

    setBlogs(await blogService.getAll())
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>blogs</h2>
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