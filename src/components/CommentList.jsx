import CommentForm from './CommentForm'
import { Container } from './BlogDetail'

const CommentList = ({ blog }) => {

  return (
    <Container>
      <h2>Comments</h2>
      {blog?.comments?.length
        ? <ul className='comments'>
            {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
          </ul>
        : <h4>no comments</h4>
      }
      <CommentForm blogId={blog.id} />
    </Container>
  )
}

export default CommentList
