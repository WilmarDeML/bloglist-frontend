import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

import Togglable from './Togglable'

const BlogForm = ({ handleCreateBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const noteFormRef = useRef(null)

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const blog = {
      title, author, url
    }

    if (await handleCreateBlog(blog, noteFormRef)) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <Togglable buttonLabel="new blog" ref={noteFormRef}>
      <form onSubmit={handleBlogSubmit}>
        <h2>create new</h2>
        <div style={{ display: 'flex', gap: .5 +'em' }}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            value={title}
            name="Username"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: .5 +'em' }}>
          <label htmlFor="author">author</label>
          <input
            type="text"
            value={author}
            name="Username"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: .5 +'em' }}>
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

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
}

export default BlogForm