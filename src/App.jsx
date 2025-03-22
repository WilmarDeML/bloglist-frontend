import { Routes, Route, Navigate } from 'react-router-dom'
import { useUserValue } from './UserContext'
import BlogList from './components/BlogList'
import BlogDetail from './components/BlogDetail'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import Menu from './components/Menu'
import { Wrapper } from './styles/global'

const App = () => {  
  
  const user = useUserValue()

  return (
    <Wrapper>
      {user && <Menu />}
      <Routes>
        <Route path='/' element={user ? <BlogList /> : <LoginForm />} />
        <Route path='/users' element={user ? <UserList /> : <Navigate to="/" />} />
        <Route path='/users/:id' element={user ? <User /> : <Navigate to="/" />} />
        <Route path='/blogs/:id' element={user ? <BlogDetail /> : <Navigate to="/" />} />
      </Routes>
    </Wrapper>
  )
}

export default App