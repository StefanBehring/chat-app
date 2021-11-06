import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './components/Chat/Chat'

const socket = io.connect('http://localhost:4000')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoomHandler = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <label>
            Username:{' '}
            <input
              type="text"
              name="username"
              placeholder="John"
              onChange={event => {
                setUsername(event.target.value)
              }}
            />
          </label>
          <label>
            Room:{' '}
            <input
              type="text"
              name="room"
              placeholder="JohnChat"
              onChange={event => {
                setRoom(event.target.value)
              }}
            />
          </label>
          <button onClick={joinRoomHandler}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  )
}

export default App
