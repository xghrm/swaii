import React, { useState, useEffect } from 'react';
import './login.css';
import {
    signInWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
                console.log("✅ User saved to Firestore");
            } else {
                console.log("ℹ️ User already exists");
            }
        } catch (error) {
            console.error("❌ Firestore Error:", error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await saveUserToDB(user);

            let isRoleFound = false;

            const empDoc = await getDoc(doc(db, "Employee", user.uid));
            if (empDoc.exists()) {
                alert(`✅ Welcome employee: ${user.email}`);
                navigate("/employee");
                isRoleFound = true;
            }

            if (!isRoleFound) {
                const adminDoc = await getDoc(doc(db, "Admin", user.uid));
                if (adminDoc.exists()) {
                    alert(`✅ Welcome admin: ${user.email}`);
                    navigate("/admin");
                    isRoleFound = true;
                }
            }

            if (!isRoleFound) {
                alert(`✅ Logged in as user: ${user.email}`);
                navigate("/");
            }

        } catch (error) {
            alert(`❌ ${error.message}`);
        }
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (error) {
            alert(`❌ ${error.message}`);
        }
    };

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    const user = result.user;
                    await saveUserToDB(user);

                    const empDoc = await getDoc(doc(db, "Employee", user.uid));
                    const adminDoc = await getDoc(doc(db, "Admin", user.uid));

                    if (adminDoc.exists()) {
                        alert(`✅ Welcome admin: ${user.email}`);
                        navigate("/admin");
                    } else if (empDoc.exists()) {
                        alert(`✅ Welcome employee: ${user.email}`);
                        navigate("/employee");
                    } else {
                        alert(`✅ Logged in as user: ${user.email}`);
                        navigate("/");
                    }
                }
            } catch (error) {
                console.error("❌ Redirect error:", error.message);
            }
        };

        handleRedirect();
    }, []);

    const handleResetPassword = () => {
        if (!email) {
            alert('Please enter your email first.');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('📩 Password reset email sent.');
                navigate('/');
            })
            .catch((error) => {
                alert(`❌ ${error.message}`);
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
                    <button className="google-btn" onClick={loginWithGoogle}>
                        🔵 Continue with Google
                    </button>
                    <button className="phone-btn" onClick={goToPhoneLogin}>
                        📱 Login with Phone
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;