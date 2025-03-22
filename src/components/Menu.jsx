import { Link } from 'react-router-dom'
import { useLogout, useUserValue } from '../UserContext'
import Notification from './Notification'
import styled from 'styled-components'
import { Subtitle } from '../styles/global'

const Menu = () => {

  const logout = useLogout()
  const user = useUserValue()

  return (
    <>
      <Nav>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
        <span>{user.name} logged in <button onClick={logout}>logout</button></span>
      </Nav>
      <Subtitle>blog app</Subtitle>
      <Notification />
    </>
  )
}

export default Menu

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1em;
  background: #03045e;
  color: #caf0f8;
  gap: 2em;

  a {
    color: #caf0f8;
    text-decoration: none;

    &:hover {
      color: #90e0ef;
      text-decoration: underline;
    }
  }

  span {
    color: #90e0ef;
    margin-left: auto;
  }

  button {
    font-family: Krona One, sans-serif;
    background: #caf0f8;
    color: #03045e;
    border: 1px solid #03045e;
    border-radius: 0.7em;
    padding: .5em 0.7em;
    margin-left: 1em;
    font-size: .8em;

    &:hover {
      background: #90e0ef;
      color: #03045e;
      cursor: pointer;
    }
  }
`
