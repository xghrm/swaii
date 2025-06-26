// src/tabs/RestaurantTab.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";
import './addm.css'; // تأكد من إضافة ملف CSS

const RestaurantTab = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            const snapshot = await getDocs(collection(db, 'restaurants'));
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRestaurants(data);
        };

        fetchRestaurants();
    }, []);

    const handleAddRestaurant = async (e) => {
        e.preventDefault();
        if (!name || !image || !category) return alert("Please fill in all fields");

        try {
            await addDoc(collection(db, 'restaurants'), {
                name,
                image,
                category
            });
            alert("✅ Added!");
            setName('');
            setImage('');
            setCategory('');
            window.location.reload();
        } catch (err) {
            console.error("❌ Error adding:", err);
            alert("❌ Failed to add: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'restaurants', id));
        setRestaurants((prev) => prev.filter((r) => r.id !== id));
    };

    const grouped = {
        restaurant: [],
        cafe: [],
        grocery: []
    };

    restaurants.forEach((res) => {
        grouped[res.category]?.push(res);
    });

    const renderSection = (title, items) => (
        <div className="restaurant-section">
            <h3>{title}</h3>
            <div className="restaurant-grid">
                {items.map((res) => (
                    <div key={res.id} className="restaurant-card">
                        <img src={res.image} alt={res.name} className="restaurant-img" />
                        <h4 className="restaurant-name">{res.name}</h4>
                        <p className="restaurant-category">{res.category}</p>
                        <button onClick={() => handleDelete(res.id)} className="delete-btn">
                            🗑️ Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="restaurant-container">
            <h2>🍽️ Manage Restaurants, Cafes & Groceries</h2>

            <form onSubmit={handleAddRestaurant} className="restaurant-form">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="cafe">Cafe</option>
                    <option value="grocery">Grocery</option>
                </select>
                <button type="submit" className="add-btn">➕ Add</button>
            </form>

            {renderSection("🍽️ Restaurants", grouped.restaurant)}
            {renderSection("☕ Cafes", grouped.cafe)}
            {renderSection("🛒 Groceries", grouped.grocery)}
        </div>
    );
};

export default RestaurantTab;