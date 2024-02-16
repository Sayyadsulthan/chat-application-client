import React from 'react';

const RoomCard = ({ formData, setFormData, handleJoinRoom }) => {
    return (
        <section className="room-wrapper">
            <h1>Join Room</h1>
            <div className="room-input-container">
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
                    placeholder="Pass.."
                />
                <input onClick={handleJoinRoom} type="submit" value={'Join'} />
            </div>
        </section>
    );
};

export default RoomCard;
