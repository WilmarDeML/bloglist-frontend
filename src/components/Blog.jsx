import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdateLikes, handleRemoveBlog }) => {
  const [isVisible, setIsVisible] = useState(false)

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
        likes: {blog.likes} <button onClick={() => handleUpdateLikes(blog)}>like</button> <br />
        {blog.user?.name ?? 'anonymous'} <br />
        <button style={showButtonRemove} className='button-remove' onClick={() => handleRemoveBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdateLikes: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
}

export default Blog