import { useQuery } from '@tanstack/react-query'

import blogService from '../services/blogs'

import styled from 'styled-components'

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

      <Ul className='blogs'>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </Ul>
    </div>
  )
}

export default BlogList

const Ul = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`
