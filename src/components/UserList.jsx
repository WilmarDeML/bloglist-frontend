import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import userService from '../services/users'

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
    <Container>
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
            <LinkStyle key={user.id}>
              <td className='link'>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </LinkStyle>
          )}
        </tbody>
      </table>
    </Container>
  )
}

export default UserList

const Container = styled.div`
  padding: .5em 1em;
  border: 1px solid #03045e;
  margin: .5em 1em;
`

export const LinkStyle = styled.tr`
  background: #90e0ef;
  margin-left: 1em;
  td {
    padding: 1em;
    border-radius: 0.5em;
    font-weight: 600;  
  }
    
  .link {
    background: #caf0f8;
    a {
      color: #03045e;
      text-decoration: none;
      font-size: 1.2em;
    }

    &:hover {
      background: #03045e;
      a { 
        color: #90e0ef; 
        text-decoration: underline;
      }
    }
  }
`
