import { createSlice, current } from "@reduxjs/toolkit"

import blogService from "../services/blogs"

import { setNotification } from "./notificationReducer"

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
  name: "blogs",
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
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    await dispatch(appendBlog(newBlog))
    await dispatch(
      setNotification(
        { message: `You created '${newBlog.title}'`, error: false },
        5000
      )
    )
  }
}

export const toggleLikesOfBlog = (id) => {
  return async (dispatch, getState) => {
    const blogFound = getState().blogs.find((blog) => blog.id === id)
    const updatedBlog = await blogService.update(id, {
      likes: blogFound.likes + 1,
    })
    await dispatch(toggleLikesOf(id))
    await dispatch(
      setNotification(
        { message: `You liked '${updatedBlog.title}'`, error: false },
        5000
      )
    )
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    await dispatch(removeBlog(blog.id))
    await dispatch(
      setNotification(
        { message: `You deleted '${blog.title}'`, error: false },
        5000
      )
    )
  }
}

export default blogSlice.reducer
