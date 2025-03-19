import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer, { initializeBlogs } from './reducers/blogReducer'
import userReducer, { getUser } from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

store.dispatch(initializeBlogs())
store.dispatch(getUser())

export default store
