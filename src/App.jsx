import { useUserValue } from './UserContext'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {  
  
  const user = useUserValue()

  return !user ? <LoginForm /> : <BlogList />
}

export default App