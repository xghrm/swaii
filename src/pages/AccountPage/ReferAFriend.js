import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Account.css';
import {toast} from "react-toastify";

const ReferFriend = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleRefer = async (e) => {
        e.preventDefault();

        const templateParams = {
            to_email: email,
            from_name: "SWAI App",

            message: "👋 Hey! Join SWAI and enjoy delicious meals delivered fast! 🚀"
        };

        try {
            await emailjs.send(
                'service_1sol58a',
                'template_056oe4g',
                templateParams,
                'wKz241vgk51eUPR4l'
            );
            toast.success('✅ Invitation sent successfully!');
            setEmail('');
        } catch (err) {
            toast.error('❌ Failed to send invitation.');
            console.error(err);
        }
    };

    return (
        <div className="refer-container">
            <h2>🎁 Refer a Friend</h2>
            <form onSubmit={handleRefer}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Friend's email"
                    required
                />
                <button type="submit">Send Invite</button>
            </form>
            <p>{status}</p>
        </div>
    );
};

export default ReferFriend;
