import { Link } from 'react-router-dom'
import { useLogout, useUserValue } from '../UserContext'

const Menu = () => {

  const logout = useLogout()
  const user = useUserValue()

  const padding = {
    paddingRight: 5
  }

  const styleDiv = { 
    background: '#caf0f8', 
    padding: '.5em', 
    borderRadius: '1em',
    marginBottom: '1em'
  }

  return (
    <>
      <div style={styleDiv}>
        <Link to='/' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
        <span>{user.name} logged in <button onClick={logout}>logout</button></span>
      </div>
      <h2>blog app</h2>
    </>
  )
}

export default Menu
