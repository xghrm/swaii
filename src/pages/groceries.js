
import React from 'react';
import { useCart } from './cartcontex';
import CartButton from './cartbutton';
import './res.css';

const groceries = [
    ["Milk", 2, "milk.png", "Fresh cow milk 1L"],
    ["Eggs", 3, "eggs.png", "Pack of 12 farm eggs"],
    ["Bread", 1.5, "bread.png", "Whole grain bread loaf"],
    ["Apples", 2.5, "apples.png", "Fresh red apples - 1kg"],
    ["Bananas", 1.8, "bananas.png", "Ripe yellow bananas - 1kg"],
    ["Tomatoes", 2, "tomatoes.png", "Juicy red tomatoes - 1kg"],
    ["Potatoes", 1.7, "potatoes.png", "Cleaned white potatoes - 2kg"],
    ["Onions", 1.4, "onions.png", "Yellow onions - 1kg"],
    ["Rice", 4, "rice.png", "Long grain rice - 1kg"],
    ["Olive Oil", 6.5, "oliveoil.png", "Extra virgin olive oil - 1L"],
    ["Cheese", 3.5, "cheese.png", "Sliced white cheese - 250g"],
    ["Butter", 2.8, "butter.png", "Creamy salted butter - 200g"],
    ["Yogurt", 2, "yogurt.png", "Natural yogurt - 500g"],
];

const Groceries = () => {
    const { addToCart } = useCart();

    return (
        <div className="top-restaurants">
            <h2>Groceries</h2>
            <div className="restaurant-grid">
                {groceries.map(([name, price, image, description], index) => (
                    <div className="restaurant-card">
                        <img
                            src={`/assets/${image}`}
                            alt={name}
                            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                        <h4>{name} - ${price}</h4>
                        <p>{description}</p>
                        <button className="add-btn" onClick={() => addToCart({ name, price, image })}>➕ Add</button>
                    </div>
                ))}
            </div>
            <CartButton />
        </div>
    );
};

export default Groceries;
