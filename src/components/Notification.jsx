import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification.message) {
    return
  }

  return (
    <div className={notification.error ? 'error' : 'notification'}>
      {notification.message}
    </div>
  )
}

export default Notification
