import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
        return action.payload
    default:
        return state
  }
}

const NotificationContext = createContext()

export const useNotificationWithTime = () => {
  const [, dispatch] = useContext(NotificationContext)
  return (notification, time) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: notification })
    setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', payload: null })
    }, time)
  }
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext)
  return dispatch
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext