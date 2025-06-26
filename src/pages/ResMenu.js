import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './cartcontex';
import CartButton  from "./cartbutton.js";
import './res.css';
import {toast} from "react-toastify";

const menuData = {
    "Divino Restaurant": [
        ["Margherita Pizza", 12, "food6.png", "Tomato sauce, mozzarella, oregano."],
        ["Divino's Special Pizza", 10, "food7.png", "Parma ham, parmesan, arugula, mozzarella."],
        ["Spaghetti carbonara", 10, "food8.png", "Spaghetti with pancetta, egg, parmesan, cream."],
        ["Al Forno Lasagna", 10, "food9.png", " Pasta layers with meat ragù, béchamel, mozzarella."],
        ["Chicken Caesar Salad", 10, "food10.png", " Lettuce, grilled chicken, croutons, parmesan, Caesar dressing."],
        ["grilled tuna salad", 5, "food11.png" , "Tuna, veggies, cherry tomatoes, olives, citrus mustard dressing."],
        ["Tiramisu", 5, "food12.png", "Mascarpone, coffee-soaked biscuits, chocolate."],
        ["Vanilla Panna Cotta", 5, "food13.png", "Cream, crumble, cherry sorbet."]
    ],
    "ENAB Restaurant": [
        ["Shish Tawook", 5, "food14.png", "Marinated grilled chicken skewers, served with fries, vegetables, and fresh bread."],
        ["Stuffed Vine Leaves", 8, "food15.png", "Grape leaves stuffed with rice and vegetables, served cold with a hint of lemon."],
        ["Hummus with Tahini", 5, "food16.png", "Mashed chickpeas blended with tahini and lemon juice, topped with olive oil and served with Arabic bread."],
        ["Spicy Muhammara", 2, "food17.png", "Crushed red peppers mixed with walnuts, olive oil, and pomegranate molasses – served with warm bread."],
        ["Zahle-Style Labneh", 5, "food18.png", "Thick strained yogurt with zaatar (thyme) and olive oil, served as a cold appetizer."],
        ["French Fries with Spices", 8, "food19.png", "Crispy fries served with garlic sauce or ketchup."],
        ["Knafeh", 5, "food20.png", "Traditional Middle Eastern dessert served warm with syrup, sometimes topped with crushed pistachios."]
    ],
    "Belagio": [
        ["Chicken Alfredo", 8, "food1.png", "Classic cheese pizza."],
        ["Chicken Cordon Bleu", 9, "food3.png", "Loaded with veggie."],
        ["Crispy Chicken", 8, "food5.png", "Crunchy golden crust."],
        ["Brisket", 10, "food2.png", "Pepperoni with cheese."],
        ["Grilled Meat Fillet", 5, "food4.png", "Mushroom-mustard-black pepper."],
        ["Turkish Coffee", 8, "drink3.png", "Hot coffee."],
        ["Lemonade", 5, "drink1.png", "Lemon smoothie."]
    ],
    "بيت المشاوي": [
        ["Grilled Kebab", 8, "food21.png", "Grilled minced meat kebab over charcoal, served with fresh bread and appetizers."],
        ["Grilled or Fried Kibbeh", 9, "food22.png", "Kibbeh stuffed with minced meat and nuts, served either grilled or fried as preferred."],
        ["Charcoal-Grilled Chicken", 8, "food23.png", "Whole chicken grilled over charcoal, served with fries and assorted appetizers."],
        ["Fresh Grilled Seafood Fish", 10, "food24.png", "Freshly grilled seafood fish, served with vegetables and special sauces."]
    ],
    "Messa Luna Restaurant": [
        ["Margherita Pizza", 8, "food6.png", "Fresh tomato sauce, mozzarella cheese, and oregano."],
        ["Carbonara Pasta", 9, "food8.png", "Spaghetti with smoked pancetta, egg, parmesan cheese, and a touch of cream."],
        ["Caprese Salad", 8, "food25.png", "Fresh tomato slices, mozzarella cheese, and basil leaves, drizzled with extra virgin olive oil."],
        ["Tiramisu", 10, "food12.png", "Classic Italian dessert made of layers of mascarpone mousse and coffee-soaked ladyfinger biscuits."]
    ],
    "Dixy Chicken": [
        ["Peri Peri Grilled Chicken Meals", 8, "food26.png", "Available as half or whole chicken, served with fries and soft drinks."],
        ["BBQ Chicken Meals", 9, "food27.png", "Includes BBQ wings and grilled chicken strips, served with fries and soft drinks."],
        ["Burger Sandwiches", 8, "food28.png", "Options like grilled chicken burger, beef burger, and spicy chicken burger, served with fries and soft drinks."],
        ["Family Meals", 10, "food29.png", "Includes fried chicken buckets like the “Family Bucket” and “Party Bucket,” served with fries and soft drinks."]
    ],
    "Bab Alshams Restaurant": [
        ["Mixed Grill", 8, "food30.png", "A combination of kebab, shish tawook, lamb, and sometimes kofta, grilled over charcoal. Served with fries, bread, and appetizers."],
        ["Shish Tawook", 9, "food14.png", "Marinated grilled chicken cubes, juicy inside and crispy outside. Served with fries or rice and side dips."],
        ["Beef or Chicken Steak", 8, "food31.png", "Grilled or pan-fried steak, served with mushroom or pepper sauce and sautéed vegetables."],
        ["Pasta (Bechamel or Red Sauce), Chicken, Salami)", 8, "food32.png", "Italian-style pasta served with creamy béchamel or tomato sauce, topped with cheese or meat."],
        ["Pasta (Bechamel or Red Sauce)", 10, "food35.png", "Pepperoni with cheese."],
        ["Pizza (Margherita, Veggie, Chicken, Salami)", 9, "food33.png", "Thin or thick crust pizza topped with rich tomato sauce, cheese, and fresh ingredient."],
        ["Tabbouleh & Fattoush", 8, "food34.png", "Fresh Levantine salads – Tabbouleh made with parsley and bulgur, and Fattoush with crispy bread and mixed vegetables."],
        ["Hummus & Moutabbal", 8, "food36.png", "Classic cold appetizers – hummus with tahini and lemon, and smoky eggplant moutabbal."],
        ["Knafeh", 9, "food20.png", "A traditional Arabic dessert made with sweet cheese and semolina, served warm with syrup and nuts."],
        ["Tiramisu", 8, "food12.png", "Classic Italian dessert with layers of mascarpone cream and coffee-soaked ladyfingers, topped with cocoa."]
    ],
    "مطعم ع النار": [
        ["Chicken Shawarma", 8, "food37.png", "Marinated grilled chicken slices served in sandwiches or as a platter with fries,garlic sauce, and house seasoning."],
        ["Beef Shawarma", 9, "food38.png", "Spiced beef slices served in Arabic or saj bread, with fries and pickles."],
        ["Charcoal Grilled Chicken", 8, "food39.png", "Half or whole chicken grilled over charcoal, served with fries, bread, and garlic sauce."],
        ["Crispy Fried Chicken (Broasted)", 10, "food40.png", "Crispy fried chicken pieces (breast, thigh, wing), served with fries and sides."],
        ["Snack Burgers (Chicken or Beef)", 9, "food41.png", "Quick-serve burgers with lettuce, tomato, special sauce, and cheese. Comes with fries."],
        ["Loaded Fries (A'l Naar Fries)", 8, "food42.png", "Fries topped with cheese, spicy sauces, shawarma, or mixed toppings."],
        ["Garlic Sauce (Large or Medium)", 10, "food43.png", "Signature creamy garlic dip, perfect with shawarma or grilled chicken."]
    ]
};

const RestaurantMenu = () => {
    const { addToCart } = useCart();
    const { name } = useParams();
    const items = menuData[name] || [];

    return (
        <div style={{ padding: "20px" }}>
            <h2>{name}</h2>
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {items.map(([itemName, price, image, description], index) => (
                    <div key={index} style={{border: '1px solid #ddd', padding: '10px', borderRadius: '8px'}}>
                        <img
                            src={`/assets/${image}`}
                            alt={itemName}
                            style={{width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px'}}
                        />
                        <h4>{itemName} - ${price}</h4>
                        <p>{description}</p>
                        <button
                            className="add-btn"
                            onClick={() => {
                                addToCart({name: itemName, price, image, quantity: 1});
                            toast.success("Item added successfully!");
                        }}
                        >
                            ➕ Add
                        </button>
                    </div>
                ))}
            </div>
            <CartButton/>
        </div>
    )
}
export default RestaurantMenu;
