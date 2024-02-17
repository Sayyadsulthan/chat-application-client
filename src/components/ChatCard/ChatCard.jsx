import React from 'react';
import styles from './chatCard.module.css';
import { IoIosSend } from 'react-icons/io';
import { TiArrowBack } from 'react-icons/ti';

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
        <section className={styles.chat_room_wrapper}>
            <TiArrowBack className={styles.back_btn} onClick={() => setIsWindowOpen(false)} />

            <h1> Active users: {allUsers.length}</h1>
            <ul className={styles.message_wrapper}>
                {messageList.map(({ chat, user }, index) => (
                    <li
                        key={index}
                        className={
                            user === formData.user ? styles.own_message : styles.others_message
                        }
                    >
                        <p className={styles.message_content}>
                            <strong>{` ${chat}`}</strong>
                            <span>{user === formData.user ? 'You' : user} </span>
                        </p>
                    </li>
                ))}
            </ul>

            <div className={styles.chat_input_wrapper}>
                <input value={chat} onChange={(e) => setChat(e.target.value)} type="text" />
                <IoIosSend
                    className={styles.send_btn}
                    fontSize={'larger'}
                    onClick={handleSendMessage}
                    type="submit"
                />
            </div>
        </section>
    );
};

// const style = {
//     ownMessage: {
//         font: 'Bold',
//         fontSize: 'larger',
//     },
// };

export default ChatCard;
