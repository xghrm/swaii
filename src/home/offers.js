import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css";
import divino from "../assets/divino.png";
import alnar from "../assets/alnar.png";
import baitalmashawi from "../assets/baitalmashawi.png";

const offers = [
    {
        image: divino,
        title: "20% Off Pizza",
        restaurant: "Divino Restaurant"
    },
    {
        image: alnar,
        title: "Buy 1 Get 1 Shawarma",
        restaurant: "مطعم ع النار"
    },
    {
        image: baitalmashawi,
        title: "15% Off mashakal",
        restaurant: "بيت المشاوي"
    }
];

export const OffersSection = () => (
    <div className="offers-container">
        <h2>Today's Offers</h2>
        <div className="offers-grid">
            {offers.map((offer, index) => (
                <Link to={`/restaurant/${offer.restaurant}`} key={index} className="offer-card">
                    <img src={offer.image} alt={offer.title} />
                    <h4>{offer.title}</h4>
                    <p>{offer.restaurant}</p>
                </Link>
            ))}
        </div>
    </div>
);