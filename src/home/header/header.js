import React from 'react';
import './header.css';

const Header =()=>{
    return(
        <header>
            <div className="container" id="home">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Welcome to SWAI 🍔</h1>
                        <h2>Your favorite food, delivered fast and fresh!</h2>
                        <br/>
                        <div id="button">
                            <button onClick={() => window.location.href = '/restaurants'} className="order-button">Order
                                Now
                            </button>
                        </div>

                    </div>


                </div>
            </div>
        </header>
    )
}

export default Header;
