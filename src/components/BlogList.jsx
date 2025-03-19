import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../reducers/userReducer'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{user?.name} logged in <button onClick={() => dispatch(logout())}>logout</button></p>

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