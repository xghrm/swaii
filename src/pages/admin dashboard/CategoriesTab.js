import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import "./addm.css";

const CategoriesTab = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [offer, setOffer] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const snapshot = await getDocs(collection(db, "categories"));
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setCategories(data);
        };

        fetchCategories();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name || !offer) return alert("Please fill all fields");
        try {
            await addDoc(collection(db, "categories"), { name, offer });
            alert("✅ Category added!");
            setName("");
            setOffer("");
            window.location.reload();
        } catch (error) {
            console.error("Error adding category:", error);
            alert("❌ Failed to add category");
        }
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "categories", id));
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="categories-tab-container">
            <h2 className="categories-tab-title">🍽️ Manage Categories & Offers</h2>
            <form onSubmit={handleAdd} className="add-category-form">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Offer Details"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                />
                <button type="submit">➕ Add Category</button>
            </form>

            <ul className="category-list">
                {categories.map((cat) => (
                    <li key={cat.id} className="category-item">
                        <span><strong>{cat.name}</strong>: {cat.offer}</span>
                        <button onClick={() => handleDelete(cat.id)} className="delete-btn">🗑️ Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesTab;