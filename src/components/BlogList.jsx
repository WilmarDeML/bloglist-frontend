import PropTypes from 'prop-types'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogList = (props) => {

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{props.name} logged in <button onClick={props.logout}>logout</button></p>

      <BlogForm handleCreateBlog={props.createBlog} />

      <ul className='blogs'>
        {props.blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            handleUpdateLikes={props.updateLikes}
            handleRemoveBlog={props.removeBlog}
          />
        )}
      </ul>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  createBlog: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  updateLikes: PropTypes.func.isRequired,
}

export default BlogList