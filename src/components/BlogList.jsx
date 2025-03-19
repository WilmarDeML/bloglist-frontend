import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogList = (props) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{props.name} logged in <button onClick={props.logout}>logout</button></p>

      <BlogForm />

      <ul className='blogs'>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </ul>
    </div>
  )
}

BlogList.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

export default BlogList