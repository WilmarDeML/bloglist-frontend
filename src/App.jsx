import { Routes, Route } from 'react-router-dom'
import { useUserValue } from './UserContext'
import BlogList from './components/BlogList'
import BlogDetail from './components/BlogDetail'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'

const App = () => {  
  
  const user = useUserValue()

  return (
    <Routes>
      <Route path='/' element={user ? <BlogList /> : <LoginForm />} />
      <Route path='/users' element={<UserList />} />
      <Route path='/users/:id' element={<User />} />
      <Route path='/blogs/:id' element={<BlogDetail />} />
    </Routes> 
  )
}

export default App