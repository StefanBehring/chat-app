import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'

const socket = io.connect('http://localhost:4000')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (username !== '' && room !== '') {
    }
  }

  return (
    <div className="App">
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
      <button>Join A Room</button>
    </div>
  )
}

export default App
