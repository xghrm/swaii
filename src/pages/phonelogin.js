import React, { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './login.css';

const PhoneLogin = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();

    const sendOTP = async (e) => {
        e.preventDefault();

        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                size: 'invisible',
                callback: () => {
                    console.log('✅ reCAPTCHA solved');
                },
            }, auth);
        }

        try {
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(result);
            alert('📲 OTP sent!');
        } catch (error) {
            alert('❌ ' + error.message);
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    phoneNumber: user.phoneNumber,
                    createdAt: new Date(),
                });
            }

            alert(`✅ Logged in as ${user.phoneNumber}`);
            navigate('/');
        } catch (error) {
            alert('❌ Invalid code: ' + error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>📱 Login with Phone</h2>

            <form onSubmit={sendOTP} className="login-form">
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +9639xxxxxxx"
                    required
                />
                <button type="submit">Send OTP</button>
            </form>

            {confirmationResult && (
                <form onSubmit={verifyOTP} className="login-form">
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                    />
                    <button type="submit">Verify OTP</button>
                </form>
            )}

            <div id="recaptcha-container"></div>
        </div>
    );
};

export default PhoneLogin;