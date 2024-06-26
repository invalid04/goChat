// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('wss://gochat-1.onrender.com/ws');

    socket.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    setWs(socket);

    // Generate stars when component mounts
    setStars(createStars());

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(message);
      setMessage('');
    }
  };

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 400; i++) {
      const delay = Math.random() * 10; // Adjust the delay range as needed
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${delay}s`, // Apply the delay
          }}
        ></div>
      );
    }
    return stars;
  };
  

  return (
    <div>
      <div id="stars">
        {stars} {/* Render stars here */}
      </div>
      <div className="box">
      <div id="chat">
        <div id="messageList">
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
        <div id="messageInput">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
