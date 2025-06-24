import React from 'react';
import { useCart } from './cartcontex';
import './cart.css';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Your Cart 🛒</h2>

            {cartItems.length === 0 ? (
                <p id="parh">Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <img src={`/assets/${item.image}`} alt={item.name}/>
                            <div className="item-info">
                                <h4>{item.name}</h4>
                                <p>${item.price.toFixed(2)}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => decreaseQuantity(item.name)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item.name)}>+</button>
                                </div>
                            </div>
                            <button className="remove-btn" onClick={() => removeFromCart(item.name)}>🗑️</button>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="checkout">
                    <p>Total: ${totalPrice.toFixed(2)}</p>
                    <button className="process-btn" onClick={() => navigate("/process-payment")}>
                        Process Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
