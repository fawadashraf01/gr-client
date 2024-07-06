import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import Popup from './Popup';
import credentialsContext from '../context/credentialsContext';

const socket = io('http://localhost:4500'); // Adjust the URL if necessary

const Message = () => {
  const {
    updateMessages,
    user,
    isUser,
    isConnected,
    setIsConnected,
    messages,
    setMessages,
    otherId,
    setOtherId,
  } = useContext(credentialsContext);
  const [roomId, setRoomId] = useState('');
  const [inputMessage, setInputMessage] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receiveMessage', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, fromUser: data.senderId }, // Check if message is from other user
      ]);
    });

    return () => {
      socket.off('receiveMessage'); // Clean up event listener on unmount
    };
  }, [user.email]);

  const handleCreateRoom = async () => {
    if (!otherId) return;

    try {
      const data = await isUser(otherId);
      if (data) {
        setIsConnected(true);
        setRoomId(`${user.email}-${otherId}`);
        socket.emit('createRoom', user.email, otherId); // Emit createRoom event with IDs
      } else {
        setErrorMsg('No user found with this email');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setErrorMsg('Error checking user');
      setShowError(true);
    }
  };

  const handleJoinRoom = async () => {
    if (!otherId) return;

    try {
      const data = await isUser(otherId);
      console.log(data);
      if (data) {
        setIsConnected(true);
        setRoomId(`${otherId}-${user.email}`);
        socket.emit('joinRoom', user.email, otherId); // Emit joinRoom event with IDs
      } else {
        setErrorMsg('No user found with this email');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setErrorMsg('Error checking user');
      setShowError(true);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (user.messagesLimit === 0 || user.messagesUsage === user.messagesLimit) {
      setErrorMsg('Your Message Limit is 0');
      setShowError(true);
      return;
    }

    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, fromUser: user.email }]);
      socket.emit('sendMessage', {
        senderId: user.email,
        receiverId: otherId,
        roomId,
        message: inputMessage,
      });
      if (inputMessage) {
        updateMessages(user.email);
      }
      setInputMessage('');
    }
  };

  const handleLeaveRoom = () => {
    setOtherId('');
    setRoomId('');
    setMessages([]);
    setIsConnected(false);

    socket.emit('leaveRoom');
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-md overflow-hidden rounded-md border-2 border-violet-600 bg-white shadow-lg shadow-gray-500/50">
        <div className="p-4">
          {!isConnected ? (
            <>
              <h2 className="mb-4 text-xl font-bold">Connect with an ID</h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="otherId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Connect To
                  </label>
                  <input
                    type="text"
                    id="otherId"
                    value={otherId}
                    onChange={(e) => setOtherId(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    onClick={handleCreateRoom}
                    className="w-1/2 rounded-md bg-violet-600 px-4 py-2 text-white shadow-sm hover:bg-violet-700 md:w-1/3"
                  >
                    Create Room
                  </button>
                  <button
                    type="button"
                    onClick={handleJoinRoom}
                    className="w-1/2 rounded-md bg-gray-400 px-4 py-2 text-white shadow-sm hover:bg-gray-500 md:w-1/3"
                  >
                    Join Room
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="h-96 overflow-y-auto p-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 flex ${
                      message.fromUser === user.email
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-md px-4 py-2 ${
                        message.fromUser === user.email
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleSendMessage}
                className="flex items-center p-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 p-2 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  placeholder="Type a message"
                />
                <button
                  type="submit"
                  className="ml-2 rounded-md bg-violet-600 px-4 py-2 text-white shadow-sm hover:bg-violet-700"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={handleLeaveRoom}
                  className="ml-2 rounded-md bg-red-600 px-2 py-1 text-white shadow-sm hover:bg-red-700"
                >
                  X
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      {showError && (
        <Popup onClose={() => setShowError(false)}>{errorMsg}</Popup>
      )}
    </div>
  );
};

export default Message;
