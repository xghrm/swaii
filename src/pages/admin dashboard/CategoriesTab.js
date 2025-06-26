// RestaurantTab.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const RestaurantTab = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState('');
    const [category, setCategory] = useState('restaurant');
    const navigate = useNavigate();

    const categoriesMap = {
        restaurant: 'restaurants',
        cafe: 'cafees',
        grocery: 'groceries'
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = {};
            for (const key in categoriesMap) {
                const snapshot = await getDocs(collection(db, categoriesMap[key]));
                data[key] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            }
            setRestaurants(data);
        };
        fetchData();
    }, []);

    const handleAddRestaurant = async (e) => {
        e.preventDefault();
        if (!name || !image || !rating || !category) return alert("Please fill all fields");
        try {
            await addDoc(collection(db, categoriesMap[category]), {
                name,
                image,
                rating: parseFloat(rating),
                createdAt: new Date()
            });
            window.location.reload();
        } catch (err) {
            alert("Error adding: " + err.message);
        }
    };

    const handleDelete = async (id, category) => {
        await deleteDoc(doc(db, categoriesMap[category], id));
        setRestaurants((prev) => ({
            ...prev,
            [category]: prev[category].filter((r) => r.id !== id)
        }));
    };

    const renderCategory = (title, items, categoryKey) => (
        <div>
            <h3>{title} ({items.length})</h3>
            <div className="restaurant-grid">
                {items.map((res) => (
                    <div className="restaurant-card" key={res.id}>
                        <img src={res.image} alt={res.name} />
                        <h4>{res.name}</h4>
                        <p>⭐ {res.rating}</p>
                        <button onClick={() => navigate(`/admin/${categoryKey}/${res.id}`)}>➕ Add Item</button>
                        <button onClick={() => handleDelete(res.id, categoryKey)}>🗑️ Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="restaurant-tab-container">
            <h2>Manage Restaurants / Cafes / Groceries</h2>
            <form onSubmit={handleAddRestaurant} className="add-form">
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
                <input placeholder="Rating (0-5)" type="number" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} required />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="restaurant">Restaurant</option>
                    <option value="cafe">Cafe</option>
                    <option value="grocery">Grocery</option>
                </select>
                <button type="submit">➕ Add</button>
            </form>
            {restaurants.restaurant && renderCategory("Restaurants", restaurants.restaurant, 'restaurant')}
            {restaurants.cafe && renderCategory("Cafes", restaurants.cafe, 'cafe')}
            {restaurants.grocery && renderCategory("Groceries", restaurants.grocery, 'grocery')}
        </div>
    );
};

export default RestaurantTab;
