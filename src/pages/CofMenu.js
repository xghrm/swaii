import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './cartcontex';
import CartButton  from "./cartbutton.js";
import './res.css';
import {toast} from "react-toastify";

const menuData = {
    "Malindo Cafe": [
        ["Fresh Juice (Peach, Watermelon, Berry)", 8, "drinks4.png", "Classic cheese pizza."],
        ["Turkish Coffee", 9, "drinks5.png", "Loaded with veggie."],
        ["Espresso", 8, "drinks6.png", "Crunchy golden crust."],
        ["Cappuccino", 10, "drinks7.png", "Pepperoni with cheese."],
        ["Latte", 5, "drinks8.png", "Mushroom-mustard-black pepper."],
        ["Classic Crepe", 8, "drinks9.png", "Hot coffee."],
        ["Pancake", 5, "drinks10.png", "Lemon smoothie."],
        ["Waffle with Chocolate", 5, "drinks11.png", "Lemon smoothie."],
        ["Regular Hookah", 5, "drinks12.png", "Lemon smoothie."],
        ["Premium Flavored Hookah", 5, "drink13.png", "Lemon smoothie."],
    ],
    "Yellow Cafe": [
        ["Espresso", 8, "drinks6.png", "Classic cheese pizza."],
        ["Cappuccino", 9, "drinks7.png", "Loaded with veggie."],
        ["Latte", 8, "drinks8.png", "Crunchy golden crust."],
        ["Turkish Coffee", 10, "drinks5.png", "Pepperoni with cheese."],
        ["Fresh Juices (Orange, Lemon, Pomegranate)", 10, "drinks4.png", "Pepperoni with cheese."],
        ["Milkshakes (Chocolate, Vanilla, Strawberry)", 10, "drink14.png", "Pepperoni with cheese."],
        ["Chocolate Cake", 10, "drink15.png", "Pepperoni with cheese."],
        ["Cheesecake", 10, "drink16.png", "Pepperoni with cheese."],
        ["Waffles with Ice Cream", 10, "drink17.png", "Pepperoni with cheese."],
        ["Pancakes with Syrup", 10, "drinks10.png", "Pepperoni with cheese."],
        ["Fruit Salad", 10, "drink18.png", "Pepperoni with cheese."],
        ["Club Sandwich", 10, "drink19.png", "Pepperoni with cheese."],
        ["Chicken Wrap", 10, "drink20.png", "Pepperoni with cheese."],
        ["French Fries", 10, "drink21.png", "Pepperoni with cheese."],
        ["Mini Burgers", 10, "drink22.png", "Pepperoni with cheese."],
        ["Vegetable Salad", 10, "drink23.png", "Pepperoni with cheese."],
        ["Regular Flavors (Apple, Mint, Grape)", 10, "drinks12.png", "Pepperoni with cheese."],
        ["Special Mixes (Double Apple, Lemon-Mint)", 10, "drink13.png", "Pepperoni with cheese."],
    ],
    "Veranda Café": [
        ["Espresso", 10, "drinks6.png", "Pepperoni with cheese."],
        ["Cappuccino", 10, "drinks7.png", "Pepperoni with cheese."],
        ["Latte", 10, "drinks8.png", "Pepperoni with cheese."],
        ["Turkish Coffee", 10, "drinks5.png", "Pepperoni with cheese."],
        ["Fresh Juices (Orange, Lemon, Pomegranate)", 10, "drinks4.png", "Pepperoni with cheese."],
        ["Milkshakes (Chocolate, Vanilla, Strawberry)", 10, "drink14.png", "Pepperoni with cheese."],
        ["Chocolate Cake", 10, "drink15.png", "Pepperoni with cheese."],
        ["Cheesecake", 10, "drink16.png", "Pepperoni with cheese."],
        ["Waffles with Ice Cream", 10, "drink17.png", "Pepperoni with cheese."],
        ["Pancakes with Syrup", 10, "drinks10.png", "Pepperoni with cheese."],
        ["Fruit Salad", 10, "drink18.png", "Pepperoni with cheese."],
        ["Club Sandwich", 10, "drink19.png", "Pepperoni with cheese."],
        ["Chicken Wrap", 10, "drink20.png", "Pepperoni with cheese."],
        ["French Fries", 10, "drink21.png", "Pepperoni with cheese."],
        ["Mini Burgers", 10, "drink22.png", "Pepperoni with cheese."],
        ["Vegetable Salad", 10, "drink23.png", "Pepperoni with cheese."],
        ["Regular Flavors (Apple, Mint, Grape)", 10, "drinks12.png", "Pepperoni with cheese."],
        ["Special Mixes (Double Apple, Lemon-Mint)", 10, "drink13.png", "Pepperoni with cheese."],
    ],
    "Kasr Al Nile": [
        ["Espresso", 10, "drinks6.png", "Pepperoni with cheese."],
        ["Cappuccino", 10, "drinks7.png", "Pepperoni with cheese."],
        ["Latte", 10, "drinks8.png", "Pepperoni with cheese."],
        ["Turkish Coffee", 10, "drinks5.png", "Pepperoni with cheese."],
        ["Fresh Juices (Orange, Lemon, Pomegranate)", 10, "drinks4.png", "Pepperoni with cheese."],
        ["Milkshakes (Chocolate, Vanilla, Strawberry)", 10, "drink14.png", "Pepperoni with cheese."],
        ["Chocolate Cake", 10, "drink15.png", "Pepperoni with cheese."],
        ["Cheesecake", 10, "drink16.png", "Pepperoni with cheese."],
        ["Waffles with Ice Cream", 10, "drink17.png", "Pepperoni with cheese."],
        ["Pancakes with Syrup", 10, "drinks10.png", "Pepperoni with cheese."],
        ["Fruit Salad", 10, "drink18.png", "Pepperoni with cheese."],
        ["Club Sandwich", 10, "drink19.png", "Pepperoni with cheese."],
        ["Chicken Wrap", 10, "drink20.png", "Pepperoni with cheese."],
        ["French Fries", 10, "drink21.png", "Pepperoni with cheese."],
        ["Mini Burgers", 10, "drink22.png", "Pepperoni with cheese."],
        ["Vegetable Salad", 10, "drink23.png", "Pepperoni with cheese."],
        ["Regular Flavors (Apple, Mint, Grape)", 10, "drinks12.png", "Pepperoni with cheese."],
        ["Special Mixes (Double Apple, Lemon-Mint)", 10, "drink13.png", "Pepperoni with cheese."],
    ],
    "Nahawand Café": [
        ["Espresso", 10, "drinks6.png", "Pepperoni with cheese."],
        ["Cappuccino", 10, "drinks7.png", "Pepperoni with cheese."],
        ["Latte", 10, "drinks8.png", "Pepperoni with cheese."],
        ["Turkish Coffee", 10, "drinks5.png", "Pepperoni with cheese."],
        ["Fresh Juices (Orange, Lemon, Pomegranate)", 10, "drinks4.png", "Pepperoni with cheese."],
        ["Milkshakes (Chocolate, Vanilla, Strawberry)", 10, "drink14.png", "Pepperoni with cheese."],
        ["Chocolate Cake", 10, "drink15.png", "Pepperoni with cheese."],
        ["Cheesecake", 10, "drink16.png", "Pepperoni with cheese."],
        ["Waffles with Ice Cream", 10, "drink17.png", "Pepperoni with cheese."],
        ["Pancakes with Syrup", 10, "drinks10.png", "Pepperoni with cheese."],
        ["Fruit Salad", 10, "drink18.png", "Pepperoni with cheese."],
        ["Club Sandwich", 10, "drink19.png", "Pepperoni with cheese."],
        ["Chicken Wrap", 10, "drink20.png", "Pepperoni with cheese."],
        ["French Fries", 10, "drink21.png", "Pepperoni with cheese."],
        ["Mini Burgers", 10, "drink22.png", "Pepperoni with cheese."],
        ["Vegetable Salad", 10, "drink23.png", "Pepperoni with cheese."],
        ["Regular Flavors (Apple, Mint, Grape)", 10, "drinks12.png", "Pepperoni with cheese."],
        ["Special Mixes (Double Apple, Lemon-Mint)", 10, "drink13.png", "Pepperoni with cheese."],
    ],
    "Jory Café": [
        ["Espresso", 10, "drinks6.png", "Pepperoni with cheese."],
        ["Cappuccino", 10, "drinks7.png", "Pepperoni with cheese."],
        ["Latte", 10, "drinks8.png", "Pepperoni with cheese."],
        ["Turkish Coffee", 10, "drinks5.png", "Pepperoni with cheese."],
        ["Fresh Juices (Orange, Lemon, Pomegranate)", 10, "drinks4.png", "Pepperoni with cheese."],
        ["Milkshakes (Chocolate, Vanilla, Strawberry)", 10, "drink14.png", "Pepperoni with cheese."],
        ["Fruit Salad", 10, "drink18.png", "Pepperoni with cheese."],
        ["Chocolate Cake", 10, "drink15.png", "Pepperoni with cheese."],
        ["Cheesecake", 10, "drink16.png", "Pepperoni with cheese."],
        ["Waffles with Ice Cream", 10, "drink17.png", "Pepperoni with cheese."],
        ["Pancakes with Syrup", 10, "drinks10.png", "Pepperoni with cheese."],
        ["French Fries", 10, "drink21.png", "Pepperoni with cheese."],
        ["Mini Burgers", 10, "drink22.png", "Pepperoni with cheese."],
        ["Chicken Wrap", 10, "drink20.png", "Pepperoni with cheese."],
        ["Vegetable Salad", 10, "drink23.png", "Pepperoni with cheese."],
        ["Regular Flavors (Apple, Mint, Grape)", 10, "drinks12.png", "Pepperoni with cheese."],
        ["Special Mixes (Double Apple, Lemon-Mint)", 10, "drink13.png", "Pepperoni with cheese."],
    ]
};

const CoffeMenu = () => {
    const { addToCart } = useCart();
    const { name } = useParams();
    const items = menuData[name] || [];

    return (
        <div style={{ padding: "20px" }}>
            <h2>{name}</h2>
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {items.map(([itemName, price, image, description], index) => (
                    <div key={index} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                        <img
                            src={`/assets/${image}`}
                            alt={itemName}
                            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                        <h4>{itemName} - ${price}</h4>
                        <p>{description}</p>
                        <button className="add-btn" onClick={() =>{
                            addToCart({ name: itemName, price, image });
                            toast.success("Item added successfully!");
                        }}>
                            ➕ Add</button>
                    </div>
                ))}
            </div>
            <CartButton />
        </div>
    )}
export default CoffeMenu;
