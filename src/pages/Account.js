import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";
import './account.css';
import logo from "../assets/logo.png";

const Account = () => {
    const { user } = useAuth();
    return (
        <div className="account-container">
            <div className="account-header">
                <img src={logo} alt="Profile" className="account-logo"/>
                    <h2>{user?.displayName || user?.email?.split('@')[0] || "Guest"}</h2>
                    <p>{user?.email || "your@email.com"}</p>
                </div>

            <div className="account-banner">
                <h4>Unlimited Free Delivery</h4>
                <p>Subscribe now to SWAI Pro</p>
            </div>

            <ul className="account-links">
                <li><Link to="/acc">My Account</Link></li>
                <li><Link to="/rewards">Rewards 🎁</Link></li>
                <li><Link to="/orders">Your Orders 📦</Link></li>
                <li><Link to="/refer">Refer a Friend 🤝</Link></li>
                <li><Link to="/vouchers">Vouchers 🎫</Link></li>
                <li><Link to="/swai-pro">SWAI Pro 🌟</Link></li>
                <li><Link to="/help">Get Help ❓</Link></li>
                <li><Link to="/about">AboutUS ℹ️</Link></li>
            </ul>
        </div>
    );
};

export default Account;
