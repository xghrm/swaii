import React from 'react';
import './res.css';
import {Link} from "react-router-dom";
import malindo from "../assets/malindo.jpg";
import yellow from "../assets/yellow.png";
import varanda from "../assets/varanda.jpg";
import jory from "../assets/jory.jpg";
import kasr from "../assets/kasr.jpg";
import nahound from "../assets/nahound.jpg";

 const  cafe = [
    {
        name: "Malindo Cafe",
        image: malindo,
        rating: 4.5,
    },
    {
        name: "Yellow Cafe",
        image: yellow ,
        rating: 4.2,
    },
     {
         name: "Veranda Café",
         image: varanda ,
         rating: 4.2,
     },
     {
         name: "Kasr Al Nile",
         image: kasr ,
         rating: 4.2,
     },
     {
         name: "Nahawand Café",
         image: nahound ,
         rating: 4.2,
     },
     {
         name: "Jory Café",
         image: jory ,
         rating: 4.2,
     },
];

const Cafes = () => {
    return (
        <div className="top-restaurants">
            <h2>Cafe</h2>
            <div className="restaurant-grid">
                {cafe.map((rest, index) => (
                    <Link to={`/cafe/${rest.name}`} className="restaurant-card" key={index}>
                        <img src={rest.image} alt={rest.name} />
                        <h3>{rest.name}</h3>
                        <p>⭐ {rest.rating}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Cafes;