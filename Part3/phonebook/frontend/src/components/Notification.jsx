const Notification = ({ message, notificationType }) => {
  if (message === null) {
    return null
  }

  const msgStyle = notificationType === 'success' ? 'successStyle' : 'errorStyle';

  return (
    <div className={msgStyle}>
      {message}
    </div>
  )
}

export default Notification
