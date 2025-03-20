import { createContext, useReducer, useContext } from 'react'
import blogService from './services/blogs'

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
        return action.payload
    default:
        return state
  }
}

const UserContext = createContext()

export const useLogin = () => {
  const [, dispatch] = useContext(UserContext)
  return (user) => {
    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({ type: 'SET_USER', payload: user })
  }
}

export const useLogout = () => {
  const [, dispatch] = useContext(UserContext)
  return () => {
    window.localStorage.removeItem('loggedNoteappUser')
    blogService.setToken(null)
    dispatch({ type: 'SET_USER', payload: null })
  }
}

const initUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    useLogin(user)
    return user
  }
  return null
}

export const useUserValue = () => {
  let [user] = useContext(UserContext)
  if (!user) {
    user = initUser()
  }
  return user
}

export const useUserDispatch = () => {
  const [, dispatch] = useContext(UserContext)
  return dispatch
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch] }>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext