import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import userService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const blogSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
  },
})

export const { setUser } = blogSlice.actions

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await userService.login({ username, password })
      await dispatch(setUser(user))
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      await dispatch(
        setNotification(
          { message: `${user.name} logged in`, error: false },
          5000
        )
      )
    } catch (error) {
      const message =
        error.response?.data?.error ?? 'server error, please try again'
      dispatch(setNotification({ message, error: true }, 5000))
    }
  }
}

export const logout = () => {
  return async (dispatch, getState) => {
    window.localStorage.removeItem('loggedNoteappUser')
    const user = getState().user
    dispatch(setUser(null))
    dispatch(
      setNotification(
        { message: `${user.name} logged out`, error: false },
        5000
      )
    )
  }
}

export const getUser = () => {
  return async (dispatch) => {
    const loggedUser = JSON.parse(
      window.localStorage.getItem('loggedNoteappUser')
    )
    if (loggedUser) {
      blogService.setToken(loggedUser.token)
    }
    dispatch(setUser(loggedUser))
  }
}

export default blogSlice.reducer
