import { useQuery } from "@tanstack/react-query"
import { useMatch, useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationWithTime } from '../NotificationContext'
import blogService from '../services/blogs'
import CommentList from "./CommentList"
import { Title, Button } from "../styles/global"
import styled from "styled-components"

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
      <Container>
        <Title>{blog.title}</Title>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <ButtonLike onClick={handleUpdateLikes}>like</ButtonLike> </p>
        <p>added by {blog.user?.name ?? 'anonymous'}</p>
        <button style={showButtonRemove} onClick={handleRemoveBlog} className="remove">remove</button>
      </Container>
      <CommentList blog={blog} />
    </>
  )
}

export default BlogDetail

const ButtonLike = styled(Button)`
  padding: 0.2em;
  width: 100px;
  background: transparent;
`

export const Container = styled.div`
  padding: .5em 1em;
  border: 1px solid #03045e;
  margin: .5em 1em;

  .remove {
    font-family: Krona One, sans-serif;
    background: #90e0ef;
    border: 1px solid #03045e;
    border-radius: 0.7em;
    padding: 0.7em;
    font-size: 1.2em;
    cursor: pointer;

    &:hover {
      background: #0077b6;
      color: #caf0f8;
      cursor: pointer;
    }
  }
`