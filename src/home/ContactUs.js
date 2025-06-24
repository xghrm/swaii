import React from 'react';
import "./home.css";

const ContactUs = () => {
    return (
        <section className="contact-section">
            <h2>Contact Us 📞</h2>
            <p>Have questions, suggestions, or need help? We’d love to hear from you!</p>

            <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button type="submit">Send Message</button>
            </form>

            <div className="contact-info">
                <p>AlSwaidaa, Syria 📍</p>
                <p>support@swaiapp.com 📧</p>
                <p>+963 957 235 339 📱</p>
            </div>
        </section>
    );
};

export default ContactUs;
