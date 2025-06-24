import React, { useState } from 'react';
import './Account.css';

const Vouchers = () => {
    const [voucherCode, setVoucherCode] = useState('');
    const [message, setMessage] = useState('');

    const availableVouchers = [
        { code: 'SWAI50', discount: '$50 OFF', status: 'valid' },
        { code: 'WELCOME10', discount: '10% OFF', status: 'used' },
        { code: 'FREESHIP', discount: 'Free Delivery', status: 'valid' },
    ];

    const handleApply = () => {
        if (voucherCode === 'SWAI50') {
            setMessage('✅ Voucher applied successfully!');
        } else {
            setMessage('❌ Invalid voucher code.');
        }
    };
    const sendToFriend = (code) => {
        const email = prompt("Enter your friend's email:");
        if (email && email.includes('@')) {
            alert(`🎁 Voucher ${code} sent to ${email}`);
        } else {
            alert("❌ Invalid email.");
        }
    };
    const addToWallet = (code) => {
        alert(`💰 Voucher ${code} added to your wallet!`);
    };


    return (
        <div className="voucher-container">
            <h2>🎟️ Vouchers</h2>

            <div className="voucher-input">
                <input
                    type="text"
                    placeholder="Enter your voucher code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button onClick={handleApply}>Apply Voucher</button>
            </div>

            {message && <p className="message">{message}</p>}
            <div className="voucher-list">
                {availableVouchers.map((v, index) => (
                    <div key={index} className={`voucher-card ${v.status}`}>
                        <h4>{v.code}</h4>
                        <p>{v.discount}</p>
                        <p>Status: {v.status === 'valid' ? '✅ Available' : '❌ Used'}</p>

                        {v.status === 'valid' && (
                            <div className="voucher-actions">
                                <button onClick={() => sendToFriend(v.code)}>📤 Send to Friend</button>
                                <button onClick={() => addToWallet(v.code)}>💼 Add to Wallet</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vouchers;
