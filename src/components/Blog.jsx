import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Link as LinkStyle } from '../styles/global'

const Blog = ({ blog }) => {

  const noDecoration = { textDecoration: 'none' }
  
  return (    
    <Link style={noDecoration} to={`/blogs/${blog.id}`}>
      <LinkStyle>{blog.title}</LinkStyle>
    </Link>    
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog