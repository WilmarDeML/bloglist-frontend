import Blog from './Blog'

const BlogList = ({ blogs, name, logout }) => (
  <div>
    <h2>blogs</h2>
    <p>{name} logged in <button onClick={logout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
)

export default BlogList