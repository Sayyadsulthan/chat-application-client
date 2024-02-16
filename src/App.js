import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatCard from './components/ChatCard/ChatCard';
import RoomCard from './components/RoomCard/RoomCard';

const socket = io('http://127.0.0.1:8000');
function App() {
    const [formData, setFormData] = useState({ user: '', room: '' });
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [messageList, setMessageList] = useState([]);
    // add this in component of  chat
    const [chat, setChat] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        socket.on('connection', () => {
            console.log(' connected');
        });
        socket.on('userList', (allUsers) => {
            console.log('didMount', allUsers);
            setAllUsers(allUsers);
        });
        socket.on('message', (data) => {
            // console.log(data);
        });

        // setAllUsers([{}]);
        socket.on('disconnect', () => {
            console.log(' disconnected');
        });
    }, []);

    useEffect(() => {
        socket.on('receiveMessage', (receivedData) => {
            setMessageList(
                messageList.concat({ chat: receivedData.chat, user: receivedData.chat })
            );
        });

        socket.on('userList', (allUsers) => {
            console.log('didUpdate', allUsers);
            setAllUsers(allUsers);
        });
    }, [socket, messageList]);

    // for joining the room
    const handleJoinRoom = () => {
        if (!formData.room.length > 0 || !formData.user.length > 2) {
            alert('id cannot be empty!!|| user name atleast 3characters');
            return;
        }

        socket.emit('joinRoom', formData);
        setIsWindowOpen(true);
    };

    const handleSendMessage = () => {
        if (!chat || !chat.length > 1) {
            return;
        }
        socket.emit('sendMessage', { ...formData, chat });
        setMessageList([...messageList, { chat, user: formData.user }]);
        setChat('');
    };

    return (
        <div className="App">
            {!isWindowOpen ? (
                <RoomCard
                    formData={formData}
                    setFormData={setFormData}
                    handleJoinRoom={handleJoinRoom}
                />
            ) : (
                <ChatCard
                    setIsWindowOpen={setIsWindowOpen}
                    messageList={messageList}
                    formData={formData}
                    handleSendMessage={handleSendMessage}
                    setChat={setChat}
                    chat={chat}
                    allUsers={allUsers}
                />
            )}
        </div>
    );
}

export default App;
