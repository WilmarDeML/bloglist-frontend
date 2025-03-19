import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'

import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef(null)

  const handleBlogSubmit = (event) => {
    event.preventDefault()

    dispatch(createBlog({ title, author, url }))
    setTitle('')
    setAuthor('')
    setUrl('')
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