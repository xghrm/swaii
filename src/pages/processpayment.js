import React, { useState } from 'react';
import './payment.css';
import { useCart } from "./cartcontex";
import { useNavigate } from 'react-router-dom';


const ProcessPayment = () => {
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const { cartItems, placeOrder } = useCart();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert('🛒 Your cart is empty. Please add items before paying.');
            return;
        }
        placeOrder();
        alert(`✅ Payment method selected: ${paymentMethod}\nYour order has been placed!`);
        navigate('/orders');
    };

    return (
        <div className="payment-container">
            <h2>🧾 Process Your Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="payment-method">
                    <label>
                        <input
                            type="radio"
                            value="credit"
                            checked={paymentMethod === 'credit'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Credit Card
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Cash on Delivery
                    </label>
                </div>

                {paymentMethod === 'credit' && (
                    <div className="card-info">
                        <input type="text" placeholder="Card Number" required />
                        <input type="text" placeholder="Expiry Date (MM/YY)" required />
                        <input type="text" placeholder="CVV" required />
                    </div>
                )}

                <button onClick={placeOrder} className="confirm-btn">ConfirmPayment</button>
            </form>

            <div className="cart-summary">
                <h3>🛒 Cart Summary</h3>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>{item.name} - ${item.price} x {item.quantity || 1}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProcessPayment;
