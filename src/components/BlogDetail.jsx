import { useQuery } from "@tanstack/react-query"
import { useMatch, useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationWithTime } from '../NotificationContext'
import blogService from '../services/blogs'
import CommentList from "./CommentList"

const BlogDetail = () => {
  const match = useMatch('/blogs/:id')
  const notificationWithTime = useNotificationWithTime()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleError = (error) => {
    const errorMessage = error.response?.data?.error ?? 'error in server, try again later'
    notificationWithTime({ message: errorMessage, error: true }, 5000)
    console.error(error.response?.data?.error ?? error.message)
  }

  const updateLikesInState = (updatedBlog) => {
    const blogs = queryClient.getQueryData(['blogs'])
    queryClient.setQueryData(['blogs'], blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const deleteBlogInState = () => {
    const blogs = queryClient.getQueryData(['blogs'])
    const updatedBlogs = blogs.filter(b => b.id !== blog.id)
    queryClient.setQueryData(['blogs'], updatedBlogs)
    notificationWithTime({ message: `blog '${blog.title}' removed`, error: false }, 5000)
    navigate('/')
  }

  const updateLikesMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: updateLikesInState,
    onError: handleError
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: deleteBlogInState,
    onError: handleError
  })
  
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 2,
    initialData: []
  })

  if ( result.isError ) {
    return <strong>blogs service not available due to problems in server</strong>
  }
  
  const blog = result.data.find(b => b.id === match?.params?.id)
  
  if ( !blog ) return
  
  const handleUpdateLikes = () => updateLikesMutation.mutate({id: blog.id, blog: { likes: blog.likes + 1 }})

  const handleRemoveBlog = () => {
    if (window.confirm(`are you sure you want to remove blog '${blog.title}'?`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))

  const showButtonRemove = { display: user?.username === blog.user?.username ? '' : 'none' }

  return (
    <>
      <div className="blog">
        <h1>{blog.title}</h1>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={handleUpdateLikes}>like</button> </p>
        <p>added by {blog.user?.name ?? 'anonymous'}</p>
        <button style={showButtonRemove} className='button-remove' onClick={handleRemoveBlog}>remove</button>
      </div>
      <CommentList blog={blog} />
    </>
  )
}

export default BlogDetail