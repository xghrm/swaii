import React, { useState } from 'react';
import './login.css';
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {toast} from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const saveUserToDB = async (user) => {
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    email: user.email || "",
                    phoneNumber: user.phoneNumber || "",
                    fullName: user.displayName || "",
                    createdAt: new Date(),
                });
                toast.success("✅ User saved to Firestore");
            } else {
                toast.warning("ℹ️ User already exists");
            }
        } catch (error) {
            toast.error("❌ Firestore Error:", error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await saveUserToDB(user);

            const empDoc = await getDoc(doc(db, "Employee", user.uid));
            const adminDoc = await getDoc(doc(db, "Admin", user.uid));

            if (adminDoc.exists()) {
                toast.success(`✅ Welcome admin: ${user.email}`);
                navigate("/admin");
            } else if (empDoc.exists()) {
                toast.success(`✅ Welcome employee: ${user.email}`);
                navigate("/employee");
            } else {
                toast.success(`✅ Logged in as user: ${user.email}`);
                navigate("/");
            }
        } catch (error) {
            toast.error(`❌ ${error.message}`);
        }
    };

    const handleResetPassword = () => {
        if (!email) {
            toast.warning('Please enter your email first.');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('📩 Password reset email sent.');
                navigate('/');
            })
            .catch((error) => {
                toast.error(`❌ ${error.message}`);
            });
    };

    const goToPhoneLogin = () => {
        navigate('/phone-login');
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-header">
                    <img src="/logo.png.png" alt="SWAI Logo" className="logo-img" />
                    <h2>Login to <span className="highlight">SWAI</span></h2>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                        Don't have an account?{' '}
                        <span
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => navigate('/signup')}
                        >
              Sign up
            </span>
                    </p>
                    <p
                        onClick={handleResetPassword}
                        style={{ color: '#4285f4', cursor: 'pointer', textAlign: 'center', marginTop: '10px' }}
                    >
                        Forgot Password?
                    </p>
                    <button type="submit">Login</button>
                </form>

                <div className="login-divider">or</div>

                <div className="social-buttons">
                    <button className="phone-btn" onClick={goToPhoneLogin}>
                        📱 Login with Phone
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
