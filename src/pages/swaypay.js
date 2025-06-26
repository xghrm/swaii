import React, { useState } from 'react';
import { useCart } from "./cartcontex"
import './swaipay.css';
import {toast} from "react-toastify";

const SwaiPay = () => {
    const { walletBalance, addFunds } = useCart();
    const [paymentType, setPaymentType] = useState('credit');
    const [amount, setAmount] = useState('');
    const [voucher, setVoucher] = useState('');

    // Credit card fields
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const validVouchers = {
        SWAI50: 50,
        SWAI100: 100
    };

    const handleAddFunds = () => {
        const num = parseFloat(amount);

        if (paymentType === 'credit') {
            if (!/^[0-9]{16}$/.test(cardNumber)) return alert("Enter a valid 16-digit numeric card number.");
            if (!expiry || !/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) return alert("Enter valid expiry (MM/YY).");
            if (!cvv || cvv.length !== 3) return alert("Enter a valid 3-digit CVV.");
            if (isNaN(num) || num <= 0) return alert("Enter a valid amount.");

            addFunds(num);
            toast.warning(`💳 $${num} added to your wallet.`);
            setAmount('');
            setCardNumber('');
            setExpiry('');
            setCvv('');
        }

        if (paymentType === 'voucher') {
            if (validVouchers[voucher]) {
                addFunds(validVouchers[voucher]);
                toast.success(`🎉 Voucher applied! $${validVouchers[voucher]} added to your wallet.`);
                setVoucher('');
            } else {
                toast.error("❌ Invalid voucher code.");
            }
        }
    };

    return (
        <div className="wallet-container">
            <h2>💳 Swai Pay Wallet</h2>
            <p>Balance: <strong>${walletBalance.toFixed(2)}</strong></p>

            <div className="wallet-options">
                <label>
                    <input
                        type="radio"
                        name="paymentType"
                        value="credit"
                        checked={paymentType === 'credit'}
                        onChange={() => setPaymentType('credit')}
                    />
                    Credit Card
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentType"
                        value="voucher"
                        checked={paymentType === 'voucher'}
                        onChange={() => setPaymentType('voucher')}
                    />
                    Voucher Code
                </label>
            </div>

            {paymentType === 'credit' && (
                <div className="wallet-form credit-form">
                    <input
                        type="text"
                        placeholder="Card Number (16 digits)"
                        maxLength="16"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Expiry (MM/YY)"
                        maxLength="5"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="CVV"
                        maxLength="3"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button onClick={handleAddFunds}>Add to Wallet</button>
                </div>
            )}

            {paymentType === 'voucher' && (
                <div className="wallet-form">
                    <input
                        type="text"
                        placeholder="Enter voucher code"
                        value={voucher}
                        onChange={(e) => setVoucher(e.target.value)}
                    />
                    <button onClick={handleAddFunds}>Apply Voucher</button>
                </div>
            )}
        </div>
    );
};

export default SwaiPay;
