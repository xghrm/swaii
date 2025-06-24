import React, { useState, useEffect } from 'react';
import './home.css';

const testimonialsData = [
    {
        name: "Sarah Ahmad",
        feedback: "Amazing experience! The delivery was fast and the food was delicious.",
    },
    {
        name: "Mohammad Ali",
        feedback: "I love the variety of restaurants available. Great app!",
    },
    {
        name: "Lina H.",
        feedback: "Very easy to use, and the offers section is really helpful.",
    },
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonialsData.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="testimonials-section">
            <h2>What our users say 💬</h2>
            <div className="testimonial-box">
                <p className="feedback">"{testimonialsData[index].feedback}"</p>
                <p className="user-name">— {testimonialsData[index].name}</p>
            </div>
        </div>
    );
};

export default Testimonials;
