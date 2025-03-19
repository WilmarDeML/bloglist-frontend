import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = []

const toggleLikes = (state, id) => {
  return state
    .map((blog) => {
      if (blog.id === id) {
        return { ...blog, likes: blog.likes + 1 }
      }
      return blog
    })
    .sort((a, b) => b.likes - a.likes)
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    toggleLikesOf(state, action) {
      return toggleLikes(current(state), action.payload)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    setBlogs(_state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { toggleLikesOf, setBlogs, appendBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    dispatch(setBlogs(await blogService.getAll()))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          { message: `You created '${newBlog.title}'`, error: false },
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

export const toggleLikesOfBlog = (id) => {
  return async (dispatch, getState) => {
    const blogFound = getState().blogs.find((blog) => blog.id === id)
    try {
      await blogService.update(id, { likes: blogFound.likes + 1 })
      dispatch(toggleLikesOf(id))
    } catch (error) {
      const message =
        error.response?.data?.error ?? 'server error, please try again'
      dispatch(setNotification({ message, error: true }, 5000))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(
        setNotification(
          { message: `You deleted '${blog.title}'`, error: false },
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

export default blogSlice.reducer
