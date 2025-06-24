import {useCart} from "./cartcontex";
import {useNavigate} from "react-router-dom";
import "./cart.css";
const CartButton = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    return (
        <button className="clickbutton" onClick={() => navigate('/cart')} style={{ position: 'fixed', bottom: 20, right: 20 }}>
            🛒 Cart ({cartItems.length})
        </button>
    );
};

export default CartButton;