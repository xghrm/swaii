import React from "react";
import { useNavigate } from "react-router-dom";
import "./categories.css";
import restaurant from "../assets/hamburger.png";
import grocerie from "../assets/shopping.png";
import cafe from "../assets/coffee.png";

const categories = [
    {
        title: "Restaurants",
        image: restaurant,
        path: "/restaurants",
    },
    {
        title: "Cafe",
        image: cafe,
        path: "/cafe",
    },
    {
        title: "Groceries",
        image: grocerie,
        path: "/groceries",
    },
];

const Categories = () => {
    const navigate = useNavigate();

    return (
        <div className="category-container">
            {categories.map((cat, index) => (
                <div
                    key={index}
                    className="category-box"
                    onClick={() => navigate(cat.path)}
                >
                    <img src={cat.image} alt={cat.title} className="category-img" />
                    <p className="category-title">{cat.title}</p>
                </div>
            ))}
        </div>
    );
};

export default Categories;
