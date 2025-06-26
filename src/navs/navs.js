import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./navs.css";
import logo from "../assets/logo.png"; // غيّر المسار حسب لوجو مشروعك
import { GrCart } from "react-icons/gr";

const Navs = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="nav-container">
                <img src={logo} alt="Logo" className="logo"/>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/swai-pay">Swai Pay</Link></li>
                    <li><Link to="/account">Account</Link></li>
                    <li><Link to="/cart"><GrCart/></Link></li>
                </ul>

                <button className="sidebar-toggle" onClick={() => setVisible(true)}>☰</button> <Link to="/cart" className="cart-icon"><GrCart/></Link>
            </div>

            {visible && (
                <div className="sidebar">
                    <button className="close-btn" onClick={() => setVisible(false)}>×</button>
                    <ul className="sidebar-links">
                        <li><Link to="/" onClick={() => setVisible(false)}>Home</Link></li>
                        <li><Link to="/orders" onClick={() => setVisible(false)}>Orders</Link></li>
                        <li><Link to="/swai-pay" onClick={() => setVisible(false)}>Swai Pay</Link></li>
                        <li><Link to="/account" onClick={() => setVisible(false)}>Account</Link></li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navs;
