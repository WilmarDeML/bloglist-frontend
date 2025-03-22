import { useQuery } from '@tanstack/react-query'

import userService from '../services/users'

import Menu from './Menu'
import { Link } from 'react-router-dom'

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
      <Menu />
      <h2>Users</h2>

      <table className='users'>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
