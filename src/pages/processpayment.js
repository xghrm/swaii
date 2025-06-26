import React, { useState, useEffect } from 'react';
import { useCart } from "./cartcontex";
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import "./payment.css";

const ProcessPayment = () => {
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);
    const { cartItems, placeOrder } = useCart();
    const navigate = useNavigate();

    const user = getAuth().currentUser;

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!user) return;
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                setName(data.name || '');
                setAddress(data.address || '');
                setPhone(data.phone || '');
            }
            setLoading(false);
        };
        fetchUserInfo();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !address || !phone) {
            toast.error("❌ Please fill in all required details.");
            return;
        }

        if (cartItems.length === 0) {
            toast.error('🛒 Your cart is empty.');
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                name,
                address,
                phone,
                email: user.email
            }, { merge: true });

            placeOrder();
            toast.success("✅ Order placed successfully!");
            navigate('/orders');
        } catch (error) {
            toast.error(`❌ ${error.message}`);
        }
    };

    if (loading) return <p>Loading...</p>;

    const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);

    return (
        <div className="payment-container">
            <h2>🧾 Process Your Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-details">
                    <label>Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                    <label>Phone Number</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                    <label>Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>

                <div className="payment-method">
                    <label>
                        <input
                            type="radio"
                            value="credit"
                            checked={paymentMethod === 'credit'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Credit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Cash on Delivery
                    </label>
                </div>

                {paymentMethod === 'credit' && (
                    <div className="card-info">
                        <input type="text" placeholder="Card Number" required />
                        <input type="text" placeholder="Expiry Date (MM/YY)" required />
                        <input type="text" placeholder="CVV" required />
                    </div>
                )}

                <button type="submit" className="confirm-btn">Confirm Payment</button>
            </form>

            <div className="cart-summary">
                <h3>🛒 Cart Summary</h3>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price} x {item.quantity || 1}
                        </li>
                    ))}
                </ul>
                <p><strong>Total: ${total}</strong></p>
            </div>
        </div>
    );
};

export default ProcessPayment;