import React from 'react';
import './Account.css';

const AboutApp = () => {
    return (
        <div className="about-container">
            <h2>📱 About SWAI</h2>
            <p>SWAI is your all-in-one delivery solution for food, drinks, groceries, and more!</p>

            <div className="features-grid">
                <div className="feature-card">
                    <h3>🚀 Fast Delivery</h3>
                    <p>We bring your favorite meals, drinks, and essentials to your doorstep in no time.</p>
                </div>

                <div className="feature-card">
                    <h3>🔒 Secure Login</h3>
                    <p>Multiple login options using email, Google, or phone for maximum convenience.</p>
                </div>

                <div className="feature-card">
                    <h3>🛒 Smart Ordering</h3>
                    <p>Explore menus, add to cart, and process payments with ease.</p>
                </div>

                <div className="feature-card">
                    <h3>💳 Payment Options</h3>
                    <p>Choose from cash on delivery or credit card — your choice, always.</p>
                </div>

                <div className="feature-card">
                    <h3>🎁 Rewards & Referrals</h3>
                    <p>Refer friends and earn rewards with every successful invite.</p>
                </div>

                <div className="feature-card">
                    <h3>📦 Order History</h3>
                    <p>Keep track of all your orders and re-order your favorites with a tap.</p>
                </div>
            </div>

            <div className="about-note">
                <p>Built with ❤️ using React & Firebase. Our goal is to simplify your life, one delivery at a time.</p>
            </div>
        </div>
    );
};

export default AboutApp;
