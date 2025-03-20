import { useNotificationValue } from '../NotificationContext'

const Notification = () => {

  const notification = useNotificationValue()

  if (!notification) {
    return
  }

  return (
    <div className={notification.error ? 'error' : 'notification'}>
      {notification.message}
    </div>
  )
}

export default Notification
