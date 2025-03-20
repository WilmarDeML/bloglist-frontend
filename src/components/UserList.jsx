import { useQuery } from '@tanstack/react-query'

import userService from '../services/users'

import Notification from './Notification'
import Menu from './Menu'

const UserList = () => {

  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 2,
    initialData: []
  })

  if ( result.isError ) {
    return <strong>users service not available due to problems in server</strong>
  }

  const users = result.data.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>users</h2>
      <Notification />
      <Menu />

      <table className='users'>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user =>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default UserList
