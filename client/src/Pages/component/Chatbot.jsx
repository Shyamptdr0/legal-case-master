import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './home.css'

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: 'User', text: "हैलो" },
    { sender: 'Bot', text: "नमस्कार, मैं कैसे मदद कर सकता हूं?" }
    // You can add more messages here
  ]);

  const [message, setMessage] = useState('');
  const messagesContainerRef = useRef(null);

  const submit = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'User', text: message }
    ]);
    axios
      .post('/chat', { message: message })
      .then((res) => {
        console.log(res.data);
        const responseMessage = res.data.response;

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'Bot', text: responseMessage }
        ]);

        setMessage('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='chat-bot-box' style={{ padding: '0', margin: '0' }}>
      <div className='container my-1'>
        <div className="chat-app" style={{ backgroundColor: "white" }}>
          <div className="chat-header">
            <h1>Incorporated HWSD model into Chatbot</h1>
          </div>
          <div className="chat-messages" ref={messagesContainerRef}>
            {messages.map((message, index) => (
              <div className="message" key={index}>
                {/* <div className='col'> */}
                {/* <div className="message-sender">{message.sender}</div> */}
                {/* {message.sender === "Bot" ? {backgroundColor:'grey'} : {backgroundColor:'green'}} */}
                {/* </div> */}
                <div className="whose-msg">
                  {message.sender === "Bot" ? <img style={{width:'1.8rem'}} src="./bot.png" alt="" /> : <img style={{width:'1.8rem'}} src="./hacker.png" alt="" /> }
                </div>
                <div className='written-message'>
                  {/* <div className="message-text">{message.text}</div> */}
                  <div className="message-text">
                  {message.sender === "Bot" ? <div className="bot-background">{message.text}</div> : <div className="user-background">{message.text}</div> }
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="आप अपना सन्देश लिखें "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={submit}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}