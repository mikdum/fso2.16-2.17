const Message = ({ message }) => {
    if (message.text === '') {
      return null
    }
  
    return (
      <div className={message.type}>
        {message.text}
      </div>
    )
  }

  
export default Message 