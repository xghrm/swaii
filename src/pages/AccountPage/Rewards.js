import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './Account.css';

const Rewards = () => {
    const [userPoints, setUserPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    const rewards = [
        { points: 50, reward: 'Free Delivery' },
        { points: 100, reward: '$5 Discount' },
        { points: 200, reward: 'Free Dessert' },
    ];

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserPoints(data.points || 0);
                }
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p style={{ textAlign: 'center' }}>Loading rewards...</p>;

    return (
        <div className="rewards-container">
            <h2>🎁 My Rewards</h2>
            <p className="points">You have <strong>{userPoints}</strong> points</p>

            <div className="earn-info">
                <p>Earn 1 point for every $5 spent</p>
                <p>Invite a friend = 20 points</p>
            </div>

            <h3>Redeem your points</h3>
            <div className="reward-list">
                {rewards.map((r, index) => (
                    <div className="reward-item" key={index}>
                        <p>{r.reward}</p>
                        <span>{r.points} points</span>
                        <button disabled={userPoints < r.points}>
                            {userPoints >= r.points ? 'Redeem' : 'Not Enough Points'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rewards;
