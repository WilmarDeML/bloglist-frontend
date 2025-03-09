import { useState } from 'react'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)

  const showWhenVisible = { display: isVisible ? '' : 'none' }

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes: {blog.likes} <button>like</button> <br />
        {blog.user?.name ?? 'anonymous'} <br />
      </div>
    </div>
  )
}

export default Blog