import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

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
        <div>
            <h2 style={{ color: "#d68a8a" }}>Manage Categories & Offers</h2>
            <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Offer Details"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <button type="submit">➕ Add Category</button>
            </form>

            <ul>
                {categories.map((cat) => (
                    <li key={cat.id} style={{ marginBottom: "10px" }}>
                        <strong>{cat.name}</strong>: {cat.offer}
                        <button
                            onClick={() => handleDelete(cat.id)}
                            style={{ marginLeft: "10px", color: "red" }}
                        >
                            🗑️ Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesTab;
