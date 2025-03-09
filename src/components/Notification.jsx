import PropTypes from 'prop-types'

const Notification = ({ message, err }) => {
  if (!message) {
    return
  }

  return (
    <div className={err ? 'error' : 'notification'}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  err: PropTypes.bool,
}

export default Notification