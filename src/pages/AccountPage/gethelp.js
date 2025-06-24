// src/pages/GetHelp.js
import React from 'react';
import './Account.css';

const GetHelp = () => {
    return (
        <div className="help-container">
            <h2>🆘 Need Help?</h2>
            <p>If you’re facing any issues, we’re here to assist you. Please choose a category or contact us directly.</p>

            <div className="help-sections">
                <div className="help-box">
                    <h3>🔐 Account Issues</h3>
                    <p>Having trouble logging in, changing your password, or accessing your account?</p>
                </div>

                <div className="help-box">
                    <h3>🛒 Orders & Payments</h3>
                    <p>Questions about your order, payments, or refund status?</p>
                </div>

                <div className="help-box">
                    <h3>🚚 Delivery & Tracking</h3>
                    <p>Need help tracking your order or have issues with delivery?</p>
                </div>

                <div className="help-box">
                    <h3>📩 Contact Support</h3>
                    <p>Email us at <a href="mailto:support@swai.com">support@swai.com</a> or call 123-456-789.</p>
                </div>
            </div>
        </div>
    );
};

export default GetHelp;
