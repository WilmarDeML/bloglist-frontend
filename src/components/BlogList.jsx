import { useQuery } from '@tanstack/react-query'

import blogService from '../services/blogs'

import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = () => {

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 2,
    initialData: []
  })

  if ( result.isError ) {
    return <strong>blogs service not available due to problems in server</strong>
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <BlogForm />

      <ul className='blogs'>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </ul>
    </div>
  )
}

export default BlogList
