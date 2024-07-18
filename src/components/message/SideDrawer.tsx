import React,{useState} from 'react'


const SideDrawer = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello!', sender: 'John', timestamp: '10:00 AM' },
        { id: 2, text: 'Hi there!', sender: 'Doe', timestamp: '10:05 AM' },
      ]);
      const [newMessage, setNewMessage] = useState('');
    
      const handleSendMessage = () => {
        if (newMessage.trim()) {
          setMessages([
            ...messages,
            {
              id: messages.length + 1,
              text: newMessage,
              sender: 'You',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          setNewMessage('');
        }
      };
    
  return (
     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="flex flex-col space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {message.sender[0]}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">{message.sender}</div>
                <div className="text-sm text-gray-600">{message.timestamp}</div>
                <div className="mt-1 text-gray-800">{message.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideDrawer
