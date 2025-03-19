import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { toggleLikesOfBlog, deleteBlog } from '../reducers/blogReducer'

import PropTypes from 'prop-types'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)

  const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))

  const showButtonRemove = { display: user?.username === blog.user?.username ? '' : 'none' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const handleRemoveBlog = () => {
    if (!window.confirm(`remove blog '${blog.title}'?`)) return
    dispatch(deleteBlog(blog))
  }

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className='blog-complement'>
        {blog.url} <br />
        likes: {blog.likes} <button onClick={() => dispatch(toggleLikesOfBlog(blog.id))}>like</button> <br />
        {blog.user?.name ?? 'anonymous'} <br />
        <button style={showButtonRemove} className='button-remove' onClick={() => handleRemoveBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog