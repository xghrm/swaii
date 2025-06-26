import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../firebase.js";
import './Account.css';
import {toast} from "react-toastify";

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);

                // معلومات الحساب
                const userRef = doc(db, 'users', firebaseUser.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name || '');
                    setPhone(data.phone || '');
                    setAddress(data.address || '');
                }

                // الطلبات من مجموعة orders العامة
                const q = query(collection(db, 'orders'), where("userId", "==", firebaseUser.uid));
                const querySnapshot = await getDocs(q);
                const orderList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(orderList);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        if (!user) return;
        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                name,
                email: user.email,
                phone,
                address,
            });
            toast.success('✅ Info saved successfully!');
        } catch (error) {
            toast.error('❌ Error saving info: ' + error.message);
        }
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                toast.success('🚪 Logged out successfully.');
                window.location.href = '/login';
            })
            .catch(error =>toast.error('❌ ' + error.message));
    };

    return (
        <div className="account-container">
            <h2>My Account</h2>
            <div className="account-form">
                <label>Full Name</label>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input type="email" value={user?.email || ''} readOnly />

                <label>Phone Number</label>
                <input
                    type="tel"
                    placeholder="+9639xxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label>Address</label>
                <input
                    type="text"
                    placeholder="Your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button onClick={handleSave}>Save</button>
                <button onClick={handleLogout} className="logout-btn">Log Out</button>
            </div>

            <div className="orders-section">
                <h3>🧾 Your Orders</h3>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li key={order.id}>
                                <strong>{order.timestamp?.toDate().toLocaleString() || 'Unknown Date'}</strong> -
                                {order.items?.length || 0} items -
                                ${order.total || '??'}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MyAccount;
