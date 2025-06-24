import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";

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
        <div style={{ marginTop: '30px' }}>
            <h3>{title}</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
            }}>
                {items.map((res) => (
                    <div key={res.id} style={{
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '10px',
                        backgroundColor: '#fdfdfd',
                        textAlign: 'center'
                    }}>
                        <img src={res.image} alt={res.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                        <h4 style={{ margin: '10px 0' }}>{res.name}</h4>
                        <p style={{ color: '#888' }}>{res.category}</p>
                        <button onClick={() => handleDelete(res.id)} style={{
                            backgroundColor: '#e74c3c',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>🗑️ Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ padding: '20px' }}>
            <h2>🍽️ Manage Restaurants, Cafes & Groceries</h2>

            <form onSubmit={handleAddRestaurant} style={{
                display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap'
            }}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="cafe">Cafe</option>
                    <option value="grocery">Grocery</option>
                </select>
                <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px' }}>➕ Add</button>
            </form>

            {renderSection("🍽️ Restaurants", grouped.restaurant)}
            {renderSection("☕ Cafes", grouped.cafe)}
            {renderSection("🛒 Groceries", grouped.grocery)}
        </div>
    );
};

export default RestaurantTab;
