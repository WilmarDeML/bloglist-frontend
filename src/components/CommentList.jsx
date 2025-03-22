import CommentForm from './CommentForm'

const CommentList = ({ blog }) => {

  return (
    <div>
      <h2>Comments</h2>
      <CommentForm blogId={blog.id} />

      {blog?.comments?.length
        ? <ul className='comments'>
            {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
          </ul>
        : <h4>no comments</h4>
      }
    </div>
  )
}

export default CommentList
