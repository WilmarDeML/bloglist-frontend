import { useQuery } from "@tanstack/react-query"
import { useMatch } from "react-router-dom"
import userService from '../services/users'

const User = () => {
  const match = useMatch('/users/:id')

  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 2,
    initialData: []
  })

  if ( result.isError ) {
    return <strong>users service not available due to problems in server</strong>
  }

  const user = result.data.find(u => u.id === match.params.id)

  if ( !user ) return

  return (
    <div className="user">
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.length 
          ? user.blogs.map(blog =>
              <li key={blog.id}>
                {blog.title}
              </li>
            )
          : <h4>no blogs added</h4>
        }
      </ul>
    </div>
  )
}

export default User