import PropTypes from 'prop-types'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogList = ({ logout, blogs, setBlogs, name, showNotification, error, notificationMessage }) => {

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} err={error} />

      <p>{name} logged in <button onClick={logout}>logout</button></p>

      <BlogForm blogs={blogs} setBlogs={setBlogs} showNotification={showNotification} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          blogs={blogs} setBlogs={setBlogs}
          showNotification={showNotification}
        />
      )}
    </div>
  )
}

BlogList.propTypes = {
  logout: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  showNotification: PropTypes.func.isRequired,
  error: PropTypes.bool,
  notificationMessage: PropTypes.string,
}

export default BlogList