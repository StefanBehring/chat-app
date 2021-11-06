import { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const sendMessageHandler = async event => {
    event.preventDefault()
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      }
      await socket.emit('send_message', messageData)
      setMessageList(list => [...list, messageData])
      setCurrentMessage('')
      event.target.reset()
    }
  }

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList(list => [...list, data])
    })
  }, [socket])

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map(messageContent => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? 'you' : 'other'}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollToBottom>
      </div>
      <form className="chat-footer" onSubmit={sendMessageHandler}>
        <label>
          Msg
          <input
            type="text"
            placeholder="your message"
            onChange={event => {
              setCurrentMessage(event.target.value)
            }}
            onKeyPress={event => event.key === 'Enter' && sendMessageHandler()}
          />
        </label>
        <button>&#9658;</button>
      </form>
    </div>
  )
}

export default Chat
