// Footer.js
import React, { useState } from 'react';
import './home.css';

const Footer = () => {
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    return (
        <footer className="footer">
            <div className="footer-content">

                {/* Logo & Tagline */}
                <div className="footer-section">
                    <h2 className="footer-logo">SWAI</h2>
                    <p>Delivering happiness to your door 🚀</p>
                </div>

                {/* Navigation Links */}
                <div className="footer-section">
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact</a>
                    <button className="footer-link-btn" onClick={() => setShowTerms(!showTerms)}>
                        Terms & Conditions
                    </button>
                    <button className="footer-link-btn" onClick={() => setShowPrivacy(!showPrivacy)}>
                        Privacy Policy
                    </button>
                </div>

                {/* Social Media */}
                <div className="footer-section">
                    <p>Follow us</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>

            {/* Toggle Sections */}
            {showTerms && (
                <div className="footer-toggle-box">
                    <h4>Terms & Conditions</h4>
                    <p>
                        By using SWAI, you agree to our service rules and responsibilities.
                        We reserve the right to update our terms at any time.
                    </p>
                </div>
            )}

            {showPrivacy && (
                <div className="footer-toggle-box">
                    <h4>Privacy Policy</h4>
                    <p>
                        We respect your privacy. Your information will never be shared
                        without your permission and is stored securely.
                    </p>
                </div>
            )}

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} SWAI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
