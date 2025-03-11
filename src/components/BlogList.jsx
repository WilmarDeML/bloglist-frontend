import PropTypes from 'prop-types'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogList = (props) => {

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={props.notificationMessage} err={props.error} />

      <p>{props.name} logged in <button onClick={props.logout}>logout</button></p>

      <BlogForm handleCreateBlog={props.createBlog} />

      {props.blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          handleUpdateLikes={props.updateLikes}
          handleRemoveBlog={props.removeBlog}
        />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  createBlog: PropTypes.func.isRequired,
  error: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  notificationMessage: PropTypes.string,
  removeBlog: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  updateLikes: PropTypes.func.isRequired,
}

export default BlogList