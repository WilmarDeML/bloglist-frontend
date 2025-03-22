import { useNotificationValue } from '../NotificationContext'

import styled from 'styled-components'

const Notification = () => {

  const notification = useNotificationValue()

  if (!notification) {
    return
  }

  return (
    <NotificationStyle $color={notification.error ? 'red' : 'green'} >
      {notification.message}
    </NotificationStyle>
  )
}

export default Notification


const NotificationStyle = styled.div`  
  background: #caf0f8;
  margin: 0 1em 1em 1em;
  border-radius: 1em;
  padding: 1em 0;
  text-align: center;
  color: ${({$color}) => $color};
  border: .1em solid ${({$color}) => $color};
`