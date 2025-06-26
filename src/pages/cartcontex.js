import React, { createContext, useContext, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, Timestamp, getDoc, doc } from 'firebase/firestore';
import {toast} from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);

    const addToCart = (item) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.name === item.name);
            if (existing) {
                return prev.map(i =>
                    i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const increaseQuantity = (itemName) => {
        setCartItems(prev =>
            prev.map(i => i.name === itemName ? { ...i, quantity: i.quantity + 1 } : i)
        );
    };

    const decreaseQuantity = (itemName) => {
        setCartItems(prev =>
            prev.map(i =>
                i.name === itemName && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
            )
        );
    };

    const removeFromCart = (itemName) => {
        setCartItems(prev => prev.filter(i => i.name !== itemName));
    };

    const addFunds = (amount) => {
        setWalletBalance(prev => prev + amount);
    };

    const payWithWallet = (total) => {
        if (walletBalance >= total) {
            setWalletBalance(prev => prev - total);
            return true;
        }
        return false;
    };

    // ✅ دالة إرسال الطلب إلى قاعدة البيانات
    const placeOrder = async () => {
        const user = auth.currentUser;
        if (!user) {
            toast.error("❌ Please log in first.");
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.exists() ? userSnap.data() : {};

            await addDoc(collection(db, "orders"), {
                userId: user.uid,
                items: cartItems,
                total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
                status: "Pending",
                timestamp: Timestamp.now(),
                userName: userData.name || user.displayName || "",
                phone: userData.phone || user.phoneNumber || "",
                address: userData.address || ""
            });

            toast.success("✅ Order placed!");
            setCartItems([]); // تفريغ السلة بعد الطلب
        } catch (error) {
            toast.error(`❌ Error placing order: ${error.message}`);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            placeOrder,
            orders,
            walletBalance,
            addFunds,
            payWithWallet
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);