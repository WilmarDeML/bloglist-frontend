import { useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {  
  const user = useSelector(state => state.user)
  return user ? <BlogList /> : <LoginForm />
}

export default App
