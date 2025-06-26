import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { toast } from 'react-toastify';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 📝 Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: new Date(),
            });

            toast.success('✅ Account created and saved!');
            navigate('/');
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                toast.warn("⚠️ Email already exists. Please login instead.");
            } else {
                toast.error(`❌ ${error.message}`);
            }
        }
    };

    return (
        <div className="sighup-login-container">
            <div className="login-box">
                <h2 className="signup-login-title">Create a SWAI Account</h2>
                <form onSubmit={handleSignup} className="login-form">
                    <input
                        className="sighup-login-input"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="sighup-login-input"
                        type="password"
                        placeholder="Password (min 6 chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="sighup-login-button">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;