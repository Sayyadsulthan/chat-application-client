import React from 'react';

const ChatCard = ({
    setIsWindowOpen,
    messageList,
    formData,
    handleSendMessage,
    setChat,
    chat,
    allUsers,
}) => {
    return (
        <section className="chat-room-wrapper">
            <button onClick={() => setIsWindowOpen(false)}>Back</button>
            <h1> Total Users in current Room: {allUsers.length}</h1>
            <ul>
                {messageList.map(({ chat, user }, index) => (
                    <li
                        key={index}
                        style={user === formData.user ? style.ownMessage : { color: 'bisque' }}
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
    );
};

const style = {
    ownMessage: {
        font: 'Bold',
        fontSize: 'larger',
    },
};

export default ChatCard;
