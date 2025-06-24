import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                alert('✅ Account created successfully!');
                navigate('/'); // بعدها يدخل عالهوم أو وين ما بدك
            })
            .catch(error => {
                alert(`❌ ${error.message}`);
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2> Create a SWAI Account</h2>
                <form onSubmit={handleSignup} className="login-form">
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password (min 6 chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>

    );
};

export default Signup;
