import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

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
            // alert('users', allUsers.length);
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
    }, [socket, allUsers]);

    // for joining the room
    const handleClick = () => {
        // alert(`name: ${formData.user}, room: ${formData.room} `);
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
                <section className="room-wrapper">
                    <h1>Join Room</h1>
                    <input
                        type="text"
                        value={formData.user}
                        onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                        placeholder="name"
                    />
                    <input
                        onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                        value={formData.room}
                        type="text"
                        placeholder="xxx.."
                    />
                    <input onClick={handleClick} type="submit" value={'Join'} />
                </section>
            ) : (
                <section className="chat-room-wrapper">
                    <button onClick={() => setIsWindowOpen(false)}>Back</button>
                    <h1> Total Users in current Room: {allUsers.length}</h1>
                    <ul>
                        {messageList.map(({ chat, user }, index) => (
                            <li
                                key={index}
                                style={
                                    user === formData.user ? style.ownMessage : { color: 'bisque' }
                                }
                            >
                                {' '}
                                <strong>{user}: </strong>
                                {` ${chat}`}
                            </li>
                        ))}
                    </ul>

                    <div>
                        <input value={chat} onChange={(e) => setChat(e.target.value)} type="text" />
                        <button onClick={handleSendMessage} type="submit">
                            Send
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}

const style = {
    ownMessage: {
        font: 'Bold',
        fontSize: 'larger',
    },
};

export default App;
