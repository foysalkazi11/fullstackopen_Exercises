const Notification = ({ message, messageType = "success" }) => {
  if (message === null) {
    return null;
  }

  return <div className={`message ${messageType}`}>{message}</div>;
};

export default Notification;
