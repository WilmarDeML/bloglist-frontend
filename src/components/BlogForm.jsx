import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const blogFormRef = useRef(null)
  const dispatch = useDispatch()
  const {reset:resetTitle, ...title} = useField('text', 'title')
  const {reset:resetAuthor, ...author} = useField('text', 'author')
  const {reset:resetUrl, ...url} = useField('text', 'url')

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title: title.value, author: author.value, url: url.value }))
    resetTitle('')
    resetAuthor('')
    resetUrl('')
  }

  const styleDiv = { display: 'flex', gap: `${.5}em` }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={handleBlogSubmit}>
        <h2>create new</h2>
        <div style={styleDiv}>
          <label htmlFor="title">title</label>
          <input id='title' {...title} placeholder="write a title..." />
        </div>
        <div style={styleDiv}>
          <label htmlFor="author">author</label>
          <input id='author' {...author} placeholder="write an author..." />
        </div>
        <div style={styleDiv}>
          <label htmlFor="url">url</label>
          <input id='url' {...url} placeholder="write a url..." />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm