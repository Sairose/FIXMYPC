import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import axios from '../../api/axios';

const Chat = () => {
    const { user: currentUser } = useAuth();
    const socket = useSocket();
    const navigate = useNavigate();
    const location = useLocation();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);

    const { receiverId, bookingId, partnerName } = location.state || {};

    useEffect(() => {
        if (!receiverId || !bookingId) {
            navigate(-1);
            return;
        }

        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/api/messages/${bookingId}`);
                setMessages(res.data);
            } catch (err) {
                console.error('Failed to load messages:', err);
            }
        };

        fetchMessages();
    }, [receiverId, bookingId, navigate]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Join room
    useEffect(() => {
        if (!socket.current || !bookingId) return;

        socket.current.emit('join_room', `chat_${bookingId}`);

        return () => {
            socket.current.emit('leave_room', `chat_${bookingId}`);
        };
    }, [socket, bookingId]);

    // Handle incoming messages from socket (sender + receiver)
    useEffect(() => {
        if (!socket.current || !bookingId) return;

        const handleIncomingMessage = (message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.current.on(`chat_${bookingId}`, handleIncomingMessage);

        return () => {
            socket.current.off(`chat_${bookingId}`, handleIncomingMessage);
        };
    }, [socket, bookingId]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const res = await axios.post(
                '/api/messages',
                {
                    receiverId,
                    message: newMessage,
                    bookingId,
                },
                {
                    withCredentials: true,
                }
            );

            const savedMessage = res.data;

            // Emit to socket — will be handled like any other incoming message
            socket.current.emit('new_message', {
                bookingId,
                message: savedMessage.message,
                senderId: savedMessage.senderId,
                receiverId: savedMessage.receiverId,
            });

            // Also append to local UI immediately
            // setMessages((prev) => [...prev, savedMessage]);
            setNewMessage('');
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    const exitChat = () => {
        if (currentUser?.role === 'technician') {
            navigate('/technician/dashboard/booked');
        } else {
            navigate('/client/dashboard/booked');
        }
    };

    // Normalize senderId to string for comparison
    const isOwnMessage = (msg) => {
        const senderId = typeof msg.senderId === 'object' ? msg.senderId._id : msg.senderId;
        return senderId === currentUser._id;
    };

    return (
        <div className="h-screen w-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
                <h2 className="text-lg md:text-2xl font-semibold">
                    Chat with {partnerName || 'User'}
                </h2>
                <button
                    onClick={exitChat}
                    className="px-4 py-1 bg-red-500 rounded hover:bg-red-600"
                >
                    Exit
                </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                {messages.map((msg, idx) => (
                    <div
                        key={msg._id || idx}
                        className={`p-2 rounded-lg max-w-[70%] break-words ${isOwnMessage(msg)
                            ? 'ml-auto bg-blue-500 text-white'
                            : 'mr-auto bg-gray-300 text-black'
                            }`}
                    >
                        {msg.message}
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white flex gap-2 border-t">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border rounded focus:outline-none"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
