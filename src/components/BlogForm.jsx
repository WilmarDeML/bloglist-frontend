const BlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl }) => (
  <form onSubmit={addBlog}>
    <h2>create new</h2>
    <div style={{display: 'flex', gap: .5 +'em'}}>
      <label htmlFor="title">title</label>
      <input
        type="text"
        value={title}
        name="Username"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    
    <div style={{display: 'flex', gap: .5 +'em'}}>
      <label htmlFor="author">author</label>
      <input
        type="text"
        value={author}
        name="Username"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    
    <div style={{display: 'flex', gap: .5 +'em'}}>
      <label htmlFor="url">url</label>
      <input
        type="text"
        value={url}
        name="Username"
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm