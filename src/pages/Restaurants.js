import React from 'react';
import './res.css';
import {Link} from "react-router-dom";
import btmashawi from "../assets/baitalmashawi.png";
import anab from "../assets/anab.png";
import divino from "../assets/divino.png";
import Belagio from "../assets/Belagio.png";
import Dixy from "../assets/Dixy.png";
import messa from "../assets/messa.png";
import alnar from "../assets/alnar.png";
import Bab from "../assets/Bab.png";

const restaurants = [
    {
        name: "Divino Restaurant",
        image: divino,
        rating: 4.5,
    },
    {
        name: "ENAB Restaurant",
        image: anab ,
        rating: 4.2,
    },
    {
        name: "Belagio",
        image: Belagio,
        rating: 4.8,
    },
    {
        name: "بيت المشاوي",
        image: btmashawi,
        rating: 4.3,
    },
    {
        name: "Messa Luna Restaurant",
        image: messa,
        rating: 5.0,
    },
    {
        name: "Dixy Chicken",
        image: Dixy,
        rating: 4.0,
    },
    {
        name: "Bab Alshams Restaurant",
        image: Bab,
        rating: 4.9,
    },
    {
        name: "مطعم ع النار",
        image: alnar,
        rating: 4.3,
    },
];

const Restaurants = () => {
    return (
        <div className="top-restaurants">
            <h2>Restaurants</h2>
            <div className="restaurant-grid">
                {restaurants.map((rest, index) => (
                    <Link to={`/restaurant/${rest.name}`} className="restaurant-card" key={index}>
                        <img src={rest.image} alt={rest.name} />
                        <h3>{rest.name}</h3>
                        <p>⭐ {rest.rating}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Restaurants;